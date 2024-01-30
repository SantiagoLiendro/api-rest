import Productos from "./Productos.js";
import Usuario from "./Usuarios.js";
import Categorias from "./Categorias.js";

Productos.belongsTo(Usuario, { foreignKey: 'vendedorId' })
Productos.belongsTo(Categorias, { foreignKey: 'categoriaId' })

export {
    Productos,
    Usuario,
    Categorias
}