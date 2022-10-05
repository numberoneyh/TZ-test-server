import * as dotenv from 'dotenv'
dotenv.config()

import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DATABASE_URL,
    port: process.env.DB_PORT,
  }
)
export default sequelize
