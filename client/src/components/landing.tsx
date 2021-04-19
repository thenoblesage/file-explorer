import React, { useEffect, useContext, useState } from 'react'
import Item from './item'
import { PathContext } from '../context/pathContext'

const Landing: React.FC = () => {
    const UsePath = useContext(PathContext)
    const { path, goBack } = UsePath
    const [files, setFiles] = useState([])

    useEffect(() => {
        //fetch('http://localhost:5000/files', {
        fetch('http://192.168.0.6:5000/files', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path }),
        })
            .then((response) => response.json())
            .then((data) => setFiles(data))
    }, [path])

    return (
        <>
            {!files ? (
                <p>Loading ...</p>
            ) : (
                <div className="landing">
                    <h4>React File Explorer</h4>
                    <div className="application-container">
                        <button className="back-btn" onClick={() => goBack()}>
                            Back
                        </button>
                        <hr />
                        <div className="file-explorer">
                            {files.map((file, index) => {
                                return <Item key={index} details={file} />
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Landing
