// const express = require ("express") // new express.Router ()
const express = require ("express")
const router = express.Router()
const Player = require("../models/players")


router.post("/players/register", async (req,res)=>{
    try {
        const request = req.body
        const player = await Player.create({
            name: request.name,
            password: request.password

    }).catch(error=>{
        console.log(error)
        throw new Error("Usuario existente")
        })
        
        await player.hashPassword()
        await player.save()
        const token = player.generateToken()
        res.status(200).send({data: {token}, status: true, message: "Registro de usuario exitoso!!!"
    })
    } catch (error) {
        console.log("Error",error)
        res.status(200).send({data: {error}, status: false, message: "¡Errorrrrr!!"})
    }
    
})

router.post("/players/login", async (req,res)=>{
    try {
        const request = req.body
        const player = await Player.findOne({
            name:request.name
            
        }).catch(error=>{
            console.log(error)
            throw new Error("Usuario no encontrado")
            })
        if(player==null){
            throw new Error("No se encontró el usuario")
        }
            const match = await player.verifyPassword(request.password)
            if (match==false){
                throw new Error("La contraseña es incorrecta")
            }
        const token = player.generateToken()
        res.status(200).send({data: {token}, status: true, message: "Ingreso de Usuario valido!!"
        })

        
    } catch (error) {
        console.log("Error",error)
        res.status(200).send({data: {error:error.toString()}, status: false, message: "¡Errorrrrr!!"})
    }
})

module.exports = router