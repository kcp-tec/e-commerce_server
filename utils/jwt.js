const jwt = require('jsonwebtoken')
module.exports.generateToken = (userId, email) => {
    var token = jwt.sign(
        {
            data:{
                userId: userId,
                email: email
            }
           
        },
        process.env.SECRET_JWT_EMAIL, {'expiresIn': '1h'}
   );
   return token;
}
module.exports.validateToken = (token) =>{
    try {
        var decode = jwt.verify(token,  process.env.SECRET_JWT_EMAIL)
        return {
            statusToken: "ok",
            content: decode 
        }
    } catch (error) {
        return {
            statusToken: "invalid",
            content: null 
        }
    }
}
module.exports.getTokenFromHeader = (headers)=>{
    var tokenFull = headers["authorization"]
    var tokenVetor = tokenFull.split(" ")
    var token = tokenVetor[1]
    console.log(token);
    return token
}
//            ((`\      
//         ___ \\ '--._ 
//      .'`   `'    o  )
//     /    \   '. __.' 
//    _|    /_  \ \_\_  
//   {_\______\-'\__\_\  leandro 