import { Op } from 'sequelize'
import { ApiError } from '../error/ApiError.js'
import { Post } from '../models/index.js'

class PostController {
  async create(req, res, next) {
    try {
      const { modeldata, model, count } = req.body
      const post = await Post.create({ modeldata, model, count })
      return res.json(post)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const where = {}
      let { page, limit, model, modeldata, id, count, sort } = req.query
      if (model) where.model = { [Op.iLike]: `%${model}%` }
      if (modeldata) where.modeldata = { [Op.eq]: modeldata }
      if (id) where.id = { [Op.eq]: id }
      if (count) where.count = { [Op.eq]: count }
      page = page || 1
      limit = limit || 10
      let offset = page * limit - limit
      sort = sort || 'id'
      let post = await Post.findAndCountAll({
        limit,
        offset,
        where: {
          ...where,
        },
        order: [[sort, 'ASC']],
      })
      return res.json(post)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params
      const post = await Post.findOne({ where: { id: id } })
      return res.json(post)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      const post = await Post.destroy({ where: { id: id } })
      return res.json(post)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }
}

export default new PostController()
