import express from 'express'
import chalk from 'chalk'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRouter from './routes/productRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRouter)

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(
        chalk.yellow.bold(
            `Server is up and running in ${process.env.NODE_ENV} mode on PORT ${port}`
        )
    )
})
