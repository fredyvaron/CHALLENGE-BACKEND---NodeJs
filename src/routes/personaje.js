const { Router } = require("express")
const router = Router();
const personajeController = require("../controller/Personajes");
const  verifyToken  = require('../middlewares/auth')
router.get("/", verifyToken ,personajeController.TodoslosPersonajes);
router.post("/", verifyToken ,personajeController.nuevoPersonaje);
router.put("/:id", verifyToken  ,personajeController.actualizarPersonaje);
router.delete("/:id", verifyToken ,personajeController.eliminarPersonaje);
router.get("/:id", verifyToken ,personajeController.obtenerdetalles)

module.exports = router;
