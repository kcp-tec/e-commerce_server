module.exports.getErrorMessageAndStatus = e => {
    if (e.code == 'P2002') {
        return {
            status: 409,
            clientMessage: `Registro ${e.meta.target} duplicado`
        }
    }

    return {
        status: 500,
        clientMessage: `Erro de servidor: ${e}`
    }
}