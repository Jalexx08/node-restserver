

/*=============================================
    Puerto
=============================================*/

port = process.env.PORT || 3000;

/*=============================================
    Entorno
=============================================*/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*=============================================
    Vencimiento Token
=============================================*/
process.env.CADUCIDAD_TOKEN = '48h';

/*=============================================
    SEED de autenticación
=============================================*/

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

/*=============================================
    Base de datos
=============================================*/

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

/*=============================================
    Google clientID
=============================================*/

process.env.CLIENT_ID = process.env.CLIENT_ID || '1030376005945-jejv599e1dk9mt78853pjucl2taq91fq.apps.googleusercontent.com';