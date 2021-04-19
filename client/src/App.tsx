import React from 'react'
import './App.css'
import Landing from './components/landing'
import Footer from './components/footer'
import PathContextProvider from './context/pathContext'

function App() {
    return (
        <PathContextProvider>
            <Landing />
            <Footer />
        </PathContextProvider>
    )
}

export default App
