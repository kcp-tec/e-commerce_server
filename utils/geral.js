module.exports.passCodeGenerator = async (userId) => {
    let passCode = 0
    userId.match(/\d+/g).forEach(number => {
        passCode += Number(number) + parseInt(Math.random() * 100000)
    })

    return passCode
}