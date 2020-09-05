const jwt = require('jsonwebtoken');
const { raw } = require('body-parser');

/*=============================================
    Verificar Token
=============================================*/

const verificaToken = (req, res, next ) => {

    let token = req.get( 'token');

    jwt.verify( token, process.env.SEED, (err, decoded ) => {

        if( err ) return res.status(401).json({
            ok: false,
            err:{
                message: 'Token no válido'
            }
        });

        req.usuario =  decoded.usuario;
        next();
    });

};

/*=============================================
    Verificar Token para imagen
=============================================*/

const verificaTokenImg = (req, res, next ) => {

    let token = req.query.token;

    jwt.verify( token, process.env.SEED, (err, decoded ) => {

        if( err ) return res.status(401).json({
            ok: false,
            err:{
                message: 'Token no válido'
            }
        });

        req.usuario =  decoded.usuario;
        next();
    });

};

/*=============================================
    Verificar Admin Role
=============================================*/

const  verificaAdmin_Role = (req, res, next ) => {

    let usuario = req.usuario;

    if ( usuario.role != 'ADMIN_ROLE') return  res.status(401).json({
        ok: false,
        err:{
            message: 'El usuario no es administrador'
        }
    });

    next();

};


module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
};