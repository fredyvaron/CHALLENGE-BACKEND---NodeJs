const { Router } = require('express');
const characterRouter = require('./personaje.js')
const PeliculasRouter = require('./peliculas')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router =  Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/characters',characterRouter )
router.use('/movies',PeliculasRouter)


module.exports = router;
