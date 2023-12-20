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

module.exports.validateToken = async (req,res, next)=>{
    var headers = req.headers
    var token = utilsJwt.getTokenFromHeader(headers)
    
    var validation = utilsJwt.validateToken(token)
    
  //  if(validation.statusToken == "ok"){
        next()
   // }
   // else {
 //       res.status(403).send("Token de recuperação inválido")
  //  }
}

module.exports.decodeToken = async (req, res) => {
    var key = req.params.key
    var token = req.params.token
}