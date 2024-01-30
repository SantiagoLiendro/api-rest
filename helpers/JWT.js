import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config('.env')

const generarJWT = (id) => {
    return jwt.sign(id, process.env.JWT, {
        expiresIn: '10d'
    })
}


export default generarJWT;