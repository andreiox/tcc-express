import * as uuid from 'uuid/v4'

import { pool } from '../db/postgres_client'
import { MusicInterface } from '../interfaces/music'
import {
    generateDeleteSQL, generateInsertSQL, generateSelectSQL, generateUpdateSQL,
} from '../utils/sql'

const TABLE_NAME = 'musics'

export const create = async (data: MusicInterface): Promise<MusicInterface> => {
    data.id = uuid()
    data.created_at = new Date()

    const insertResult = await pool.query(generateInsertSQL(TABLE_NAME, data), Object.values(data))
    return insertResult.rows[0]
}

export const getAll = async (): Promise<MusicInterface[]> => {
    const result = await pool.query(generateSelectSQL(TABLE_NAME, []), [])
    return result.rows
}

export const getById = async (id: string): Promise<MusicInterface> => {
    const result = await pool.query(generateSelectSQL(TABLE_NAME, ['id']), [id])
    if (result.rowCount === 0) {
        throw new Error('Music Not Found')
    }

    return result.rows[0]
}

export const update = async (id: string, music: MusicInterface): Promise<MusicInterface> => {
    const data: MusicInterface = { ...music }
    delete data.id
    delete data.created_at

    const values = Object.values(data)
    values.push(id)

    const updateResult = await pool.query(generateUpdateSQL(TABLE_NAME, data), values)
    if (updateResult.rowCount === 0) {
        throw new Error('Music Not Found')
    }

    return updateResult.rows[0]
}

export const remove = async (id: string): Promise<any> => {
    const result = await pool.query(generateDeleteSQL(TABLE_NAME), [id])
    if (result.rowCount === 0) {
        throw new Error('Music Not Found')
    }
}
