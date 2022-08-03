const { Personaje, Peliculaoserie } = require("../db")
const { Op, where } = require("sequelize")
 

async function TodoslosPersonajes (req, res, next) {
    try {
        const { name } = req.query
        const { age } = req.query
        const { movie } = req.query
        const { weight } = req.query
        
        if(!name && !weight && !age && !movie)  {
            const personaje = await Personaje.findAll({attributes: ["nombre", "imagen"]})
            if(personaje){
                res.status(200).json({
                    data: personaje
                })
            }else{
                res.status(400).json({msg: "no existen personajes en la base de datos"})
            }
        } 
        else if(name){
            console.log("nombre", name)
            const personaje = await Personaje.findAll({ where: { nombre: {[Op.iLike]: `%${name}%`} }})
            console.log(personaje, "personaje de busqueda")
            if(personaje){
                res.status(200).json({data: personaje})
            }else{
                res.status(400).json({msg: "no existen personajes con ese nombre"})

            }   
        }
        else if(age){
            const personaje = await Personaje.findAll({ where: { edad: age}})
            console.log(personaje, "personaje de busqueda")
            if(personaje){
                res.status(200).json({data: personaje})
            }else{
                res.status(400).json({msg: "no existen personajes con esa edad"})
            }
        }
        else if(weight){
            const personaje = await Personaje.findAll({ where: { peso: weight}})
            if(personaje){
                res.status(200).json({data: personaje})
            }else{
                res.status(400).json({msg: "no existen personajes con ese peso"})
            }
           
        }else if(movie){
            console.log(movie, "pelicula  a buscar")
            const peliculas = await Personaje.findAll({include: [{ model: Peliculaoserie, where: { id: movie}}] })
            console.log(movie, "pelicula de busqueda")
            if(peliculas){
                res.status(200).json({data: peliculas})
            }else{
                res.status(400).json({msg: "no existe la pelicula buscada"})

            }

        }

    } catch (error) {
        console.log(error)
        res.status(500).send("Algo salio mal")
    }
}

async function nuevoPersonaje(req, res, next) {

    try {
        const { nombre, imagen, edad, peso, historia} = req.body;
        const personajeexiste = await Personaje.findOne({where: { nombre: nombre}})
        console.log(personajeexiste)
        if(!personajeexiste){
            const personajeNuevo = await Personaje.create({nombre, imagen, edad, peso, historia})
            if(personajeNuevo){
                res.status(201).json({
                    message: "Personaje Nuevo Creado",
                    data: personajeNuevo
                })
            }
        }else{
            res.status(400).json({msg: "Ya Existe un personaje con este nombre"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Algo Salio mal"})
    }
}
async function obtenerdetalles(req, res, next) {
    try {
        const {id} = req.params
        if(id){
            const personaje = await Personaje.findByPk(id,{include: Peliculaoserie})
            if(personaje){
            console.log(id)
            res.status(200).json({data: personaje})
            }else{
                res.status(500).json({msg: "No existe ese id"})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Algo Salio mal Obteniendo los detalles"});

        
    }
}

async function actualizarPersonaje(req, res, next) {
    try {
   
        const { id } = req.params;
        console.log(id, "id del personaje")
        const { imagen, edad, peso, historia} = req.body;
        console.log(req.body, "body")
        let persona = Personaje.findByPk(id)
        if(!persona) res.status(500).json({message: "id no encontrado"})
        const update = {
            "imagen": imagen || persona.imagen,
            "edad": edad || persona.edad, 
            "peso": peso || persona.peso, 
            "historia": historia || persona.historia,
        }
            await Personaje.update(update, {where: {id}})
            persona = await Personaje.findByPk(id)
            res.status(201).json({
                message: "Se Actualizo Correctamente El Personaje",
                data: persona
            })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Ocurrio algun problema"})
    }
}
async function eliminarPersonaje(req, res, next){
    const { id  } = req.params
    console.log(id)
    
    try {

        const destroypersonaje = await Personaje.destroy({where: {id: id}})
        if(destroypersonaje){
            res.status(200).json({msg: "Personaje Eliminado"})
        }else{
            res.status(500).json({msg: "No se encontro ese id"})
        }
    } catch (error) {
       console.log(error) 
       res.status(500).json({
        msg: "algo Salio mal"
       })
    }

}

 module.exports ={
    TodoslosPersonajes,
    nuevoPersonaje,
    eliminarPersonaje,
    actualizarPersonaje,
    obtenerdetalles
 } 