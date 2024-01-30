import db from "../config/db.js";
import { DataTypes } from "sequelize";

const Categorias = db.define('Categorias', {
    nombre: DataTypes.STRING
})

export default Categorias;