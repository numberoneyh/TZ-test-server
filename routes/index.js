import { Router } from 'express'
import postRouter from './postRouter.js'
const router = new Router()

router.use('/posts', postRouter)

export { router }
