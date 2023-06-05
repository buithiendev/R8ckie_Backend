import app from './src/app'
import configsApplication from './src/configs/configs.application'

const PORT = configsApplication.app.port

app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`)
})

process.on('SIGINT', () => {
    console.log('Exit server express...')
    process.exit()
})
