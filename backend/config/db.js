import mongoose from 'mongoose'
import chalk from 'chalk'

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        console.log(chalk.underline.cyan(`MongoDB Connected! ${conn.connection.host}`))
    } catch (error) {
        console.log(chalk.bold.red(`Error: ${error.message}`))
        process.exit(1)
    }
}

export default connectDB