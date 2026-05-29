import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import gamesRouter from '../api/gamesApi'
import { config } from './config'

const app = express()

app.use(cors({
  origin: config.cors.origin
}))

app.use(express.json())

app.use('/api/games', gamesRouter)

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`)
  console.log(`API: http://localhost:${config.port}/api/games`)
  console.log(`Environment: ${config.env}`)
})