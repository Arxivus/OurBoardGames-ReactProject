import { Router } from 'express'
import { prisma } from '../../src/prisma'

const router = Router()

// Получаем список игроков
router.get('/players', async (req, res) => {
  try {
    const players = await prisma.player.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    
    const playerOptions = [
      ...players.map(player => ({
        value: player.name,
        label: player.name
      }))
    ]
    
    res.json(playerOptions)
    
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Ошибка загрузки игроков' })
  }
})

// Получаем список жанров игр
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

// Получаем список игр и приводим к нужному формату
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

// Добавление игры в базу данных
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

    res.status(201).json({
      message: 'Игра успешно добавлена',
      game: newGame
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Ошибка создания игры' })
  }
})

// Удаление игры из базы
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const existingGame = await prisma.game.findUnique({
      where: { id }
    })

    if (!existingGame) {
      return res.status(404).json({ error: 'Игра не найдена' })
    }

    await prisma.game.delete({
      where: { id }
    })

    res.status(200).json({ message: 'Игра успешно удалена', id })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Ошибка удаления игры' })
  }
})



export default router