const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const errors = require('../utils/errors')

module.exports.insertProductComment = async (req, res) => {
    try {
        await prisma.productComment.create({
            data: {
                productCommentId: uuid.v4(),
                comment: req.body.comment || null,
                stars: req.body.stars,
                productId: req.body.productId,
                userId: req.body.userId
            }
        })

        res.status(200).send({ clientMessage: 'Comentário enviado' })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.listProductCommentByProductId = async (req, res) => {
    try {
        const comments = await prisma.productComment.findMany({
            where: {
                productId: req.params.productId
            }
        })

        comments
            ? res.status(200).send({ data: comments })
            : res.status(404).send({ clientMessage: 'Este produto não possui comentários' })

    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}