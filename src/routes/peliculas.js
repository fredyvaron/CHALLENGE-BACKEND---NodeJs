const { Router } = require("express");
const router = Router();
const PeliculasController = require("../controller/PelicuasoSeries")
const  verifyToken  = require('../middlewares/auth')
router.get('/', verifyToken ,PeliculasController.ObtenerPelicuas)
router.post('/', verifyToken ,PeliculasController.AgregarPelicula)
router.put('/:id', verifyToken ,PeliculasController.ActualizarPelicula)
router.delete('/:id', verifyToken ,PeliculasController.EliminarPelicula)
router.get('/:id',  verifyToken,PeliculasController.ObtenerDetallePelicula)

module.exports = router;