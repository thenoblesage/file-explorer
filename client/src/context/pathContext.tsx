import React, { createContext, useState } from 'react'
import process from 'process'
import { PathItem } from '../interfaces'
import { Delete } from '../interfaces'

export const PathContext = createContext<any>({
    path: '/Users/dastullo/Desktop/',
})

const PathContextProvider: React.FC = ({ children }) => {
    const [path, setPath] = useState<string>('/Users/dastullo/Desktop/')
    const [files, setFiles] = useState<PathItem[] | null>(null)
    const [home, setHome] = useState<boolean>(true)
    const [deleted, setDeleted] = useState<string[]>([])

    /**
     * Function constructs a path from the folders list.
     */
    const buildPath = (folders: string[]): string => {
        let built_path = '/'
        for (let item of folders) {
            if (item) built_path += item + '/'
        }
        return built_path
    }

    /**
     * deleteItem deleted the selected file or folder. If the item selected is a folder, the use will be prompted to enter a password to confirm the action.
     */
    const deleteItem = ({ name, is_directory, password }: Delete) => {
        console.log(
            `Trying to delete: ${name}... Is it a directory? ${is_directory}`
        )
        if (is_directory) {
            if (password === process.env.PASSWORD) {
                setDeleted([...deleted, name])
                return true
            } else return false
        }
        setDeleted([...deleted, name])
        return true
    }

    /**
     * enterDirectory changes the path based on the selected folder.
     */
    const enterDirectory = (name: string): void => {
        setPath(path + name + '/')
    }

    /**
     * The function makes an API call to get all items located within a folder.
     */
    const fetchFiles = async () => {
        fetch('http://192.168.0.6:5000/files', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path }),
        })
            .then((response) => response.json())
            .then((data) => setFiles(data))
    }

    /**
     * Function acts as a previous button in the navigation bar.
     */
    const goBack = (): void => {
        let path_arr = path.split('/')
        path_arr.pop()
        path_arr.pop()
        setPath(buildPath(path_arr))
    }

    return (
        <PathContext.Provider
            value={{
                home,
                enterDirectory,
                deleted,
                deleteItem,
                fetchFiles,
                files,
                path,
                goBack,
                setHome,
            }}
        >
            {children}
        </PathContext.Provider>
    )
}

export default PathContextProvider
