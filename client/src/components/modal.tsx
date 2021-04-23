import React, { useContext } from 'react'
import { PathContext } from '../context/pathContext'
import { ModalType } from '../interfaces'

const Modal: React.FC<ModalType> = ({ name, is_directory, close }) => {
    const usePath = useContext(PathContext)
    const { deleteItem, handleInput, password } = usePath
    return (
        <div className="modal">
            <div className="modal-header">
                <span className="modal-header-text">Confirm Delete</span>
                <span className="close-btn" onClick={() => close()}>
                    &times;
                </span>
            </div>
            <div className="modal-body">
                <span className="modal-body-text">
                    You are about to delete a folder. This process cannot be
                    undone! Enter the password below to confirm the delete
                    request.
                </span>
                <input
                    className="form-control"
                    id="password"
                    type="password"
                    onChange={handleInput}
                />
                <button
                    className="delete-btn"
                    onClick={() => {
                        if (password === process.env.REACT_APP_PASSWORD) {
                            deleteItem({ name, is_directory })
                            close()
                        } else {
                            close()
                            alert('The password you entered was incorrect.')
                        }
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Modal
