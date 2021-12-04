const mysql = require('./mysqlWrapper')
const sqlConstants = require('../util/sqlConstants')

class ALLO {

    /**
     * This property can be overriden when the ID column is differet from 'id'
     */
    static get PRIMARY_KEY() {
        return "id"
    }
    /**
     * Retrieves a single entry matching the passed ID
     * @param {Number} id - The entry ID
     */
    static async find(id) {
        return (await mysql.createQuery({
            query: `SELECT * FROM ?? WHERE ?? = ? LIMIT 1;`,
            params: [this.TABLE_NAME, this.PRIMARY_KEY, id]
        })).shift()
    }



    /**
     * Retrieves all entries on the extending class' table
     */
    static findAll() {
        return mysql.createQuery({
            query: `SELECT * FROM ??;`,
            params: [this.TABLE_NAME]
        });
    }


    /**
     * Find entries by their fields
     * @param {Object} fields - The fields to be matched
     * @param {Object} limit - Limits the amount of returned entries
     * @param {Object} order - Orders the returned entries using a provided field
     */
     static findByFields({fields, limit, order}) {

        let baseQuery = `SELECT * FROM ?? WHERE `
        let params = [this.TABLE_NAME]


        Object.keys(fields).forEach((key, index) => {
            baseQuery += `${key} = ?`
            params.push(fields[key])
            console.log(key)
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
        console.log(params)
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
            console.log(key)
            // console.log(typeof(key), typeof(index))
            params.push(fields[key])
            console.log(params)
            // if (key == "start_date") {
            //     params.push("")
            // }
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
        console.log(params)
        return mysql.createQuery({
            query: baseQuery,
            params
        })
    }


    /**
     * Updates an entry
     * @param {MySQL.Connection} connection - The connection which will do the update. It should be immediatelly released unless in a transaction
     * @param {Object} data - The data fields which will be updated
     * @param {Number} id - The ID of the entry to be updated
     */
    static update(connection, {data, id}) {
        return mysql.createTransactionalQuery({
            query: `UPDATE ??
                    SET ?
                    WHERE ?? = ?;`,
            params: [this.TABLE_NAME, data, this.PRIMARY_KEY, id],
            connection
        })
    }
    /**
     * Inserts a new entry
     * @param {MySQL.Connection} connection - The connection which will do the insert. It should be immediatelly released unless in a transaction
     * @param {Object} data - The fields which will populate the new entry
     */
    static insert(connection, {data}) {
        return mysql.createTransactionalQuery({
            query: `INSERT INTO ${this.TABLE_NAME}
                    SET ?;`,
            params: [data],
            connection
        })
    }



    /**
     * Deletes an entry
     * @param {MySQL.Connection} connection - The connection which will do the deletion. It should be immediatelly released unless in a transaction
     * @param {Number} id - The ID of the entry to be deleted
     */
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