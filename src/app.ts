import express from 'express'
import cors  from 'cors'
import router from './routes/offer-routes'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

app.use('/api/offers', router)


export default app;