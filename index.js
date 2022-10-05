import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import sequelize from './db.js'
import { Post } from './models/index.js'
import { router } from './routes/index.js'
import { EhandlingMiddleware } from './middleware/EhandlingMiddleware.js'

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(EhandlingMiddleware)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`server started on port: ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
