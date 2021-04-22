import React from 'react'
import { PathItem } from '../interfaces'
import Navigation from './navigation'

const Item: React.FC<PathItem> = ({ name, is_directory }) => {
    return (
        <div className="item">
            {is_directory ? (
                <img
                    alt="folder-img"
                    src="https://img.icons8.com/bubbles/50/000000/folder-invoices.png"
                />
            ) : (
                <img
                    alt="file-img"
                    src="https://img.icons8.com/bubbles/50/000000/file.png"
                />
            )}
            <small>{name}</small>
            <Navigation item={{ name, is_directory }} />
        </div>
    )
}

export default Item
