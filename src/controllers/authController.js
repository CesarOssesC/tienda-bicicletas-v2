const { Usuario } = require('../models/associations')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.registerForm = async (req, res, next) => {
    try {
        res.render('auth/register')
    } catch (error) {
        next(error)
    }
}

exports.registerUser = async (req, res, next) => {
    try {
        const { nombre, email, password } = req.body

        if(!nombre || !email || !password) {
            res.render('auth/register', {
                error: 'Todos los campos son obligatorios',
                nombre, 
                email
            })
        }

        const existeCorreo = await Usuario.findOne({ where: { email } })
        if(existeCorreo) {
            return res.render('auth/register', {
                error: 'Este correo ya está registrado',
                nombre,
                email
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const usuario = Usuario.create({
            nombre,
            email,
            password: hashedPassword,
            rol: 'cliente'
        })

        const msg = encodeURIComponent('Te has registrado exitosamente, ahora inicia tu sesión.')

        res.redirect(`auth/login?success=${msg}`)
    } catch (error) {
        next(error)
    }
}

exports.loginForm = async (req, res, next) => {
    try {
        res.render('auth/login')
    } catch (error) {
        next(error)
    }
}

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const usuario = await Usuario.findOne({ where: { email } })

        if(!usuario) {
            res.render('auth/login', { error: 'Email o contraseña incorrectos' })
        }

        const checkPassword = await bcrypt.compare(password, usuario.password)

        if(!checkPassword) {
            res.render('auth/login', { error: 'Email o contraseña incorrectos' })
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '2hr' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, //cuando pasemos a produccion esto deberia cambiarse a true para poder usar HTTPS
            sameSite: 'lax',
            maxAge: 2 * 60 * 60 * 1000
        })

        const msg = encodeURIComponent(`Bienvenido ${usuario.nombre}!`)

        res.redirect(`/bicicletas?success=${msg}`)
    } catch (error) {
        next(error)
    }
}

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('token')
        const msg = encodeURIComponent(`Sesión Cerrada`)
    
        res.redirect(`auth/login?success=${msg}`)
        
    } catch (error) {
        next(error)
    }
}