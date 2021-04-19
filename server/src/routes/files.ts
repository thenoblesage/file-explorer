import express from 'express'
import * as file_controller from '../controllers/system_walk'

export const router = express.Router()

router.post('/', async (req, res) => {
    console.log(`The /files route was accessed...`)
    const { path } = req.body
    let files = await file_controller.getFileList(path)
    console.log(files)
    return res.json(files)
})

router.post('/download', (req, res) => {
    const { path } = req.body
    console.log(`You entered the download route. You passed the path: ${path}`)
    res.download(path, (err) => {
        if (err) console.log(err)
        else console.log('The file was sent.')
    })
})
