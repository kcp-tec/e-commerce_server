module.exports.getErrorMessageAndStatus = e => {
    if (e.code == 'P2002') {
        return {
            status: 409,
            clientMessage: `Registro ${e.meta.target} duplicado`
        }
    }

    if (e.code == 'P2003') {
        return {
            status: 500,
            serverMessage: `Erro em foreign key: ${e.meta.field_name}`
        }
    }

    return {
        status: 500,
        clientMessage: `Erro de servidor: ${e}`
    }
}