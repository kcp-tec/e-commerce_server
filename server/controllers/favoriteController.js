const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const errors = require('../utils/errors')

module.exports.favoriteProduct = async (req, res) => {
    try {
        const favorite = await prisma.favorite.findFirst({
            where: {
                AND: [{ productId: req.body.productId }, { userId: req.body.userId }]
            }
        })

        if (favorite) {
            await prisma.favorite.delete({
                where: {
                    favoriteId: favorite.favoriteId
                }
            })

            return res.status(200).send({ clientMessage: 'Produto desfavoritado' })
        }

        await prisma.favorite.create({
            data: {
                favoriteId: uuid.v4(),
                productId: req.body.productId,
                userId: req.body.userId
            }
        })

        res.status(200).send({ clientMessage: 'Produto favoritado' })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.listFavoritesByUser = async (req, res) => {
    try {
        const favorites = await prisma.favorite.findMany({
            where: {
                userId: req.params.userId
            }
        })

        res.status(200).send(favorites)
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}