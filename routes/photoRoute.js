import { Router } from 'express'
import * as controller from '../controllers/photoController.js'

const router = Router()

// router
router.get('/photos', controller.getPhotos)
router.get('/photos/:photoId', controller.getSinglePhoto)
router.get('/search', controller.search)
router.get('/feeds', controller.feeds)

export default router
