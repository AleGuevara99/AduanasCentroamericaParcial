const { response, request } = require('express');

const Proyect = require('../models/proyect');

const autor = "Yenny Alejandra Guevara Marroquin 25-2326-2017"


const proyectGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [ total, proyect ] = await Promise.all([
        Proyect.countDocuments(),
        Proyect.find()
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        proyect,
        autor
    });
}

const proyectPost = async(req, res = response) => {
    
    const {codigo, nombreproyecto, monto, pais } = req.body;
    const proyect = new Proyect({ codigo, nombreproyecto, monto, pais });

    // Guardar en BD
    await proyect.save();

    res.json({
        proyect,
        autor
    });
}

const proyectPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, codigo, nombreproyecto, monto, pais, fecha} = req.body;

    const proyect = await Proyect.findByIdAndUpdate( id, {codigo, nombreproyecto, monto, pais, fecha} );

    res.json(
        proyect,
        autor
    );
}

const proyectDelete = async(req, res = response) => {
    const { id } = req.params;
    const proyect = await Proyect.findByIdAndDelete( id );
    const data = {
        message: "Se elimino el registro",
        autor
    }
    
    res.json(
        data
    );
}


module.exports = {
    proyectGet,
    proyectPost,
    proyectPut,
    proyectDelete,
}