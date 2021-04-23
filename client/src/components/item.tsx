import React from 'react'
import { PathItem } from '../interfaces'
import Navigation from './navigation'

const Item: React.FC<PathItem> = ({ name, is_directory }) => {
    return (
        <div className="item" data-testid="path-item">
            {is_directory ? (
                <img
                    alt="folder-img"
                    src="https://img.icons8.com/bubbles/50/000000/folder-invoices.png"
                    data-testid="path-item-image"
                />
            ) : (
                <img
                    alt="file-img"
                    src="https://img.icons8.com/bubbles/50/000000/file.png"
                    data-testid="path-item-image"
                />
            )}
            <small data-testid="path-item-name">{name}</small>
            <Navigation item={{ name, is_directory }} />
        </div>
    )
}

export default Item
