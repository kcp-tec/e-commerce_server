const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const checkers = require('../utils/checkers')
const errors = require('../utils/errors')


module.exports.deleteProduct = async(req,res) => {
    const productData = {
        productName: req.body.productName
    }

    try {
        const deletedProduct = await prisma.product.delete({
            where: {
                name: productData.productName
            }
        })
        res.status(200).send({clientMessage:`Produto ${productData.productName} deletado`})
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

// decrementando produto de estoque
module.exports.decreaseProduct = async(req, res) => {
    const productData = {
        productName: req.body.productName,
        amountDecreased: req.body.amountDecreased
    }
    try {
        const decreasedProducts = await prisma.product.update({
            where: {
                name: productData.productName,
            },
            data:{
                amount: {
                    decrement:(productData.amountDecreased)
                }
            }
        })
        res.status(200).send({clientMessage:`Produto ${productData.productName} atualizado para quantidade ${decreasedProducts.amount}`})
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

// Insert de produto
module.exports.insertProduct= async (req, res) => {
    const productData = {
        productName: req.body.productName,
        amountAdded: req.body.amountAdded
    }

// kauan n fala

    try {
        const increasedProducts = await prisma.product.update({
            where: {
                name: productData.productName,
            },
            data:{
                amount: {
                    increment:(productData.amountAdded)
                }
            }
        })
        res.status(200).send({clientMessage:`Produto ${productData.productName} atualizado para quantidade ${productData.amountAdded}`})
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}


//cadastro de um novo produto
module.exports.createProduct = async (req, res) => {
    const productData = {
        productId: uuid.v4(),
        name: req.body.name,
        category: req.body.category,
        description: req.body.description || null,
        price: req.body.price,
        picture: req.body.picture || null
    }


    const insertProductValidation = validateProduct(productData)
    
    if(!insertProductValidation.ok) {
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
                price: productData.price,
                picture: productData.picture
            }
        })

        res.status(200).send({ clientMessage: `Produto ${newProduct.name} cadastrado` })
        } catch (e) {
            const errorMessage = errors.getErrorMessageAndStatus(e)
            res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
        }
}


//achar um produto pelo campo 
module.exports.findProductByField = async (req, res) =>{
    try{
        const productFound = await prisma.product.findMany({  
            where:{
                [req.params.field]:req.params.value
            }
        })

        productFound
        ? res.status(200).send(productFound)
        : res.status(404).send({clientMessage:"Nenhum produto encontrado"})

    }catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

const validateProduct = productData => {
    if(!productData.name || !productData.category || !productData.price){
        return {
            status: 400,
            clientMessage: "O nome, produto e preço são obrigatórios"
        }
    }

    if(productData.price <= 0){
        return {
            status: 400,
            clientMessage:"O preço precisa ser maior que zero"
        }
    }

    return{
        status: 200,
        ok: true
    }
}
