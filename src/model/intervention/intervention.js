const DAO = require('../../lib/dao')
const mySQLWrapper = require('../../lib/mysqlWrapper')

class Intervention extends DAO {

    /**
     * Overrides TABLE_NAME with this class' backing table at MySQL
     */
    static get TABLE_NAME() {
        return 'interventions'
    }

    /**
     * Returns a intervention by its ID
     */
    static async getByID(_, {id}) {
        return await this.find(id)
    }

    /**
     * Returns a list of interventions matching the passed fields
     * @param {*} fields - Fields to be matched
     */
    static async findMatching(_, fields) {
        // Returns early with all interventions if no criteria was passed
        if (Object.keys(fields).length === 0) return this.findAll()
        
        // Find matching interventions
        return this.findByFields({
            fields
        })
    }

    /**
     * Creates a new intervention
     */
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
            // Releases the connection
            if (connection != null) connection.release()
        }
    }

    /**
     * Updates a intervention 
     */
    static async updateEntry(_, {id, status}) {
        const connection = await mySQLWrapper.getConnectionFromPool()
        try {
            if (status == "InProgress") {
                console.log("YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                let start_date = Date.now().toString();
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
                console.log("YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
        
                await this.update(connection, {
                    id,
                    data: {
                        status
                    }
                })
    
                return this.getByID(_, {id})
            }
        } finally {
            // Releases the connection
            if (connection != null) connection.release()
        }
    }
}

module.exports = Intervention