function guestMiddleware(req, res, next) {
    if(req.session.userLogged == undefined){
        next();
    }else {
        res.render('/');
    }
}

module.exports = guestMiddleware;




