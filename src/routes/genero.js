const { Router } = require('express')
const router = Router();
const GeneroController = require('../controller/Genero')
const  verifyToken  = require('../middlewares/auth')
router.get('/', verifyToken ,GeneroController.ObtenerGenero)
router.post('/', verifyToken ,GeneroController.CrearGenero)
router.delete('/:id', verifyToken ,GeneroController.EliminarGenero)

module.exports = router;