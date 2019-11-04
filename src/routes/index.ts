import { Request, Response, Router } from 'express'

import singerRoutes from './singer'

const apiRoutes = Router()

apiRoutes.get('/', (req: Request, res: Response) => { res.send('TCC Express 1.00') })

apiRoutes.use('/api/singers', singerRoutes)

export default apiRoutes
