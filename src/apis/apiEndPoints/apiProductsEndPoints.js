const path = require('path');
const fs = require('fs');
const db = require('../../../database/models');


const apiProductsEndPoints = {

    async list (req, res){
        try {
            const products = await db.Product.findAll();

            const productsWithUrl = products.map(product => {
                return {
                    ...product.toJSON(),
                    urlProduct: "/api/products/" + product.id
                };
            });

            return res.status(200).json({
                total: products.length,
                status: 200,
                data: productsWithUrl
            });
        }finally{}
    },
    
    async detail (req, res) {
        try {
            const product = await db.Product.findByPk( req.params.id )
            return res.json ({
                name: product.name,
                urlProduct: "/api/products/" + req.params.id,
                status: 200,
                data: product
            })
        }finally{}
    }
}


module.exports = apiProductsEndPoints;