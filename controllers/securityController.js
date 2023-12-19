const utilsJwt =  require('../utils/jwt')
module.exports.generateToken = async (req, res) => {
    var key = req.params.key
    var userId = req.params.userId
    var email = req.params.email
    if(key == process.env.SECRET_JWT_EMAIL){
        res.status(200).send(utilsJwt.generateToken(userId, email))
    }else{
        res.status(403).send("Chave inválida")
    }
}

module.exports.decodeToken = async (req,res)=>{
    var key = req.params.key
    var token = req.params.token
    
}