const path = require('path');
const fs = require('fs');
const db = require('../../../database/models');


const apiUsersEndPoints = {
    async list (req, res){
        try {
            const users = await db.User.findAll( {
                attributes: { exclude: ['password'] } });

            const usersWithUrl = users.map(user => {
                return {
                    ...user.toJSON(),
                    urlUser: "/api/users/" + user.id
                };
            });

            return res.status(200).json({
                total: users.length,
                url: "/api/users",
                status: 200,
                data: usersWithUrl
            });
        }finally{}
    },
    
    async detail (req, res) {
        try {
            const user = await db.User.findByPk( req.params.id, {
                attributes: { exclude: ['password'] } })

            return res.status(200).json({
                name: user.name + " " + user.lastname,
                urlUser: "/api/users/" + req.params.id,
                status: 200,
                data: user
            })
        }finally{}
    }
}

module.exports = apiUsersEndPoints;