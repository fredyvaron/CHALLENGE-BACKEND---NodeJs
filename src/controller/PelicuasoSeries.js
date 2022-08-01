const { Peliculaoserie } = require("../db");

async function ObtenerPelicuas(req, res, next) {
  try {
    const pelicula = await Peliculaoserie.findAll({
      attributes: ["imagen", "titulo"],
    });
    res.status(200).json({ data: pelicula });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Algo salio mal obteniendo las peliculas" });
  }
}

async function AgregarPelicula(req, res, next) {
  try {
    const { imagen, titulo, calificacion, creacion } = req.body;
    if (imagen || titulo || calificacion, creacion ) {
      
      const pelicula = await Peliculaoserie.create({ imagen, titulo, calificacion, creacion });
      console.log(pelicula)
      if (pelicula) {
        res.status(200).json({ 
            msg: "Pelicua creada exitosamente",
            data: pelicula 
        });
      }
    }else{
        console.log("no pasastes todos los datos")
        res.status(500).json({ msg: "No Pasastes todo los datos"})
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
        let pelicula = Peliculaoserie.findByPk(id)
        if(!pelicula) res.status(500).json({msg: "Id de pelicula no encontrado"})
        const update = {
            "imagen": imagen || pelicula.imagen,
            "titulo": titulo || pelicula.titulo,
            "calificacion": calificacion || pelicula.calificacion,
            "creacion": creacion || pelicula.creacion
        }
        await Peliculaoserie.update(update, { where: {id: id}})
        pelicula = await Peliculaoserie.findByPk(id)
        res.status(201).json({msg: "la poelicula se actualizo exitosamente", data: pelicula}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Algo Salio mal actualizando la pelicula"})

    }
    
}

module.exports = {
  ObtenerPelicuas,
  AgregarPelicula,
  ActualizarPelicula
};
