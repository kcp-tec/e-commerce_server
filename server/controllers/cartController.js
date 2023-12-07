const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const checkers = require('../utils/checkers')
const errors = require('../utils/errors')

module.exports.insertProductToCart = async (req, res) => {
    let userCart = await findUserCart(req.params.userId)

    if (!userCart) {
        userCart = await createCart(req.params.userId, req.params.productId, req.params.amount)
    }

    const product = await prisma.product.findUnique({
        where: {
            productId: req.params.productId
        }
    })

    try {
        await prisma.productCart.create({
            data: {
                amount: req.body.amount,
                productId: req.body.productId,
                cartId: userCart.cartId
            }
        })

        await attCartTotalValue(userCart.cartId, { price: product.price, amount: req.body.amount })

        res.status(200).send({ clientMessage: 'Produto adicionado ao carrinho' })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.findCartByUser = async (req, res) => {
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

const findUserCart = async userId => {
    try {
        const userCart = await prisma.cart.findUnique({
            where: {
                userId: userId
            }
        })

        return userCart || null
    } catch (e) {
        return e
    }
}

const createCart = async (userId, productId, amount) => {
    try {
        const newCart = await prisma.cart.create({
            data: {
                cartId: uuid.v4(),
                userId: userId
            }
        })

        return newCart
    } catch (e) {
        return e
    }
}

const attCartTotalValue = async (cartId, product) => {
    try {
        await prisma.cart.update({
            where: {
                cartId: cartId
            },
            data: {
                totalValue: (product.amount * product.price)
            }
        })
    } catch (e) {
        throw e
    }
}