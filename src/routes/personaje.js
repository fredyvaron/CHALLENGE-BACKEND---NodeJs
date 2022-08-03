const { Router } = require("express")
const router = Router();
const personajeController = require("../controller/Personajes");

router.get("/", personajeController.TodoslosPersonajes);
router.post("/", personajeController.nuevoPersonaje);
router.put("/:id", personajeController.actualizarPersonaje);
router.delete("/:id", personajeController.eliminarPersonaje);
router.get("/:id", personajeController.obtenerdetalles)

module.exports = router;
