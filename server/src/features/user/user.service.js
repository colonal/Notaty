import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/auth/token.js';
import ClientError from '../../utils/errors/client_error.js';
import UserRepository from './user.repository.js';

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(name, email, password) {
        const existingUser = await this.userRepository.findUserByEmail(email);
        if (existingUser) {
            throw new ClientError('User already exists', 400);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userRepository.createUser(name, email, hashedPassword);
        const token = this._generateToken(user);
        return { token, user: this._convertUser(user) };
    }

    async loginUser(email, password) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            await new Promise(resolve => setTimeout(resolve, 500));
            throw new ClientError('Invalid Authentication Credentials', 401);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ClientError('Invalid Authentication Credentials', 401);
        }
        const token = this._generateToken(user);
        return { token, user: this._convertUser(user) };
    }

    async updateUser(id, name) {
        const user = await this.userRepository.findUserById(id);
        if (!user) {
            throw new ClientError("User not found", 404);
        }
        const updatedUser = await this.userRepository.updateUser(id, name);
        return this._convertUser(updatedUser);
    }

    async deleteUser(id) {
        const user = await this.userRepository.findUserById(id);
        if (!user) {
            throw new ClientError("User not found", 404);
        }
        await this.userRepository.deleteUser(id);
    }

    async findAllUsers() {
        const users = await this.userRepository.findAllUsers();
        return users.map(this._convertUser);
    }

    async findUserById(id) {
        const user = await this.userRepository.findUserById(id);
        if (!user) {
            throw new ClientError("User not found", 404);
        }
        return this._convertUser(user);
    }

    async deleteAllUsers() {
        await this.userRepository.deleteAllUsers();
    }

    _convertUser(user) {
        return {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "createdAt": user.createdAt,
        };
    }

    _generateToken(user) {
        return generateToken({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt });
    }
}

export default UserService;