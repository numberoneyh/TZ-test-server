import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

const Post = sequelize.define(
  'post',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    modeldata: { type: DataTypes.INTEGER, allowNull: false },
    model: { type: DataTypes.STRING, allowNull: false },
    count: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: false }
)

export { Post }
