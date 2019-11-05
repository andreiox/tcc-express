import { Request, Response, Router } from 'express'

import albumRoutes from './album'
import musicRoutes from './music'
import singerRoutes from './singer'

const apiRoutes = Router()

apiRoutes.get('/', (req: Request, res: Response) => { res.send('TCC Express 1.00') })

apiRoutes.use('/api/singers', singerRoutes)
apiRoutes.use('/api/albums', albumRoutes)
apiRoutes.use('/api/musics', musicRoutes)

export default apiRoutes
