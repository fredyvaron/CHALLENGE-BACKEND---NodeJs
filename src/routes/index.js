const { Router } = require('express');
const characterRouter = require('./personaje.js')
const PeliculasRouter = require('./peliculas')
const GeneroRouter = require('./genero')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router =  Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/characters',characterRouter )
router.use('/movies',PeliculasRouter)
router.use('/gender', GeneroRouter)


module.exports = router;
