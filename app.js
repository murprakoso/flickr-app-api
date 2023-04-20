import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()

app.use(cors())
// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Import routes
import routes from './routes.js'
app.use('/', routes)

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}...`))
