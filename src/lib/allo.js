const mysql = require('./mysqlWrapper')
const sqlConstants = require('../util/sqlConstants')

class ALLO {

    static get PRIMARY_KEY() {
        return "id"
    }
    static async find(id) {
        return (await mysql.createQuery({
            query: `SELECT * FROM ?? WHERE ?? = ? LIMIT 1;`,
            params: [this.TABLE_NAME, this.PRIMARY_KEY, id]
        })).shift()
    }



    static findAll() {
        return mysql.createQuery({
            query: `SELECT * FROM ??;`,
            params: [this.TABLE_NAME]
        });
    }


     static findByFields({fields, limit, order}) {

        let baseQuery = `SELECT * FROM ?? WHERE `
        let params = [this.TABLE_NAME]


        Object.keys(fields).forEach((key, index) => {
            baseQuery += `${key} = ?`
            params.push(fields[key])
            if (fields[key] == "Pending") {
                baseQuery += ` AND start_date IS NULL `
            }
            if (index + 1 !== Object.keys(fields).length) baseQuery += ` AND `
        })


        if (order != null && order.by != null && order.direction != null) {
            baseQuery += ` ORDER BY ??`
            baseQuery += order.direction === sqlConstants.DESC ? " DESC" : " ASC"
            params.push(order.by)
        }


        if (limit != null && !isNaN(limit)) {
            baseQuery += ` LIMIT ?`
            params.push(limit)
        }
        return mysql.createQuery({
            query: baseQuery,
            params
        })
    }
    static findByStartDate({fields, limit, order}) {

        let baseQuery = `SELECT * FROM ?? WHERE `

        let params = [this.TABLE_NAME]


        Object.keys(fields).forEach((key, index) => {
            baseQuery += `${key} = ?`
            params.push(fields[key])
            if (index + 1 !== Object.keys(fields).length) baseQuery += ` AND `
        })


        if (order != null && order.by != null && order.direction != null) {
            baseQuery += ` ORDER BY ??`
            baseQuery += order.direction === sqlConstants.DESC ? " DESC" : " ASC"
            params.push(order.by)
        }


        if (limit != null && !isNaN(limit)) {
            baseQuery += ` LIMIT ?`
            params.push(limit)
        }
        return mysql.createQuery({
            query: baseQuery,
            params
        })
    }


    static update(connection, {data, id}) {
        return mysql.createTransactionalQuery({
            query: `UPDATE ??
                    SET ?
                    WHERE ?? = ?;`,
            params: [this.TABLE_NAME, data, this.PRIMARY_KEY, id],
            connection
        })
    }
    static insert(connection, {data}) {
        return mysql.createTransactionalQuery({
            query: `INSERT INTO ${this.TABLE_NAME}
                    SET ?;`,
            params: [data],
            connection
        })
    }



    static delete(connection, {id}) {
        return mysql.createTransactionalQuery({

            query: `DELETE FROM  ??
                    WHERE ?? = ?;`,
            params: [this.TABLE_NAME,this.PRIMARY_KEY, id],
            connection
            
        })
    }

}

module.exports = ALLO