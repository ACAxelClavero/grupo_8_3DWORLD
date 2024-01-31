

function guestMiddleware(req, res, next) {

    console.log('Middleware de autenticación ejecutado');

    if(req.session.user == undefined){
        console.log("Debes loguearte primero")
        res.redirect('login');
    }
    next();
    
}

module.exports = guestMiddleware;




