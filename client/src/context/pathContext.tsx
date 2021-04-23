import React, { createContext, useState } from 'react'
import { PathItem } from '../interfaces'
import { buildPath } from '../miscellaneous/helpers'

export const PathContext = createContext<any>({
    path: process.env.REACT_APP_HOME_PATH,
})

const PathContextProvider: React.FC = ({ children }) => {
    const [path, setPath] = useState<string | undefined>(
        process.env.REACT_APP_HOME_PATH
    )
    const [files, setFiles] = useState<PathItem[] | null>(null)
    const [home, setHome] = useState<boolean>(true)
    const [deleted, setDeleted] = useState<string[]>([])
    const [password, setPassword] = useState('')

    /**
     * deleteItem deleted the selected file or folder. If the item selected is a folder, the use will be prompted to enter a password to confirm the action.
     */
    const deleteItem = ({ name, is_directory }: PathItem) => {
        setDeleted([...deleted, name])
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
        fetch('http://localhost:5000/files', {
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
        if (path) {
            let path_arr = path.split('/')
            path_arr.pop()
            path_arr.pop()
            setPath(buildPath(path_arr))
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value)
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
                handleInput,
                password,
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
