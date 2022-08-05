// require('dotenv').config();
const { User } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const Joi = require('joi')

async function login(req, res, next) {
  const { email, clave } = req.body;
  try {
    if (email) {
      if (clave) {
        const usuario = await User.findOne({ where: { email: email } });
        if (usuario) {
          const validaclave = await bcrypt.compare(clave, usuario.clave);
          if (validaclave) {
            console.log(process.env.TOKEN_SECRET);
            const token = jwt.sign(
              {
                user_id: usuario.id,
                email: usuario.email,
              },
              process.env.TOKEN_SECRET,
              { expiresIn: "10h" }
            );
            res.status(201).json({
              user: usuario,
              token: token,
            });
          } else {
            res.status(400).json({ error: "La contraseña no es valida" });
          }
        } else {
          res.status(400).json({ error: "usuario no encontrado" });
        }
      } else {
        res.status(400).json({ error: "Falto la clave" });
      }
    } else {
      res.status(400).json({ error: "Falto el email" });
    }
  } catch (error) {
    res.status(400).json({ error: "Algo salio mal" });
  }
}

const erroresregister = Joi.object({
  nombre: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  clave: Joi.string().min(6).max(1024).required(),
});
async function register(req, res, next) {
  //valida usuario si tiene errores
  const { error } = erroresregister.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const existeEmail = await User.findOne({
      where: { email: req.body.email },
    });
    if (existeEmail) {
      res.status(400).json({ error: "Email ya registrado" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.clave, salt);

      const user = new User({
        nombre: req.body.nombre,
        email: req.body.email,
        clave: password,
      });
      const saveduser = await user.save();
      enviaremail(req.body.email);
      const token = jwt.sign(
        {
          user_id: saveduser.id,
          email: saveduser.email,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "10h" }
      );
      saveduser.token = token;
      res.status(201).json({
        user: saveduser,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Algo salio mal" });
  }
}
function enviaremail(email) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: "fredyalberbaron@hotmail.com", // Change to your verified sender
    subject: "Bienvenido Al Mundo Disney",
    text: "Esperamos que disfrutes de la api del mundo disney",
    html: "<strong>Hola</strong><hr><hr/><h1>End points</h1>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email de bienvenida enviado");
    })
    .catch((error) => {
      console.error(error);
    });
}
module.exports = {
  login,
  register,
};
