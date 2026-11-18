import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandlers'
import { notfound } from './app/middleware/notFound'
import router from './routes'

const app: Application = express()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Maruf!')
})

// Not Found middleware
app.use(notfound)

// Global Error Handler (always last)
app.use(globalErrorHandler)

export default app