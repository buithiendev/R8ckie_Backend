import mongoose from 'mongoose'
import configsApplication from '../configs/configs.application'

const { database } = configsApplication
const connectString: string = database.mongodb.host

class Database {
    static instance: Database

    constructor() {
        this.connect()
    }

    connect() {
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }

        const options = {
            maxPoolSize: 50,
        }

        mongoose
            .connect(connectString, options)
            .then(() => {
                console.log('Connect to mongodb successful')
            })
            .catch((error) => {
                console.log('Connect to mongodb failed')
            })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongoDB: Database = Database.getInstance()

export default instanceMongoDB
