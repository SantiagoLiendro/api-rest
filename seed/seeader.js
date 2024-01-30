import { exit } from 'node:process'
import producto from "./producto.js";
import categorias from './categorias.js';
import { Productos, Usuario, Categorias } from "../models/index.js";
import db from "../config/db.js";


const importarDatos = async () => {
    try {
        await db.authenticate()

        await db.sync()

        await Promise.all([Productos.bulkCreate([producto]), Categorias.bulkCreate(categorias)])
        console.log("Correctamente")
        exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}



if (process.argv[2] === '-i') {
    importarDatos()
}