import { NextFunction, Request, Response, Router } from 'express'

const routes = Router()

/**
 * GET /api/example/
 */
routes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).send({ test: true })

    } catch (error) {
        next({ code: error.code, result: null, error: error.message })
    }
})

export default routes
