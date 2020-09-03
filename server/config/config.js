

/*=============================================
    Puerto
=============================================*/

port =  process.env.PORT || 3000;

/*=============================================
    Entorno
=============================================*/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/*=============================================
    Base de datos
=============================================*/

let urlDB;

if( process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
}else {
    urlDB = 'mongodb+srv://crawsk08:5Ifm7G0L5fRD0H3M@cluster0.jqchj.mongodb.net/cafe';
}

process.env.URLDB = urlDB;