import express from 'express'
import path from 'path'
import exphbs from 'express-handlebars'

const app = express()
app.use(express.static(path.join(__dirname, 'public')))

app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
  })
)
app.set('view engine', 'hbs')

app.get('/', function (req, res) {
  res.render('home')
})

export default app
