const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult, Result } = require('express-validator');
const {User} = require('../../database/models');
const { where } = require('sequelize');
const session = require("express-session");
const db = require('../../database/models');



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
         res.redirect('/user/login');
        } catch (error) {
            console.error('Error creating user:', error);
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


    profile (req, res) {
        res.render('profile');
    }, 

    edit (req, res) {
        res.render('editUser')
    },

    async update(req, res) {
        try {
            if (!req.session.user) {
                res.redirec('login');
            }
            console.log('Datos recibidos en la solicitud:', req.body);
            console.log('Usuario antes de la actualización:', req.session.user);

            await db.User.update({
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            },
            {
                where: {id: req.session.user.id}
            })

            const user = await db.User.findByPk(req.session.user.id);
    
            req.session.user = user
            console.log('Usuario después de la actualización:', req.session.user);
            res.redirect('/user/profile');
            
            
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    
    async delete (req, res){
        try {
            await db.User.destroy({ where: { id : req.session.user.id } });
            req.session.user = undefined;
            res.clearCookie('usuario');
            return res.redirect('/');
        }finally{}
    }, 
    
    // Inicio de sesion
    login(req, res){
        res.render('login')
    },
    
    loginProcess: async (req, res) => {
        const errors = validationResult(req);
        
        if (!req.body.email) {
            errors.errors.push({ param: 'email_empty', msg: 'El campo de email es obligatorio' });
        }
        if (!req.body.password) {
            errors.errors.push({ param: 'password_empty', msg: 'El campo de contraseña es obligatorio' });
        }

        try {
        if(errors.isEmpty()){
            const user = await User.findByEmail(req.body.email);
                function isValidEmail(email) {
                    let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
                    return validEmail.test(email);

                }
            if (!user) {
                console.log('User not found for email:', req.body.email);

                return res.render('login', {
                    errors: [{ msg: "El correo electrónico no está registrado" }]
                });
            }
            if (!isValidEmail(req.body.email)) {
                console.log('Invalid email format:', req.body.email);

                return res.render('login', {
                    errors: [{ msg: "Formato de correo electrónico inválido" }]
                });
            }   if (req.body.password.length < 6) {
                console.log('Password too short:', req.body.password);

                return res.render('login', {
                    errors: [{ msg: "La contraseña es demasiado corta" }]
                });
            }
            console.log('Comparing passwords...');
            console.log('User input password:', req.body.password);
            console.log('Stored hashed password:', user.password);
            
            console.log('Usuario recuperado de la base de datos:', user);
            const passwordMatch = bcrypt.compare(req.body.password, user.password);               
                    if (passwordMatch) {
                        req.session.user = user;

                if (req.body.rememberme !== undefined) {
                    res.cookie('rememberme', user.email, { maxAge:60 * 1000 }); // cookie de 60 segundos
                }

                return res.redirect('/');

            } else {
                console.log('Passwords do not match!');

                return res.render('login', {
                    errors: [{ msg: "Credenciales inválidas" }]
                });
            } 
        } else {
            console.log('Validation errors:', errors.array());

            return res.render('login', { errors: errors.array() });
        }  
     } catch (error) {
            
            console.error('Error during login process:', error);
            return res.status(500).send('Internal Server Error');
        }
    },


    // Cerrar sesion
    logout (req, res) {
        req.session.user = undefined;
        res.clearCookie('rememberme')
        return res.redirect('/');
    },
};

module.exports = controller;