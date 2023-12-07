const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const errors = require('../utils/errors')

module.exports.favoriteProduct = async (req, res) => {
    try {
        await prisma.favorite.create({
            data: {
                favoriteId: uuid.v4(),
                productId: req.body.productId,
                userId: req.body.userId
            }
        })

        res.status(200).send({ clientMessage: 'Produto favoritado' })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}