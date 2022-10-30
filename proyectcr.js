const { response, request } = require('express');

const Proyectcr = require('../models/proyectcr');

const autor = "Yenny Alejandra Guevara Marroquin 25-2326-2017"


const proyectcrGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [ total, proyectcr ] = await Promise.all([
        Proyectcr.countDocuments(),
        Proyectcr.find()
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        proyectcr,
        autor
    });
}

const proyectcrPost = async(req, res = response) => {
    
    const {codigo, nombreproyecto,  pais, fechacierre } = req.body;
    const proyectcr = new Proyectcr({ codigo, nombreproyecto, pais, fechacierre });

    // Guardar en BD
    await proyectcr.save();

    res.json({
        proyectcr,
        autor
    });
}

const proyectcrPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, codigo, nombreproyecto,  pais, fechacierre} = req.body;

    const proyectcr = await Proyectcr.findByIdAndUpdate( id, {codigo, nombreproyecto, pais, fechacierre} );

    res.json(
        proyectcr,
        autor
    );
}

const proyectcrDelete = async(req, res = response) => {
    const { id } = req.params;
    const proyectcr = await Proyectcr.findByIdAndDelete( id );
    const data = {
        message: "Se elimino el registro",
        autor
    }
    
    res.json(
        data
    );
}


module.exports = {
    proyectcrGet,
    proyectcrPost,
    proyectcrPut,
    proyectcrDelete,
}