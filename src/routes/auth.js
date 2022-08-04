const { Router} = require('express')
const router = Router();
const AuthController = require("../controller/Auth")

router.post('/login', AuthController.login),
router.post('/register', AuthController.register)

module.exports = router;