import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/

router.get('/', profilesCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.put('/:id', profilesCtrl.updateProfile)
router.get('/:id',checkAuth, profilesCtrl.show)
//!route to add to collection
// router.patch('/editProfile', checkAuth,profilesCtrl.updateProfile)
router.post('/addCocktail',checkAuth,profilesCtrl.addCocktail)
router.patch('/removeCocktail',checkAuth,profilesCtrl.removeCocktail)

export { router }
