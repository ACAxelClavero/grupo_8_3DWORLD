function authMiddleware(req, res, next) {
    console.log('Middleware de autenticación ejecutado');

    if(req.session.userLogged != undefined){
        next();
    } else {

            res.redirect ('/user/login');

    }
}
module.exports = authMiddleware;