import chalk from 'chalk'

class OutputType {
    static INFORMATION = 'INFORMATION'
    static SUCCESS = 'SUCCESS'
    static ERROR = 'ERROR'
    static WARNING = 'WARNING'
}

const print = (message, outputType) => {
    switch (outputType) {
        case 'INFORMATION':
            console.log(chalk.white(message))
            break
        case 'SUCCESS':
            console.log(chalk.green(message))
            break
        case 'WARNING':
            console.log(chalk.yellow(message))
            break
        case 'ERROR':
            console.log(chalk.red(message))
            break
        default:
            console.log(message)
    }
}

export { OutputType, print }
