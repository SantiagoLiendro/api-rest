import Usuario from "../models/Usuarios.js"
import { check, validationResult } from "express-validator";
import { generarId } from "../helpers/generarToken.js"
import { emailRegistro, emailRecuperarPassword } from "../helpers/emails.js"
import bcrypt from 'bcrypt';
import generarJWT from "../helpers/JWT.js";


const registrar = async (req, res) => {

    const { email, apellido, password, nombre } = req.body

    if (!email == '') {
        const usuario = await Usuario.findOne({ where: { email } })

        if (usuario && !usuario?.confirmado) {
            const error = new Error("El email ya fue registrado, revisa tu bandeja de correo para confirmar la cuenta")
            return res.status(400).json({ msg: error.message })
        }

        if (usuario) {
            const error = new Error("El email ya esta registrado, inicia sesión")
            return res.status(400).json({ msg: error.message })
        }

        try {
            const token = generarId();
            await Usuario.create({ email, apellido, password, nombre, token })
            emailRegistro({ token, nombre, email })
            return res.status(200).json({ msg: "Tu cuenta fue creada correctamente, revisa la tu correo para confirmar tu cuenta" })
        } catch (error) {
            const msg = new Error("Hubo un error")
            return res.status(401).json({ mensaje: msg })
        }
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params

    const usuario = await Usuario.findOne({ where: { token } })

    if (!usuario) {
        return res.status(403).json({ msg: "El token no es valido " })
    }

    usuario.confirmado = true;
    usuario.token = null;
    await usuario.save();
    return res.json({ msg: "La cuenta fue confirmada correctamente" })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (email) {
        const usuario = await Usuario.findOne({ where: { email } })

        if (!usuario) {
            const error = new Error("El correo ingresado no es valido")
            return res.status(404).json({ msg: error.message })
        }
        if (usuario && !usuario?.confirmado) {
            const error = new Error("Debes confirmar tu cuenta para iniciar sesión")
            return res.status(403).json({ msg: error.message })
        }

        if (!usuario?.verificarPassword(password)) {
            const error = new Error("La contraseña ingresada no es valida")
            return res.status(403).json({ msg: error.message })
        }

        res.json({ token: generarJWT({ id: usuario.id }) })

    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body

    const usuario = await Usuario.findOne({ where: { email } })

    if (!usuario) {
        const error = new Error("El correo ingresado no existe")
        return res.status(404).json({ msg: error.message })
    }

    const token = generarId();
    usuario.token = token;
    await usuario.save();

    emailRecuperarPassword({ email, token, nombre: usuario.nombre })
    return res.json({ msg: "Te enviamos un correo, para recuperar tu cuenta" })

}

const recuperarCuenta = async (req, res) => {
    const { token } = req.params
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        return res.status(403).json({ msg: "El token no es valido" })
    }

}

const passwordNuevo = async (req, res) => {
    const { password } = req.body
    const { token } = req.params

    const usuario = await Usuario.findOne({ where: { token } })

    if (!usuario) {
        return res.status(403).json({ msg: "El token no es valido" })

    }

    const salt = await bcrypt.genSalt(10);
    const nuevoPassword = await bcrypt.hash(password, salt)
    usuario.password = nuevoPassword;
    usuario.token = null;
    await usuario.save();

    res.json({ msg: "Contraseña Guardada Correctamente" })

}


export {
    registrar,
    confirmar,
    login,
    olvidePassword,
    recuperarCuenta,
    passwordNuevo,
}