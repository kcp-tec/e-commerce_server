const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const errors = require('../utils/errors')

module.exports.insertCommentLike = async (req, res) => {
    try {
        await prisma.commentLike.create({
            data: {
                commentLikeId: uuid.v4(),
                userId: req.body.userId,
                productCommentId: req.body.productCommentId
            }
        })

        res.status(200).send({ clientMessage: 'Comentário curtido' })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.countCommentLikes = async (req, res) => {
    try {
        const commentLikes = await prisma.commentLike.count({
            where: {
                productCommentId: req.params.productCommentId
            }
        })

        res.status(200).send({ data: commentLikes })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}