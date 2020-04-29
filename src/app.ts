import express from 'express'
import path from 'path'
import exphbs from 'express-handlebars'

// Router
import viewRouter from './routes/view.route'

const app = express()
app.use(express.static(path.join(__dirname, 'public')))

// Set Template Engine
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
  })
)
app.set('view engine', 'hbs')

app.use('/', viewRouter)

export default app
