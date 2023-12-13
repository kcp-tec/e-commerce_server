const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const errors = require('../utils/errors')
const cartController = require('./cartController')

module.exports.insertPurchase = async (req, res) => {
    try {
        await prisma.purchase.create({
            data: {
                purchaseId: uuid.v4(),
                cartId: req.body.cartId
            }
        })

        res.status(200).send({ clientMessage: 'Compra realizada com sucesso!' })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    } finally {
        await cartController.clearCart(req.body.cartId)
    }
}