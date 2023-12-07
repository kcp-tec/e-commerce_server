const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const checkers = require('../utils/checkers')
const errors = require('../utils/errors')

module.exports.insertCart = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                productId: req.body.productId
            }
        })

        await prisma.cart.create({
            data: {
                cartId: uuid.v4(),
                amount: req.body.amount,
                productId: req.body.productId,
                userId: req.body.userId,
                totalValue: (product.price * req.body.amount)
            }
        })

        res.status(200).send({ clientMessage: 'Carrinho cadastrado' })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.findCartsByUser = async (req, res) => {
    try {
        const cartsFound = await prisma.cart.findMany({
            where: {
                userId: req.params.userId
            }
        })

        cartsFound
            ? res.status(200).send(cartsFound)
            : res.status(404).send({ clientMessage: 'Sem carrinhos encontrados' })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}