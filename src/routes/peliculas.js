const { Router } = require("express");
const router = Router();
const PeliculasController = require("../controller/PelicuasoSeries")
router.get('/', PeliculasController.ObtenerPelicuas)
router.post('/', PeliculasController.AgregarPelicula)
router.put('/:id', PeliculasController.ActualizarPelicula)
router.delete('/:id', PeliculasController.EliminarPelicula)
router.get('/:id', PeliculasController.ObtenerDetallePelicula)

module.exports = router;