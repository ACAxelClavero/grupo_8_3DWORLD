const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

function getUsers() {
	const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
	return users;
}

const controller = {
    login(req, res){
        res.render('login');
    },
    
    register(req, res){
        res.render('register');
    },

}


module.exports = controller;