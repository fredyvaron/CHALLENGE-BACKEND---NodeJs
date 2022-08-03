const { request } = require("express");
const { Peliculaoserie, Personaje } = require("../db");

async function ObtenerPelicuas(req, res, next) {
  try {
    const { nombre, genero, orden } = req.query;
    if (!nombre && !genero && !orden) {
      const pelicula = await Peliculaoserie.findAll({
        attributes: ["imagen", "titulo"],
      });
      res.status(200).json({ data: pelicula });
    } else if (nombre) {
      const peliculanombre = await Peliculaoserie.findAll({
        where: { titulo: nombre },
      });
      if (peliculanombre) {
        res.status(200).json({ data: peliculanombre });
      } else {
        res
          .status(400)
          .json({ msg: `No hay peliculas por el titulo ${nombre}` });
      }
    } else if (genero) {
      const generopelicula = await Peliculaoserie.findAll({
        where: { generoId: genero },
      });
      if (generopelicula) {
        res.status(200).json({ data: generopelicula });
      } else {
        res
          .status(400)
          .json({
            msg: `No hay genero de contingenciar a la persona de contingenciar`,
          });
      }
    } else if (orden.toLowerCase()=== "asc") {
      let ordenpelicula = await Peliculaoserie.findAll();
      if (ordenpelicula) {
        ordenpelicula.sort((a, b)=>  new Date(a.creacion) - new Date(b.creacion))
        console.log(ordenpelicula);
        res.status(200).json({ data: ordenpelicula });
      }
    }
    else if(orden.toLowerCase() === "desc"){
      let ordenpelicula = await Peliculaoserie.findAll();
      if (ordenpelicula) {
        ordenpelicula.sort((a, b)=>  new Date(b.creacion) - new Date(a.creacion))
        console.log(ordenpelicula);
        res.status(200).json({ data: ordenpelicula });
      }
    }else{
      res.status(400).json({ msg: "El tipo de orden debe ASC o DESC" });

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Algo salio mal obteniendo las peliculas" });
  }
}

async function AgregarPelicula(req, res, next) {
  try {
    const { imagen, titulo, calificacion, creacion, genero, personaje } =
      req.body;
    if ((imagen || titulo || calificacion, creacion, genero, personaje)) {
      const peliculaexiste = await Peliculaoserie.findOne({
        where: { titulo: titulo },
      });
      if (!peliculaexiste) {
        const pelicula = await Peliculaoserie.create({
          imagen,
          titulo,
          calificacion,
          creacion,
          generoId: genero,
        });
        personaje.forEach(async (per) => {
          const personajepelicula = await Personaje.findOne({
            where: {
              id: per,
            },
          });
          await pelicula.addPersonajes(personajepelicula);
        });
        console.log(pelicula);

        if (pelicula) {
          res.status(200).json({
            msg: "Pelicua creada exitosamente",
            data: pelicula,
          });
        }
      } else {
        res.status(400).json({ msg: "ya existe una pelicula con ese nombre" });
      }
    } else {
      console.log("no pasastes todos los datos");
      res.status(400).json({ msg: "No Pasastes todo los datos" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Algo Salio mal agregando las peliculas" });
  }
}

async function ActualizarPelicula(req, res, next) {
  try {
    const { id } = req.params;
    const { imagen, titulo, calificacion, creacion } = req.body;
    let pelicula = Peliculaoserie.findByPk(id);
    if (!pelicula)
      res.status(400).json({ msg: "Id de pelicula no encontrado" });
    const update = {
      imagen: imagen || pelicula.imagen,
      titulo: titulo || pelicula.titulo,
      calificacion: calificacion || pelicula.calificacion,
      creacion: creacion || pelicula.creacion,
    };
    await Peliculaoserie.update(update, { where: { id: id } });
    pelicula = await Peliculaoserie.findByPk(id);
    res
      .status(201)
      .json({ msg: "la poelicula se actualizo exitosamente", data: pelicula });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Algo Salio mal actualizando la pelicula" });
  }
}
async function EliminarPelicula(req, res, next) {
  try {
    const { id } = req.params;
    let pelicula = await Peliculaoserie.findByPk(id);
    if (!pelicula) res.status(400).json({ msg: "Id de la pelicula no existe" });
    const eliminar = await Peliculaoserie.destroy({ where: { id: id } });
    if (eliminar)
      res.status(200).json({
        msg: "Se elimina la pelicula",
        data: pelicula,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Algo Salio mal eliminando la pelicula" });
  }
}
async function ObtenerDetallePelicula(req, res, next) {
  try {
    const { id } = req.params;
    const peliculaexiste = await Peliculaoserie.findByPk(id, {
      include: { all: true },
      attributes: { exclude: ["generoId", "createdAt"] },
    });
    console.log(peliculaexiste);
    if (peliculaexiste) {
      res.status(200).json({ data: peliculaexiste });
    } else {
      res.status(400).json({ msg: "No existe una pelicula con ese id" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Algo salio mal obteniendo los detalles de la pelicula" });
  }
}
module.exports = {
  ObtenerPelicuas,
  AgregarPelicula,
  ActualizarPelicula,
  EliminarPelicula,
  ObtenerDetallePelicula,
};
