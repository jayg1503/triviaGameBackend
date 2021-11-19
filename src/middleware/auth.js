const jwt = require ("jsonwebtoken") //es un pedazo de código que se interpone entre un cliente y el servidor al que quiere consultar

const verifyToken = (req,res, next) =>{
    try {
        const user = req.headers ["user"]
        const token = req.headers["access-token"]
        //console.log(user, token)
        if (user==null) {
            throw new Error ("Debes Enviar un usuario")
        }
        if (token == null){
            throw new Error ("Debes Enviar un token")
        }
        const userName = jwt.verify(token,process.env.AUTH_PASSWORD)
        //console.log(userName._id);
        if (userName._id != user) {
            throw new Error ("El token no es real")
        }
        return next()
        
    } catch (error) {
        return res.status (401).send({data: {error:error.toString()}, status: false, message: "¡Error de autenticación!!"})
    }
    
}

module.exports = verifyToken