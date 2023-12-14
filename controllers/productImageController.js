const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const errors = require('../utils/errors')

module.exports.uploadImage = async (req, res) => {
    const productImage = {
        path: req.body.path,
        productId: req.body.productId
    }
    console.log(productImage);

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
        console.log(e);
    }
}