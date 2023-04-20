import { Router } from 'express'
import response from './response.js'
import photoRoute from './routes/photoRoute.js'

const router = Router()

router.use('/api', photoRoute)

router.all('*', (req, res) => {
    response(res, 404, false, 'The requested url cannot be found.')
})

export default router
