const nodemailer = require('nodemailer')
const utilsGeral = require('../utils/geral')
const utilsJwt =  require('../utils/jwt')
module.exports.sendMail = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            // host: process.env.EMAIL_HOST,
            // port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: "uunp dkrh ewef obnf"
            }
        })  

        //  const passCode = await utilsGeral.passCodeGenerator(req.body.userId)
        var token = utilsJwt.generateToken(req.body.userId, req.body.email);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: req.body.email,
            replyTo: process.env.EMAIL_USER,
            subject: "Recuperação de senha",
            html: `
            
           <body>
           <p> Olá! Reconhecemos sua necessidade de recuperação de senha e preparamos um código para que você possa fazer a mudança da sua senha.</p> 
           <a href="http://${process.env.LINK_HOST_EMAIL}:${process.env.PORT}/api/verifyToken/${token}">Recuperar senha</a>
           <br><br>
           </body>   
             `
            
            
        })

        res.status(200).send({ clientMessage: 'E-mail enviado' })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

module.exports.verifyToken = async(req,res)=>{
    var token = req.params.token
    var validation = utilsJwt.validateToken(token)

    if(validation.statusToken == "ok"){
        res.status(200).json(validation.content)
    }else{
     res.status(403).send("Token de recuperação inválido")
    }
}
