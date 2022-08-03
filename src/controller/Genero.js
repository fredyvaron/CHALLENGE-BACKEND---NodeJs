const { Genero } = require("../db");

async function ObtenerGenero(req, res, next) {
  try {
    const genero = await Genero.findAll();
    res.status(200).json({ data: genero });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "algo Salio Mal Obteniendo los generos" });
  }
}
async function CrearGenero(req, res, next) {
  try {
    const { nombre, imagen } = req.body;
    console.log(req.body);
    if (nombre || imagen) {
      const generoexiste = await Genero.findOne({ where: { nombre: nombre } });
      if (generoexiste) {
        res
          .status(400)
          .json({ msg: `Ya Existe un genero con el nombre${nombre}` });
      } else {
        const genero = await Genero.create({nombre, imagen});
        res.status(200).json({
          msg: "Genero Creado Exitosamente",
          data: genero,
        });
      }
    } else {
      res.status(400).json({ msg: "No pasastes todos los datos" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Algo salio mal creando el genero" });
  }
}

async function EliminarGenero(req, res, next) {
    try {
        const { id } = req.params;
        const generoexiste = await Genero.findOne({ id: id});
        if(generoexiste){
            const genero = Genero.destro({where: { id: id}});
            if(genero){
                res.status(201).json({ 
                    msg: "Se elimino El genero", 
                    data: genero
                })
            }
        }else{
            res.status(400).json({ msg: "No existe el genero a eliminar"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Algo salio mal eliminando el genero"})
    }
}

module.exports = {
  ObtenerGenero,
  CrearGenero,
  EliminarGenero
};
