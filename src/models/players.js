const mongoose = require ("mongoose")
const bcrypt = require("bcrypt")
const jwt = require ("jsonwebtoken")

const playersSchema = new mongoose.Schema({
    name: {
        type: String, //String de moogoose, tipo de variable
        required: true, //campo es obligatorio
        trim: true, //va a eliminar los espacios al principio y al final del texto
        unique:true, //jugador exclusivo o único
        lowercase: true // todos los usuarios estarán estan en minuscula
    },
    password: {
        type: String,
        required:true,
        minlength: 8,
        trim: true,
        validate(value){
            if (value == "12345678") {
                throw new Error("La contraseña no puede ser 12345678")
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    score: {
        type: Number,
        default: 0
    }
})

playersSchema.methods.hashPassword = async function(){
    this.password = await bcrypt.hash(this.password,5) //lo que se hace es transformar la password en un texto totalmente diferente a este, en este caso lo hace 5 veces 
}

playersSchema.methods.verifyPassword = async function(password){
    const isEqual = await bcrypt.compare(password, this.password) //async: proceso que lleva tiempo en realizar un proceso., tanto el hash y await son propiedades async, mientras mas await mas demora en las respuestas, compara el password del usuario con el password encripatado
    return isEqual
}

playersSchema.methods.generateToken = function(){
    const token = jwt.sign({_id:this.name.toString()}, process.env.AUTH_PASSWORD) //jwt.sign es una función: se genera un token, con base en el ID, y el password del .env, firma de mi servidor, buena practica de desarrollador para el id de Mongo y que convierte en string
    this.tokens=[...this.tokens,{token}] //se genera un token por cada inicio.
    this.save()//guardar cambios en el servidor
    return token //retorna el token al usuario.
}

const Player=mongoose.model("Player",playersSchema)
module.exports=Player
