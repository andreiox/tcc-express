import { NextFunction, Request, Response, Router } from 'express'

import { create, getAll, getById, remove, update } from '../controllers/music'
import { MusicInterface } from '../interfaces/music'

const routes = Router()

routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: MusicInterface = req.body
        const music = await create(data)

        return res.status(201).json(music)
    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await getAll()

        return res.status(200).json(musics)

    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id!
        const music = await getById(id)

        return res.status(200).json(music)

    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id!
        const data: MusicInterface = req.body
        const music = await update(id, data)

        return res.status(200).json(music)

    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id!
        await remove(id)

        return res.status(200).send('')

    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

export default routes
