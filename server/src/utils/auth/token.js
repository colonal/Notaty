import jwt from 'jsonwebtoken';
import { getEnvForce } from '../../config/env.js';

function generateToken(payload) {
    return jwt.sign(payload, getEnvForce('JWT_SECRET'), { expiresIn: '7d' });
}

function verifyToken(token) {
    return jwt.verify(token, getEnvForce('JWT_SECRET'));
}

export { generateToken, verifyToken };

