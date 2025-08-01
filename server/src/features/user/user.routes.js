import express from 'express';
import { isDev } from '../../config/env.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import { userController } from './user.controller.js';

const router = express.Router();


router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/:id', authMiddleware, userController.findUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

if (isDev()) {
    router.get('/', userController.findAllUsers);
    router.delete('/', userController.deleteAllUsers);
}

export default router;
