const express = require("express") //cargar libreria express
const app = express() //inicializar la app express
const port = 4156 //puerto de inicialización
const cors = require ("cors")
require("dotenv").config() //para llamar a la libreria .env y que configure para poder leer las variables de entorno
const mongoose = require("mongoose") //importa libreria de mongoose
mongoose.connect(process.env.MONGODB_URL) // Este debe quedar de ultimas de las variables de entorno, CONFIGRUANDO LA BASE PARA QUE SE CONECTE CON MONGO

const gameRouter = require ("./src/game") //Para llamar los index en game
const playerRouter = require ("./src/player")

app.use(cors())
app.use(express.json())//que el servidor acepte peticiones JSON
app.use(gameRouter) // hace parte de la API de Trivia
app.use(playerRouter)


app.listen(port,()=>{
    console.log("Servidor iniciado en el puerto", port); //Se muestra en consola y luego en localhost:4156, se queda esperando una respuesta


    //LO SIGUIENTE ES DEL PRIMER EJERCICIO PARA POSTMAN:
//app.get("/prueba",(req,res)=>{ 
    //console.log(req.body);
    //res.status(200).send({mensaje:"Hola cliente - GET! ! ! !"})//tipo: 200,300,400,500
//}) //req: lo que nos pide el cliente (usuario), res: lo que enviamos al cliente (usuario) como respuesta

//app.post("/prueba",(req,res)=>{
    //console.log(req.body);
    //res.status(200).send({mensaje:"¡Hola cliente! - POST"})
//})//res: respuesta a la solicitud del cliente, si hay varias peticiones con sobre el mismo puerto, prima la primera de arriba hacia abajo. Dos aplicaciones, no pueden usar el mismo puerto.

})
