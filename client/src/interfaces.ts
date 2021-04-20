export interface BtnProps {
    item: PathItem
}

export interface Delete {
    name: string
    is_directory: boolean
    password: null | string
}

export interface ItemProps {
    name: string
    is_directory: boolean
}

export interface PathItem {
    name: string
    is_directory: boolean
}
