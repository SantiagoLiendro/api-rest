import express from 'express';
import dotenv from 'dotenv';
import routerUsuario from './router/routerUsuario.js';
import routerPerfil from './router/routerPerfil.js';
import db from './config/db.js';
import cors from 'cors';

const corsOption = {
    origin: process.env.FRONTEND_URL,
    methods: 'GET,POST,PUT,PATCH,POST,DELETE'
}

dotenv.config('.env')
const app = express();
app.use(cors(corsOption))
app.use(express.json())

//Conexio DB
try {
    await db.authenticate();
    await db.sync();
    console.log("Conexion correcta")
} catch (error) {
    console.error(error)
}

app.use('/user', routerUsuario)
app.use('/perfil', routerPerfil)


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor listo en el puerto ${port}`)
})


