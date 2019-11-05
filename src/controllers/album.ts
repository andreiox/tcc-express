import * as uuid from 'uuid/v4'

import { pool } from '../db/postgres_client'
import { AlbumInterface } from '../interfaces/album'
import {
    generateDeleteSQL, generateInsertSQL, generateSelectSQL, generateUpdateSQL,
} from '../utils/sql'

const TABLE_NAME = 'albums'

export const create = async (data: AlbumInterface): Promise<AlbumInterface> => {
    data.id = uuid()
    data.created_at = new Date()

    const insertResult = await pool.query(generateInsertSQL(TABLE_NAME, data), Object.values(data))
    return insertResult.rows[0]
}

export const getAll = async (): Promise<AlbumInterface[]> => {
    const result = await pool.query(generateSelectSQL(TABLE_NAME, []), [])
    return result.rows
}

export const getById = async (id: string): Promise<AlbumInterface> => {
    const result = await pool.query(generateSelectSQL(TABLE_NAME, ['id']), [id])
    if (result.rowCount === 0) {
        throw new Error('Album Not Found')
    }

    return result.rows[0]
}

export const update = async (id: string, album: AlbumInterface): Promise<AlbumInterface> => {
    const data: AlbumInterface = { ...album }
    delete data.id
    delete data.created_at

    const values = Object.values(data)
    values.push(id)

    const updateResult = await pool.query(generateUpdateSQL(TABLE_NAME, data), values)
    if (updateResult.rowCount === 0) {
        throw new Error('Album Not Found')
    }

    return updateResult.rows[0]
}

export const remove = async (id: string): Promise<any> => {
    const result = await pool.query(generateDeleteSQL(TABLE_NAME), [id])
    if (result.rowCount === 0) {
        throw new Error('Album Not Found')
    }
}
