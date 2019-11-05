import { NextFunction, Request, Response, Router } from 'express'

import { create, getAll, getById, remove, update } from '../controllers/album'
import { AlbumInterface } from '../interfaces/album'

const routes = Router()

routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: AlbumInterface = req.body
        const album = await create(data)

        return res.status(201).json(album)
    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const albums = await getAll()

        return res.status(200).json(albums)

    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id!
        const album = await getById(id)

        return res.status(200).json(album)

    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id!
        const data: AlbumInterface = req.body
        const album = await update(id, data)

        return res.status(200).json(album)

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
