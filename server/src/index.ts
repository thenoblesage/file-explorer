import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import * as file_router from '../src/routes/files'
import * as bodyParser from 'body-parser'

dotenv.config()

const app = express()

const cors_options = {
    exposedHeaders: 'Content-Disposition',
    origin: true,
}

app.use(cors(cors_options))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/files', file_router.router)

app.listen(process.env.PORT, () =>
    console.log(`The server is running on port ${process.env.PORT}`)
)
