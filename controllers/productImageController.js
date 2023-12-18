const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const errors = require('../utils/errors')

module.exports.getProductImagesByProductId = async (req, res) => {
    const productData = {
        productId: req.params.productId
    }
    try {
        const imagesFound = await prisma.productPic.findMany({
            where:{
                productId: productData.productId
            }
        })

        imagesFound
        ? res.status(200).send(imagesFound)
        : res.status(404).send({clientMessage:`Nenhuma imagem encontrada`})
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })        
    }
}

module.exports.uploadImage = async (req, res) => {
    const productImage = {
        path: req.body.path,
        productId: req.body.productId
    }

    try {
        const newPic = await prisma.productPic.create({
            data:{
                productPicId: uuid.v4(),
                productPic: productImage.path,
                productId: productImage.productId
            }
        })

        res.status(200).send({clientMessage:`Foto cadastrada com sucesso`})
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}