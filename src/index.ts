import express, { Request, Response } from 'express'

const app = express()

const PORT = process.env.PORT || 3003

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('<h1>Hello</h1>')
})

app.listen(PORT, () => {
  console.log('Server is running on', PORT)
})
