const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000

const bicicletasRouter = require('./src/routes/bicicletas')
const comprasRouter = require('./src/routes/compras')
const reviewsRouter = require('./src/routes/reviews')
const authRouter = require('./src/routes/auth')
// const sequelize = require('./src/config/db')
const { sequelize } = require('./src/models/associations')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/bootstrap/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(cookieParser())

const { currentUser } = require('./src/middlewares/auth')
app.use(currentUser)

app.use((req, res, next) => {
    res.locals.usuario = req.auth || null
    next()
})

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'src', 'views', 'partials')
}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'src', 'views'))

app.use('/bicicletas', bicicletasRouter)
app.use('/compras', comprasRouter)
app.use('/reviews', reviewsRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => res.redirect('/bicicletas'))


sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de datos ha sido sincronizada.')
        app.listen(PORT, () => {
            console.log(`Servidor inicializado en http://localhost:${PORT}`)
        })
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos: ', err)
    })