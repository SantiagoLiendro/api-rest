import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuarios.js';
import dotenv from 'dotenv';
dotenv.config('.env')


const protegerRuatas = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT)
            const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id)

            if (usuario) {
                req.usuario = usuario
                return next();
            }

        } catch (error) {
            const msg = new Error("Token no valido");
            res.status(403).json({ msg: msg.message })
            return;
        }
    }
    next()
}

export default protegerRuatas;