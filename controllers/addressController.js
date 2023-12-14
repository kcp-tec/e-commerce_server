const { PrismaClient } = require('@prisma/client')
const uuid = require('uuid')
const prisma = new PrismaClient()
const errors = require('../utils/errors')

module.exports.insertAddress = async (req, res) => {
    try {
        const newAddress = await prisma.address.create({
            data: {
                addressId: uuid.v4(),
                street: req.body.street,
                number: req.body.number,
                CEP: req.body.cep,
                complement: req.body.complement,
                userId: req.body.userId
            }
        })

        res.status(200).send({ clientMessage: `Endereço ${newAddress.street}, ${newAddress.number} adicionado` })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.deleteAddress = async (req, res) => {
    try {
        await prisma.address.delete({
            where: { addressId: req.body.addressId }
        })

        res.status(200).send({ clientMessage: 'Endereço apagado' })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.updateAddressByField = async (req, res) => {
    try {
        await prisma.address.update({
            where: { addressId: req.body.addressId },
            data: { [req.body.field]: req.body.value }
        })

        res.status(200).send({ clientMessage: 'Endereço atualizado' })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}

module.exports.listAddressesByUser = async (req, res) => {
    try {
        const addresses = await prisma.address.findMany({
            where: { userId: req.params.userId }
        })

        res.send({ data: addresses })
    } catch (e) {
        const errorMessage = errors.getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ clientMessage: errorMessage.clientMessage, serverMessage: errorMessage.serverMessage || e })
    }
}