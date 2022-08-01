const { Router } = require("express");
const router = Router();
const PeliculasController = require("../controller/PelicuasoSeries")
router.get('/', PeliculasController.ObtenerPelicuas)
router.post('/', PeliculasController.AgregarPelicula)
router.put('/:id', PeliculasController.ActualizarPelicula)

module.exports = router;