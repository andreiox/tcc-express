import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as morgan from 'morgan'

import routes from './routes'

const cors = require('cors')

class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
    }

    private config(): void {
        require('dotenv').config()
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(morgan('dev'))
        this.app.use(routes)
        this.app.use(this.errorHandling.bind(this))
    }

    private errorHandling(error, req, res, next) {
        console.log(error)
        if (!error.code) {
            error.code = 500
        }

        res.status(error.code).send(error)
        next()
    }
}

export default new App().app
