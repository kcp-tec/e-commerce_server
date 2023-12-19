const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const errors = require('../utils/errors')
const cartController = require('./cartController')
const mp = require('./mercadoPagoController')

module.exports.insertPurchase = async (req, res) => {
    try {
        const userId = await prisma.cart.findUnique({
            where: {
                cartId: req.body.cartId
            },
            select: {
                userId: true
            }
        })

        const payer = await generatePayerJson(userId.userId)
        console.log(payer);
        // mp.createPreference({
        //     products: await generateItemsJson(req.body.cartId)
        // })

        res.status(200).send({ clientMessage: 'Compra realizada com sucesso!' })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    } finally {
        // await prisma.purchase.create({
        //     data: {
        //         purchaseId: uuid.v4(),
        //         cartId: req.body.cartId
        //     }
        // })

        // await cartController.clearCart(req.body.cartId)
    }
}

const generateItemsJson = async cartId => {
    const products = await prisma.cartProduct.findMany({
        select: {
            amount: true,
            Product: {
                select: {
                    name: true,
                    description: true,
                    category: true,
                    price: true
                }
            }
        },
        where: {
            cartId
        }
    })

    let items = []
    products.forEach(cartProduct => {
        items.push({
            title: cartProduct.Product.name,
            currency_id: 'BRL',
            description: cartProduct.Product.description,
            category_id: cartProduct.Product.category,
            unit_price: cartProduct.Product.price,
            quantity: cartProduct.amount
        })
    })

    return items
}

const generatePayerJson = async userId => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                userId: userId
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                CPF: true,
                Addresses: {
                    select: {
                        CEP: true,
                        street: true,
                        number: true
                    },
                    where: {
                        mainAddress: true
                    }
                }
            }
        })
        console.log(user.phone);

        return {
            name: user.firstName,
            surname: user.lastName,
            email: user.email,
            phone: {
                area_code: user.phone.slice(0, 2),
                number: user.phone.slice(2, 11)
            },
            identification: {
                type: 'CPF',
                number: user.CPF
            },
            address: {
                street_name: user.Addresses.street,
                street_number: user.Addresses.number,
                zip_code: user.Addresses.CEP
            }
        }
    } catch (e) {
        console.log(e)
    }
}