import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import gamesRouter from '../api/gamesApi'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/api/games', gamesRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`API: http://localhost:${PORT}/api/games`)
})