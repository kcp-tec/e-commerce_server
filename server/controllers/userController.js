const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const checkers = require('../utils/checkers')

module.exports.insertUser = async (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    if (!userData.lastName || !userData.firstName) {
        res.status(400).send({
            clientMessage: 'O primeiro e último nome são obrigatórios'
        })
    }

    if (!checkers.emailCheck(userData.email)) {
        res.status(400).send({
            clientMessage: 'E-mail informado é inválido'
        })
    }

    if (!checkers.passwordCheck(userData.password)) {
        res.status(400).send({
            clientMessage: 'A senha não coincide com os padrões requisitados'
        })
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                firstName: userData.firstName,
                middleName: userData.middleName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password
            }
        })

        res.status(200).send(newUser.userId)
    } catch (e) {
        const errorMessage = getErrorMessageAndStatus(e)
        res.status(errorMessage.status).send({ serverMessage: errorMessage.serverMessage })
    }
}

function getErrorMessageAndStatus(e) {
    if (e.code == 'P2002') {
        return {
            status: 409,
            serverMessage: `Registro ${e.meta.target} duplicado`
        }
    }
}