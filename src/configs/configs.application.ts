import databaseConfig from './database.config'
require('dotenv').config()

const development = {
    app: {
        port: process.env.PRODUCTION_APP_PORT || 5001,
    },
    database: databaseConfig.development,
}

const production = {
    app: {
        port: process.env.PRODUCTION_APP_PORT || 5002,
    },
    database: databaseConfig.production,
}

const configs = { development, production }

const env = process.env.NODE_ENV || 'development'

export default configs[env as keyof typeof configs]
