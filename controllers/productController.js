const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const errors = require('../utils/errors')

module.exports.listProductByCategory = async (req, res) => {
    const productData = {
        category: req.params.category
    }

    try {

    const productsFound = await prisma.product.findMany({
            where: {
                category: productData.category
            }
        })

        productsFound
        ? res.status(200).send(productsFound)
        : res.status(404).send({clientMessage:`Nenhum produto da categoria ${productData.category} encontrado`})
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }

}


module.exports.updateProductByField = async (req, res) => {
    const productData = {
        field: req.body.field,
        value: req.body.value,
        productId: req.body.productId
    }

    try {
        await prisma.product.update({
            where: {
                productId: productData.productId
            },
            data: {
                [productData.field]: productData.value
            }
        })

        res.status(200).send({ clientMessage: `Campo ${productData.field} atualizado para ${productData.value}` })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.deleteProduct = async (req, res) => {
    const productData = {
        productName: req.body.productName
    }

    try {
        await prisma.product.delete({
            where: {
                name: productData.productName
            }
        })

        res.status(200).send({ clientMessage: `Produto ${productData.productName} deletado` })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.decreaseProduct = async (req, res) => {
    const productData = {
        productName: req.body.productName,
        amountDecreased: req.body.amountDecreased
    }

    try {
        const decreasedProducts = await prisma.product.update({
            where: {
                name: productData.productName,
            },
            data: {
                amount: {
                    decrement: (productData.amountDecreased)
                }
            }
        })

        res.status(200).send({ clientMessage: `Produto ${productData.productName} atualizado para quantidade ${decreasedProducts.amount}` })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.insertProduct = async (req, res) => {
    const productData = {
        productId: req.body.productId,
        amountAdded: req.body.amountAdded
    }

    try {
        await prisma.product.update({
            where: {
                productId: productData.productId,
            },
            data: {
                amount: {
                    increment: (productData.amountAdded)
                }
            }
        })

        res.status(200).send({ clientMessage: `Produto recebeu +${productData.amountAdded} em quantidade` })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.createProduct = async (req, res) => {
    const productData = {
        productId: uuid.v4(),
        name: req.body.name,
        category: req.body.category,
        description: req.body.description || null,
        price: req.body.price
    }

    const insertProductValidation = validateProduct(productData)

    if (!insertProductValidation.ok) {
        return res.status(insertProductValidation.status).send({
            clientMessage: insertProductValidation.clientMessage
        })
    }

    try {
        const newProduct = await prisma.product.create({
            data: {
                productId: uuid.v4(),
                name: productData.name,
                category: productData.category,
                description: productData.description,
                price: productData.price
            }
        })

        res.status(200).send({ clientMessage: `Produto ${newProduct.name} cadastrado` })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.findProductByField = async (req, res) => {
    try {
        const productFound = await prisma.product.findMany({
            where: {
                [req.params.field]: req.params.value
            }
        })

        productFound
            ? res.status(200).send(productFound)
            : res.status(404).send({ clientMessage: "Nenhum produto encontrado" })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

const validateProduct = productData => {
    if (!productData.name || !productData.category || !productData.price) {
        return {
            status: 400,
            clientMessage: "O nome, produto e preço são obrigatórios"
        }
    }

    if (productData.price <= 0) {
        return {
            status: 400,
            clientMessage: "O preço precisa ser maior que zero"
        }
    }

    return {
        status: 200,
        ok: true
    }
}

module.exports.validateAmount = async (productId, amount) => {
    try {
        const productAmount = await prisma.product.findUnique({
            where: {
                productId: productId
            },
            select: {
                amount: true
            }
        })

        return productAmount.amount >= amount
    } catch (e) {
        return e
    }

}


// _..__.          .__.._
// .^"-.._ '-(\__/)-' _..-"^.
//        '-.' oo '.-'
//           `-..-'  Pedro       