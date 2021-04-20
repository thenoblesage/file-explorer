import React, { useEffect, useContext } from 'react'
import Item from './item'
import { PathContext } from '../context/pathContext'
import { PathItem } from '../interfaces'

const Landing: React.FC = () => {
    const UsePath = useContext(PathContext)
    const { deleted, files, home, path, goBack, fetchFiles, setHome } = UsePath
    console.log('Rendering: Landing')

    useEffect(() => {
        if (path === '/Users/dastullo/Desktop/') {
            setHome(true)
        } else {
            setHome(false)
        }
        fetchFiles()
    }, [path])

    return (
        <>
            {!files ? (
                <p>Loading ...</p>
            ) : (
                <div className="landing">
                    <h4>React File Explorer</h4>
                    <div className="application-container">
                        {home ? null : (
                            <button
                                className="back-btn"
                                onClick={() => goBack()}
                                disabled={home}
                            >
                                Back
                            </button>
                        )}
                        <hr />
                        <div className="file-explorer">
                            {files
                                .filter(
                                    (file: PathItem) =>
                                        !deleted.includes(file.name)
                                )
                                .map((file: PathItem, index: number) => {
                                    return (
                                        <Item
                                            key={index}
                                            name={file.name}
                                            is_directory={file.is_directory}
                                        />
                                    )
                                })}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Landing
