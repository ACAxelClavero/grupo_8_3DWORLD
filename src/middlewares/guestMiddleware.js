function guestMiddleware(req, res, next) {
    if(req.session.userLogged == undefined){
        next();
    }
}

module.exports = guestMiddleware;




