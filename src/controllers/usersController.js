const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const {User} = require('../../database/models');




const controller = {
   // Registrarse

    register(req, res){
        res.render('register');
    },

    newUser: async (req, res) => {
          try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('register', {
                locals: {

                errors: errors.mapped(),
                oldData: req.body
                }
            });
        }

        const user =  await User.create({
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                roles_id: 2,
        });
        return res.redirect('./login');
        } catch (error) {
            console.error('Error creating user:', error.message);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.render('register', {
                  errors: {
                    email: { msg: 'El correo electrónico ya está registrado' },
                  },
                  oldData: req.body,
        })
    }
    return res.status(500).send('Internal Server Error');
}
},


    profile: async (req, res) => {
        try {
            const user = await User.findByEmail(req.params.email);
        if(!user){
            return res.render('error', {
                message: 'El usuario no existe',
                error: {
                    status: 404
        },
                path: req.url
            });
    }
        res.render('/users/profile', { user });
    } catch (error) {
        console.error('Error fetching user:', error.message);
            return res.status(500).send('Internal Server Error');
     } },  

    edit(req, res){
    },

    update(req, res){
    },

    delete(req, res){
    }, 
    
    // Inicio de sesion
    login(req, res){
        res.render('login');
    },
    
    loginProcess: async (req, res) => {
        const errors = validationResult(req);
        
        try {
        if(errors.isEmpty()){
            const user = await User.findByEmail(req.body.email);
                function isValidEmail(email) {
                    let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
                    return validEmail.test(email);

                }
            if (!user) {
                return res.render('login', {
                    errors: [{ msg: "El correo electrónico no está registrado" }]
                });
            }
            if (!isValidEmail(req.body.email)) {
                return res.render('login', {
                    errors: [{ msg: "Formato de correo electrónico inválido" }]
                });
            }   if (req.body.contrasena.length < 6) {
                return res.render('login', {
                    errors: [{ msg: "La contraseña es demasiado corta" }]
                });
            }
            if (user && bcrypt.compareSync(req.body.contrasena, user.password)) {
                req.session.userLogged = user;

                if (req.body.recordarUsuario !== undefined) {
                    res.cookie('usuario', req.session.userLogged.name);
                }

                return res.redirect('/');

            } else {
                return res.render('login', {
                    errors: [{ msg: "Credenciales inválidas" }]
                });
            }
        } else {
            return res.render('login', { errors: errors.array() });
        }   } catch (error) {
            console.error('Error during login process:', error.message);
            return res.status(500).send('Internal Server Error');
        }
    },


    // Cerrar sesion
    logout: (req, res) => {
        req.session.userLogged = undefined;
        res.clearCookie('usuario');
        return res.redirect('/');
    },
};

module.exports = controller;