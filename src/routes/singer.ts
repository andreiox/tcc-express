import { NextFunction, Request, Response, Router } from 'express'

import { create, getAll, getById, remove, update } from '../controllers/singer'
import { SingerInterface } from '../interfaces/singer'

const routes = Router()

routes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: SingerInterface = req.body
        const address = await create(data)

        return res.status(201).json(address)
    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const addresses = await getAll()

        return res.status(200).json(addresses)

    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id!
        const address = await getById(id)

        return res.status(200).json(address)

    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id!
        const data: SingerInterface = req.body
        const address = await update(id, data)

        return res.status(200).json(address)

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
