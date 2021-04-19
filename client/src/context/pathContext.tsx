import React, { createContext, useState } from 'react'

export const PathContext = createContext<any>({
    path: '/Users/dastullo/Desktop/',
})

const PathContextProvider: React.FC = ({ children }) => {
    const [path, setPath] = useState<string>('/Users/dastullo/Desktop/')

    /**
     * Function constructs a path from the folders list.
     */
    const buildPath = (folders: string[]): string => {
        let built_path = '/'
        for (let item of folders) {
            if (item) built_path += item + '/'
        }
        console.log(`buildPath: ${built_path}`)
        return built_path
    }

    const enterDirectory = (name: string): void => {
        setPath(path + name + '/')
        console.log(`enterDirectory: ${path}`)
    }

    /**
     * Function acts as a previous button in the navigation bar.
     */
    const goBack = (): void => {
        let path_arr = path.split('/')
        console.log('Array before pop: ', path_arr)
        path_arr.pop()
        path_arr.pop()
        console.log('Array after pop: ', path_arr)
        setPath(buildPath(path_arr))
    }

    return (
        <PathContext.Provider
            value={{
                path,
                enterDirectory,
                goBack,
            }}
        >
            {children}
        </PathContext.Provider>
    )
}

export default PathContextProvider
