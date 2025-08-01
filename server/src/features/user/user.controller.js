import { BaseController } from '../../core/base.controller.js';
import UserService from './user.service.js';

class UserController extends BaseController {
    #userService;

    constructor() {
        super();
        this.#userService = new UserService();
        this.createUser = this.createUser.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.findAllUsers = this.findAllUsers.bind(this);
        this.findUserById = this.findUserById.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.deleteAllUsers = this.deleteAllUsers.bind(this);
    }

    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const data = await this.#userService.createUser(name, email, password);
            this.createdResponse(res, 'User created successfully.', data);
        } catch (error) {
            this.errorResponse(res, error);
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.#userService.loginUser(email, password);
            this.successResponse(res, 'Login successful.', user);
        } catch (error) {
            this.errorResponse(res, error);
        }
    }

    async findAllUsers(req, res) {
        try {
            const users = await this.#userService.findAllUsers();
            this.successResponse(res, 'Users retrieved successfully.', users);
        } catch (error) {
            this.errorResponse(res, error);
        }
    }

    async findUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await this.#userService.findUserById(id);
            this.successResponse(res, 'User retrieved successfully.', user);
        } catch (error) {
            this.errorResponse(res, error);
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const user = await this.#userService.updateUser(id, name);
            this.successResponse(res, 'User updated successfully.', user);
        } catch (error) {
            this.errorResponse(res, error);
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await this.#userService.deleteUser(id);
            this.successResponse(res, 'User deleted successfully.');
        } catch (error) {
            this.errorResponse(res, error);
        }
    }

    async deleteAllUsers(req, res) {
        try {
            await this.#userService.deleteAllUsers();
            this.successResponse(res, 'All users deleted successfully.');
        } catch (error) {
            this.errorResponse(res, error);
        }
    }
}

export const userController = new UserController();