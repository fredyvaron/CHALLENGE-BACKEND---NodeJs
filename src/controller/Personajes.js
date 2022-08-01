const { Personaje, Peliculaoserie } = require("../db")
const { Op } = require("sequelize")
 

async function TodoslosPersonajes (req, res, next) {
    try {
        const personaje = await Personaje.findAll({attributes: ["nombre", "imagen"]})
        res.status(200).json({
            data: personaje
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Algo salio mal")
    }
}

async function nuevoPersonaje(req, res, next) {

    try {
        const { nombre, imagen, edad, peso, historia} = req.body;
        console.log(req.body)
        const personajeNuevo = await Personaje.create({nombre, imagen, edad, peso, historia})
        if(personajeNuevo){
            res.status(201).json({
                message: "Personaje Nuevo Creado",
                data: personajeNuevo
            })
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
async function busquedaPersonajes(req, res, next) {
    try {
        const { nombre } = req.query
        const { edad } = req.query
        const { pelicula } = req.query
        const { peso } = req.query
        if(nombre){
            const personaje = await Personaje.findAll({ where: { nombre: {[Op.iLike]: `%${nombre}%`} }})
            console.log(personaje, "personaje de busqueda")
            res.status(200).json({data: personaje})
        }
        else if(edad){
            const personaje = await Personaje.findAll({ where: { edad: edad}})
            console.log(personaje, "personaje de busqueda")
            res.status(200).json({data: personaje})
        }
        else if(peso){
            const personaje = await Personaje.findAll({ where: { peso: peso}})
            res.status(200).json({data: personaje})
        }else if(pelicula){
            
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Algo Salio mal con la busqueda"})
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
    obtenerdetalles,
    busquedaPersonajes
 } 