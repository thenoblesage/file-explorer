import React, { useContext, useState } from 'react'
import { PathContext } from '../context/pathContext'
import { BtnProps } from '../interfaces'
import Modal from './modal'

const Navigation: React.FC<BtnProps> = ({ item }) => {
    const usePath = useContext(PathContext)
    const { path, enterDirectory, deleteItem } = usePath
    const [modal, setModal] = useState(false)

    /**
     * getFile makes a request to the server for a file and prompts the user to download.
     */
    const getFile = async () => {
        let filename = ''
        fetch('http://192.168.0.6:5000/files/download', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path: path + item.name }),
        })
            .then((response) => {
                filename = response.headers
                    .get('Content-Disposition')!
                    .split(';')[1]
                    .split('=')[1]
                return response.blob()
            })
            .then((blob) => {
                let link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = filename
                link.click()
                link.remove()
            })
    }

    return (
        <>
            {modal ? (
                <Modal
                    name={item.name}
                    is_directory={item.is_directory}
                    close={() => setModal(false)}
                />
            ) : null}
            <div className="navigation">
                {item.is_directory ? (
                    <>
                        <img
                            alt="enter-button"
                            className="nav-btn"
                            src="https://img.icons8.com/material-two-tone/24/000000/enter-2--v2.png"
                            onClick={() => enterDirectory(item.name)}
                            data-testid="enter-btn"
                        />
                        <img
                            alt="delete-button"
                            className="nav-btn"
                            src="https://img.icons8.com/plumpy/24/000000/delete-sign.png"
                            onClick={() => {
                                setModal(true)
                            }}
                            data-testid="delete-btn"
                        />
                    </>
                ) : (
                    <>
                        <img
                            alt="download-button"
                            className="nav-btn"
                            src="https://img.icons8.com/plumpy/24/000000/download--v1.png"
                            onClick={() => getFile()}
                            data-testid="download-btn"
                        />
                        <img
                            alt="delete-button"
                            className="nav-btn"
                            src="https://img.icons8.com/plumpy/24/000000/delete-sign.png"
                            onClick={() => deleteItem({ ...item })}
                            data-testid="delete-btn"
                        />
                    </>
                )}
            </div>
        </>
    )
}

export default Navigation
