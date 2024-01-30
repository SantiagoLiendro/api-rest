import express from 'express';
import {
    registrar, confirmar,
    login, olvidePassword,
    recuperarCuenta, passwordNuevo,

} from '../controllers/usuarioControllers.js'


const router = express.Router();


router.post('/registrar', registrar)
router.get('/confirmar/:token', confirmar)
router.post('/login', login)
router.post('/olvidePassword', olvidePassword)
router.route('/recuperarCuenta/:token')
    .get(recuperarCuenta)
    .post(passwordNuevo)


export default router;