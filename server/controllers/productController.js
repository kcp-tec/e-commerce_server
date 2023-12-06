const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const checkers = require('../utils/checkers')

module.exports.insertProduct = async (req, res) => {
    const productData = {
        productId: uuid.v4(),
        name: req.body.name,
        category: req.body.category,
        description: req.body.description || null,
        price: req.body.price,
        picture: req.body.picture || null
    }

    const newProduct = await prisma.product.create({
        data: {
            productId: uuid.v4(),
            name: productData.name,
            category: productData.category,
            description: productData.description,
            price: productData.price,
            picture: productData.picture
        }
    })

    res.status(200).send({ clientMessage: `Produto ${newProduct.name} cadastrado` })
}