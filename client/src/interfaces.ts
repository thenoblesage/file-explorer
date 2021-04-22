export interface BtnProps {
    item: PathItem
}

export interface ModalType {
    name: string
    is_directory: boolean
    close(): void
}

export interface PathItem {
    name: string
    is_directory: boolean
}
