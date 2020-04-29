import dotenv from 'dotenv'
import app from './app'

// Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message)
  process.exit(1)
})

dotenv.config()

const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

// promise 에서 catch로 에러 처리를 하지 않았을 때 방생하는 요류
process.on('unhandledRejection', () => {
  console.log('UNHANDLED REJECTION: Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED, Shutting down gracefully')
  server.close(() => {
    console.log('Process terminated!')
  })
})
