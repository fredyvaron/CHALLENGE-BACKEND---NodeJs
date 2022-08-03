const { Router } = require('express')
const router = Router();
const GeneroController = require('../controller/Genero')

router.get('/', GeneroController.ObtenerGenero)
router.post('/', GeneroController.CrearGenero)
router.delete('/', GeneroController.EliminarGenero)

module.exports = router;