const fs = require('fs');
const path = require('path');

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
        const user = {
            id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
            ...req.body
        };

        users.push(user);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4));
        return res.redirect('/');
    },

    profile(req, res){
        res.render('/users/profile')
    }
}


module.exports = controller;