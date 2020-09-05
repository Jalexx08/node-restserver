const express = require('express');
const app = express();

const { verificaToken } = require('../middlewares/autenticacion');

const Producto = require('../models/producto');
const producto = require('../models/producto');

/*=============================================
    Mostrar todas las productos
=============================================*/
app.get('/productos', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) return res.status(500).json({
                ok: false,
                err
            });

            res.json({
                ok: true,
                productos,

            });
        });

});

/*=============================================
    Mostrar una producto por Id
=============================================*/
app.get('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {

            if (err) return res.status(500).json({
                ok: false,
                err
            });

            if (!productoDB) return res.status(400).json({
                ok: false,
                err: {
                    message: 'El Id no es correcto'
                }
            });

            res.json({
                ok: true,
                producto: productoDB
            });

        });

});

/*=============================================
    Buscar Productos
=============================================*/
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex =  new RegExp( termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) return res.status(500).json({
                ok: false,
                err
            });

            res.json({
                ok: true,
                productos
            });


        });
});

/*=============================================
    crear nueva producto
=============================================*/
app.post('/productos', verificaToken, (req, res) => {

    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id

    });


    producto.save((err, productoDB) => {

        if (err) return res.status(500).json({
            ok: false,
            err
        });

        // if (!productoDB) return res.status(400).json({
        //     ok: false,
        //     err
        // });

        res.json({
            ok: true,
            producto: productoDB
        });

    });

});
/*=============================================
    Actualizar producto
=============================================*/
app.put('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    // let desCategoria = {
    //     descripcion: body.descripcion
    // };

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) return res.status(500).json({
            ok: false,
            err
        });

        if (!productoDB) return res.status(400).json({
            ok: false,
            err
        });

        res.json({
            ok: true,
            producto: productoDB
        });

    });

});
/*=============================================
    Borrar producto
=============================================*/
app.delete('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let disponibilidad = {
        disponible: false
    };

    Producto.findByIdAndUpdate(id, disponibilidad, { new: true }, (err, productoBorrado) => {

        if (err) return res.status(400).json({
            ok: false,
            err
        });

        if (!productoBorrado) return res.status(400).json({
            ok: false,
            err: {
                message: 'producto no disponible'
            }
        });

        res.json({
            ok: true,
            producto: productoBorrado
        });
    });

});



module.exports = app;