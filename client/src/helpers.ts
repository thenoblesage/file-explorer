/**
 * Function constructs a path from the folders list.
 */
export const buildPath = (folders: string[]): string => {
    let built_path = '/'
    for (let item of folders) {
        if (item) built_path += item + '/'
    }
    return built_path
}
