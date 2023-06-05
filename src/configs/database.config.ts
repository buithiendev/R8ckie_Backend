require('dotenv').config()

const development = {
    mongodb: {
        host: process.env.DEVELOPMENT_MONGDB_HOST || '',
    },
}

const production = {
    mongodb: {
        host: process.env.PRODUCTION_MONGDB_HOST || '',
    },
}

const configs = { development, production }

export default configs
