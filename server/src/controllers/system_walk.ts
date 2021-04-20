import fs from 'fs'

/**
 * getFileList returns an array of all items located at a particular path. The array consists of items of type {name: string, is_directory: boolean}.
 */
export const getFileList: Function = (path: string) => {
    return fs.readdirSync(path).map((file) => {
        return {
            name: file,
            is_directory: fs.lstatSync(path + file).isDirectory(),
        }
    })
}
