import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import gamesRouter from '../api/gamesApi'
import { config } from './config'

const app = express()
const PORT = 3001

app.use(cors({
  origin: config.cors.origin
}))

app.use(express.json())

app.use('/api/games', gamesRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${config.port}`)
  console.log(`API: http://localhost:${config.port}/api/games`)
  console.log(`Environment: ${config.env}`)
})