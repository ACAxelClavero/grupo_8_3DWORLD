
const fs = require('fs');
const path = require('path');
const db = require('../../database/models')

function logMiddleware(req, res, next) {

    if (req.cookies.remember != undefined && req.session.userLoggin == undefined) {
        db.User.findOne({
            where: {
                email: req.cookies.remember
            }
        })
        .then(function(userInDB) {
            if (userInDB) {
                req.session.userLogged = userInDB;
                res.locals.userLogged = req.session.userLogged;
            }
            next();
        })
        .catch(error => {
            console.error('Error retrieving user from database:', error.message);
            next();
        });
    } else {
        next();
    }
}

module.exports = logMiddleware;


