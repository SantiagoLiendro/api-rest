import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config('.env')

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const emailRegistro = async (datos) => {
    const { email, token, nombre } = datos

    await transport.sendMail({
        from: 'API Rest-Prueba',
        to: email,
        subject: 'Probando Api Rest',
        text: 'Confirmar tu cuenta',
        html: ` <p>Hola ${nombre} confirma tu cuenta en el siguiente<a href="${process.env.FRONT_HOST_URL}:${process.env.PORT_FRONTEND || 5173}/confirmar/${token}"> elace</a></p> 
            <p>Si no te registraste ignora este mensaje</p>
        `
    })
}

const emailRecuperarPassword = async (datos) => {
    const { email, token, nombre } = datos

    await transport.sendMail({
        from: 'API Rest-Prueba',
        to: email,
        subject: 'Probando Recuperar Password Api Rest',
        text: 'Recupera tu cuenta',
        html: ` <p>Hola ${nombre} sigue el siguiente <a href="${process.env.FRONT_HOST_URL}:${process.env.PORT_FRONTEND || 5173}/recuperarCuenta/${token}"> elace</a> para recuperar acceso a tu cuenta</p> 
            <p>Si no te registraste ignora este mensaje</p>
        `
    })
}



export {
    emailRegistro,
    emailRecuperarPassword
}