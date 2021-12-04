const ALLO = require('../../lib/allo')
const mySQLWrapper = require('../../lib/mysqlWrapper')

class Intervention extends ALLO {

    static get TABLE_NAME() {
        return 'interventions'
    }

    static async getByID(_, {id}) {
        return await this.find(id)
    }

    static async findMatching(_, fields) {
        if (Object.keys(fields).length === 0) return this.findAll()
        
        return this.findByFields({
            fields
        })
    }

    static async createEntry(_, {author, status}) {
        const connection = await mySQLWrapper.getConnectionFromPool()
        try {
            let _result = await this.insert(connection, {
                data: {
                    author,
                    status
                }
            })

            return this.getByID(_, {id: _result.insertId})
        } finally {
            if (connection != null) connection.release()
        }
    }

    static async updateEntry(_, {id, status}) {
        const connection = await mySQLWrapper.getConnectionFromPool()
        try {
            if (status == "InProgress") {
                let start_date = new Date(Date.now())
                await this.update(connection, {
                    id,
                    data: { 
                        start_date,
                        status
                    }
                })
                return this.getByID(_, {id})
            }
            else if (status == "Completed") {
                let end_date = new Date(Date.now())
        
                await this.update(connection, {
                    id,
                    data: {
                        end_date,
                        status
                    }
                })
                return this.getByID(_, {id})
            }
            else
            {
                await this.update(connection, {
                    id,
                    data: {
                        status
                    }
                })
                return this.getByID(_, {id})

            }
        } finally {
            if (connection != null) connection.release()
        }
    }
}

module.exports = Intervention