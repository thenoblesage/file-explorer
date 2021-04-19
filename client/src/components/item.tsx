import React from 'react'
import Navigation from './navigation'

interface Props {
    details: { name: string; is_directory: boolean }
}

const Item: React.FC<Props> = ({ details }: Props) => {
    return (
        <div className="item">
            {details.is_directory ? (
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
            <small>{details.name}</small>
            <Navigation item={details} />
        </div>
    )
}

export default Item
