

function authMiddleware(req, res, next) {
    
    console.log('Middleware de autenticación ejecutado');

    if(req.session.user !== undefined){
        console.log("Ya estas logueado")
        res.redirect ('/')
    }
    next();
}
module.exports = authMiddleware;