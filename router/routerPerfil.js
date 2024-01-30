import express from 'express';
import protegerRuatas from '../middleware/authMiddleware.js';
import cacheInit from '../middleware/cache.js';

import {
    perfil, publicar,
    editar, guardarEdicion,
    eliminarProducto, publicarInfo,
    publicaciones
} from '../controllers/perfilControllers.js';

const route = express.Router()

route.get('/', protegerRuatas, perfil)
route.get('/publicaciones', protegerRuatas, cacheInit.withTtl('1 minute'), publicaciones)
route.route('/publicar')
    .get(protegerRuatas, publicarInfo)
    .post(protegerRuatas, publicar)
route.route('/editar/:id')
    .get(protegerRuatas, editar)
    .put(protegerRuatas, guardarEdicion)
route.delete('/eliminar/:id', protegerRuatas, eliminarProducto)

export default route;