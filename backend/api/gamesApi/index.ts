import { Router } from 'express'
import { prisma } from '../../src/prisma'

const router = Router()

router.get('/genres', async (req, res) => {
  try {
    const genres = await prisma.genre.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    
    const genreOptions = [
      { value: "", label: "Все категории" },
      ...genres.map(genre => ({
        value: genre.name,
        label: genre.name
      }))
    ]
    
    res.json(genreOptions)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Ошибка загрузки жанров' })
  }
})

router.get('/', async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        genres: {
          include: {
            genre: true
          }
        },
        owner: true
      }
    })

    const boardGames = games.map(game => ({
      id: game.id,
      name: game.name,
      genre: game.genres.map(g => g.genre.name),
      players: game.players,
      avgTimeInMinutes: game.avgTimeInMinutes,
      imageUrl: game.imageUrl,
      description: game.description || '',
      owner: game.owner.name,
      priceInRubles: game.priceInRubles
    }))

    res.json(boardGames)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Ошибка загрузки игр' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, genre, players, avgTimeInMinutes, description, owner, priceInRubles, imageUrl } = req.body

    const ownerRecord = await prisma.player.findFirst({
      where: { name: owner }
    })

    if (!ownerRecord) {
      return res.status(400).json({ error: 'Владелец не найден' })
    }

    const newGame = await prisma.game.create({
      data: {
        id: Date.now().toString(),
        name,
        players,
        avgTimeInMinutes: Number(avgTimeInMinutes),
        imageUrl: imageUrl || '/images/default.jpg',
        description: description || null,
        ownerId: ownerRecord.id,
        priceInRubles: Number(priceInRubles)
      }
    })

    const genreNames = Array.isArray(genre) ? genre : [genre]

    for (const genreName of genreNames) {
      const genreRecord = await prisma.genre.findFirst({
        where: { name: genreName }
      })

      if (genreRecord) {
        await prisma.gameGenre.create({
          data: {
            gameId: newGame.id,
            genreId: genreRecord.id
          }
        })
      }
    }

    res.status(201).json(newGame)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Ошибка создания игры' })
  }
})



export default router