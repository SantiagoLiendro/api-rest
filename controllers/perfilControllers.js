import { Productos, Categorias, Usuario } from "../models/index.js"



const perfil = async (req, res) => {
    const { usuario } = req

    res.status(200).json(usuario)
    return;
}

const publicaciones = async (req, res) => {
    const { usuario } = req

    const vendedorId = usuario.id
    const productos = await Productos.findAll(
        {
            where: { vendedorId },
            include:
                [
                    { model: Categorias }
                ]
        })

    setTimeout(() => {
        res.status(200).json(productos)
        return
    }, 2000);

}

const publicarInfo = async (req, res) => {
    const categorias = await Categorias.findAll()
    res.json(categorias)
}


const publicar = async (req, res) => {
    const { id } = req.usuario
    const { nombre, precio, cantidad, imagen, descripcion, categoriaId } = req.body

    if ([nombre, precio, imagen, cantidad].includes('')) {
        const msg = new Error("Todos los campos deben ir llenos");
        res.status(401).json({ msg: msg.message })
        return
    }

    try {
        await Productos.create({ nombre, precio: parseFloat(precio), imagen, cantidad, vendedorId: id, descripcion, categoriaId })
        res.status(200).json({ msg: "Producto Creado Correctamente" })
    } catch (error) {
        console.log(error)
    }
}


const editar = async (req, res) => {
    const { id } = req.params
    const usuario = req.usuario

    const producto = await Productos.findOne({ where: { id } })

    if (!usuario) {
        const msg = new Error("Pagina no disponible")
        res.status(401).json({ msg: msg.message })
        return
    }

    if (producto?.vendedorId.toString() !== usuario?.id.toString()) {
        const msg = new Error("Pagina no disponible")
        res.status(401).json({ msg: msg.message })
        return
    }

    res.json(producto)
}


const guardarEdicion = async (req, res) => {
    const { id } = req.params
    const usuario = req.usuario
    const { nombre, precio, imagen, cantidad, descripcion } = req.body

    const producto = await Productos.findOne({ where: { id } })

    if (!usuario) {
        const msg = new Error("Pagina no disponible")
        res.status(401).json({ msg: msg.message })
        return
    }

    if (producto?.vendedorId.toString() !== usuario?.id.toString()) {
        const msg = new Error("Pagina no disponible")
        res.status(401).json({ msg: msg.message })
        return
    }

    try {
        producto.set({ nombre, precio: parseFloat(precio), imagen, cantidad, descripcion })
        await producto.save()
        res.status(200).json({ msg: "Guardado correctamente" })
    } catch (error) {
        console.log(error)
    }

}

const eliminarProducto = async (req, res) => {
    const usuario = req.usuario
    const { id } = req.params

    const producto = await Productos.findByPk(id)

    if (!usuario) {
        const msg = new Error("Pagina no disponible")
        res.status(401).json({ msg: msg.message })
        return
    }

    if (producto?.vendedorId.toString() !== usuario?.id.toString()) {
        const msg = new Error("Pagina no disponible")
        res.status(401).json({ msg: msg.message })
        return
    }

    try {
        await producto.destroy()
        res.status(200).json({ msg: "Producto eliminado correctamente" })
    } catch (error) {
        console.log(error)
    }

}

export {
    perfil,
    publicar,
    editar,
    guardarEdicion,
    eliminarProducto,
    publicarInfo,
    publicaciones
}