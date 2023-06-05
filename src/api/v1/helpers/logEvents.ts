import { format } from 'date-fns'
import * as fileStream from 'fs'
import * as path from 'path'
const fs = fileStream.promises

const fileName = path.join(__dirname, '../logs', 'logs.log')
const logEvents = async (message: string) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyyy\tss:mm:HH')}`
    const contentLog = `${dateTime}-------${message}\n`
    try {
        fs.appendFile(fileName, contentLog)
    } catch (error) {
        console.error(error)
    }
}

export default logEvents
