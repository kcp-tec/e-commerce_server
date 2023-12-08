const nodemailer = require('nodemailer')
const utilsGeral = require('../utils/geral')

module.exports.sendMail = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        })

        const passCode = await utilsGeral.passCodeGenerator(req.body.userId)

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: req.body.email,
            replyTo: process.env.EMAIL_USER,
            subject: "Recuperação de senha",
            text: `Olá! Reconhecemos sua necessidade de recuperação de senha e preparamos um código para que você possa fazer a mudança da sua senha. 
            <br><br>
             O seu código de recuperação é: <b>${passCode}</b>`
        })

        res.status(200).send({ clientMessage: 'E-mail enviado' })
    } catch (e) {
        res.status(400).send(e)
    }
}