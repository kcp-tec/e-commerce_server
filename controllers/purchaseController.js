const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const errors = require('../utils/errors')
const cartController = require('./cartController')
const mp = require('./mercadoPagoController')

module.exports.insertPurchase = async (req, res) => {
    try {
        const payment = await mp.createPayment(await generateMercadoPagoBody(req.body.cartId, req.body.addressId))
        console.log(payment);
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

const generateMercadoPagoBody = async (cartId, addressId) => {
    const items = await generateItemsJson(cartId)
    const payer = await generatePayerJson(cartId)
    const shipments = await generateShipmentJson(addressId)
    const cart = await prisma.cart.findUnique({ where: { cartId } })

    return {
        transaction_amount: Number(cart.totalValue),
        additional_info: {
            items,
            shipments
        },
        payer,
        transaction_amount: Number(cart.totalValue),
        installments: 2,
        payment_method_id: 'bolbradesco'
    }
}

const generateShipmentJson = async addressId => {
    const address = await prisma.address.findUnique({
        where: { addressId }
    })

    return {
        receiver_address: {
            city_name: address.city,
            street_name: address.street,
            zip_code: address.CEP,
            street_number: address.number,
            apartment: address.complement
        }
    }
}

const generateItemsJson = async cartId => {
    const products = await prisma.cartProduct.findMany({
        select: {
            cartProductId: true,
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
            id: cartProduct.cartProductId,
            title: cartProduct.Product.name,
            description: cartProduct.Product.description,
            category_id: cartProduct.Product.category,
            unit_price: cartProduct.Product.price,
            quantity: cartProduct.amount
        })
    })

    return items
}

const generatePayerJson = async cartId => {
    try {
        const userId = await prisma.cart.findUnique({
            where: {
                cartId: cartId
            },
            select: {
                userId: true
            }
        })

        const user = await prisma.user.findUnique({
            where: {
                userId: userId.userId
            },
            select: {
                userId: true,
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
        
        return {
            address: {
                street_name: user.Addresses[0].street,
                street_number: parseInt(user.Addresses[0].number),
                zip_code: user.Addresses[0].CEP
            },
            email: user.email,
            type: "customer",
            first_name: user.firstName,
            last_name: user.lastName,
            phone: {
                area_code: user.phone.slice(0, 2),
                number: user.phone.slice(2, 11)
            },
            identification: {
                type: 'CPF',
                number: user.CPF
            }
        }
    } catch (e) {
        console.log(e)
    }
}