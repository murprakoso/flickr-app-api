import { Router } from 'express'
import * as controller from '../controllers/photoController.js'

const router = Router()

// router
router.get('/photos', controller.getPhotos)
router.get('/photos/single', controller.getSinglePhoto)
router.get('/tags', controller.getTags)
router.get('/search', controller.search)

export default router
