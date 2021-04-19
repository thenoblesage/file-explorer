import fs from 'fs'

export const getFileList: Function = (path: string) => {
    console.log(path)
    return fs.readdirSync(path).map((file) => {
        return {
            name: file,
            is_directory: fs.lstatSync(path + file).isDirectory(),
        }
    })
}
