import { verifyToken } from '../utils/auth/token.js';

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
}

export default authMiddleware;