export function generateInsertSQL(table: string, data: object): string {
    const columns = Object.keys(data)
    const placehouders = columns.map((column, index) => { return `$${index + 1}` })

    return `INSERT INTO ${table} (${columns.join()}) VALUES (${placehouders}) RETURNING *`
}

export function generateUpdateSQL(table: string, data: object): string {
    const columns = Object.keys(data)
    const placehouders = columns.map((column, index) => { return `${column}=$${index + 1}` })

    return `UPDATE ${table} SET ${placehouders.join()} WHERE id=$${columns.length + 1} RETURNING *`
}

export function generateSelectSQL(table: string, condition: string[], attributesToRetrieve: string[] = ['*']) {
    const placehouders = condition.map((field, index) => { return `${field}=$${index + 1}` })

    let sql = `SELECT ${attributesToRetrieve.join()} from ${table}`
    if (placehouders.length) {
        sql = sql + ` WHERE ${placehouders.join(' and ')}`
    }

    return sql
}

export function generateDeleteSQL(table: string) {
    return `DELETE FROM ${table} WHERE id=$1`
}
