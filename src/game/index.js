const express = require ("express")
const router = new express.Router()
const {getSingleTriviaQuestions, verifyAnswer, updatePlayerScore} = require("./utilis") //importa la info de utilis.js
const verifyToken = require ("../middleware/auth")


router.get("/questions/single", verifyToken, async (req,res) =>{
    try {
        const question = await getSingleTriviaQuestions()
    res.status(200).send({data: {question}, status: true, message: "Consulta exitosa"})//tipo: 200,300,400,500
    } catch (error){
        console.log("error", error)
        res.status(200).send({data: {error:error.toString()}, status: false, message: "¡Errorrrrr!!"})
    }
    
}) //req: lo que nos pide el cliente (usuario), res: lo que enviamos al cliente (usuario) como respuesta

router.post("/questions/response", verifyToken, async (req,res)=>{
    try {
        const request = req.body
        console.log(request);
        const winner = await verifyAnswer(request.question, request.answer)
        console.log(winner);
        const score = await updatePlayerScore(req.headers["user"],winner)
        console.log(score);
        res.status(200).send({data: {score}, status: true, message: "ACTUALIZACIÓN CORRECTA"})

        
    } catch (error) {
        console.log("Error",error)
        res.status(200).send({data: {error:error.toString()}, status: false, message: "¡Errorrrrr!!"})
    }    

})

module.exports = router