const express = require('express')
const bodyParser = require('body-parser')
const Routes = require('./routes')

class App {

    constructor() {
        this.expressApp = express()

        this.configs = {
            get port() {
                return process.env.PORT || 5000
            }
        }
    }

    applyMiddleware() {
        this.expressApp.use(bodyParser.json())

        new Routes(this.expressApp)
    }

    run() {
        this.expressApp.listen(this.configs.port, () => {
            console.log("Express server running project on port " + this.configs.port + ".")
            console.log('Environment: ${process.env.STAGE || "development"}')
        })
    }
}

//Runs the thing
const app = new App()
app.applyMiddleware()
app.run()
