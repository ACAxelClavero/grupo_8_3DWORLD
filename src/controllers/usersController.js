const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');

function getUsers() {
	const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
	return users;
}

const controller = {
    // Inicio de sesion
    login(req, res){
        res.render('login');
    },
    
    // Registrarse
    register(req, res){
        res.render('register');
    },


    newUser(req, res){
        const users = getUsers();

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('register', {
                errors: errors.mapped(),
                oldData: req.body
            });
        }

        const user = {
            id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
            ...req.body,
            imgPerfil : req.file?.filename,
            password: bcrypt.hashSync(req.body.password, 10),
        };

        users.push(user);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4));
        return res.redirect('/');
    },

    profile(req, res){
        const users = getUsers();
        const user = users.find(element => element.id === req.params.id);
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
    },

    edit(req, res){
        const users = getUsers();
        const user = users.find(element => element.id === req.params.id)
        return res.render('users/editUser', { userToEdit: user });
    },

    update(req, res){
        const users = getUsers();
        const userIndex = users.findIndex(element => element.id == req.params.id);
        const imgPerfil = req.file?.filename || users[userIndex].imgPerfil;
        users[userIndex] = {
            ...users[userIndex],   
            imgPerfil,
            ...req.body
        };
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        res.redirect('/user')
    },

    delete(req, res){
        const users = getUsers();
        const userIndex = users.findIndex(element => element.id == req.params.id);
        users.splice(userIndex, 1);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        res.redirect('/user');
    },

    loginProcess(req, res){
        return res.render(req.body);
    }
}
START

module.exports = controller;