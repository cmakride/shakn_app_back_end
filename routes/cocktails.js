import { Router } from "express";
import * as cocktailsCtrl from '../controllers/cocktails.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/:id', cocktailsCtrl.show)
router.get('/',cocktailsCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/:id/comments', cocktailsCtrl.comment)
router.post('/', cocktailsCtrl.create)
router.put('/:id',cocktailsCtrl.update)
router.delete('/:id',cocktailsCtrl.delete)


export{
  router
}