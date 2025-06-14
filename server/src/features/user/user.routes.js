import express from 'express';
import { isDev } from '../../config/env.js';
import { userController } from './user.controller.js';

const router = express.Router();


router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/:id', userController.findUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

if (isDev()) {
    router.get('/', userController.findAllUsers);
    router.delete('/', userController.deleteAllUsers);
}

export default router;
