import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/

router.get('/', profilesCtrl.index)
router.put('/:id', profilesCtrl.update)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:id',checkAuth, profilesCtrl.show)
//!route to add to collection
router.post('/addCocktail',checkAuth,profilesCtrl.addCocktail)
router.patch('/removeCocktail',checkAuth,profilesCtrl.removeCocktail)
// router.put('/:id', checkAuth, profilesCtrl.update)

export { router }
