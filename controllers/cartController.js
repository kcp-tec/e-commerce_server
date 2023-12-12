const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const errors = require('../utils/errors')

module.exports.listProductByUserId = async (req, res) => {
    try {
        const cartProducts = await prisma.cart.findMany({
            where: {
                userId: req.params.userId
            }
        })

        cartProducts
            ? res.status(200).send(cartProducts)
            : res.status(404).send({ clientMessage: 'Nenhum produto no carrinho' })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.insertProductToCart = async (req, res) => {
    try {
        let userCart = await findUserCart(req.body.userId)

        if (!userCart) {
            userCart = await createCart(req.body.userId)
        }

        const product = await prisma.product.findUnique({
            where: {
                productId: req.body.productId
            }
        })

        await prisma.cartProduct.create({
            data: {
                cartProductId: uuid.v4(),
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

module.exports.removeProductFromCart = async (req, res) => {
    try {
        const productCartAmount = await prisma.cartProduct.findUnique({
            select: { amount: true },
            where: {
                AND: [
                    { productId: req.body.productId },
                    { cartId: req.body.cartId }
                ]
            }
        })

        console.log(productCartAmount)
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.findCartByUser = async (req, res) => {
    try {
        const cartsFound = await prisma.cart.findUnique({
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
                AND: [
                    { userId: userId },
                    { cartStatus: 1 }
                ]
            }
        })

        return userCart || null
    } catch (e) {
        return e
    }
}

const createCart = async (userId) => {
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
                totalValue: {
                    increment: (product.amount * product.price)
                }
            }
        })
    } catch (e) {
        throw e
    }
}

module.exports.clearCart = async (cartId) => {
    try {
        await prisma.cart.update({
            where: {
                AND: [
                    { cartId: cartId },
                    { cartStatus: 1 }
                ]
            },
            data: {
                cartStatus: 0
            }
        })
    } catch (e) {
        throw e
    }
}

//     __
// ___( o)>
// \ <_. )
//  `---'   Kauan