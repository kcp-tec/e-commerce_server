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

    const insertProductValidation = validateProduct(productData)

    if(insertProductValidation){
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
}

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

const validateProduct = (productData)=>{
    if(productData.name == null|| productData.category ==null|| productData.price==null){
        return {
            status:400,
            clientMessage: "O nome, produto e preço são obrigatórios"
        }, false
    }

    if(productData.price<=0){
        return {
            status:400,
            clientMessage:"O preço precisa ser maior que zero"
        }, false
    }

    return{
        status:200,
        ok:true
    }, true
}
