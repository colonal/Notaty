import ClientError from '../../utils/errors/client_error.js';
import UserService from './user.service.js';

class UserController {
    #userService;

    constructor() {
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
            res.status(201).json(data);
        } catch (error) {
            if (error instanceof ClientError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.#userService.loginUser(email, password);
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            if (error instanceof ClientError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async findAllUsers(req, res) {
        try {
            const users = await this.#userService.findAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async findUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await this.#userService.findUserById(id);
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            if (error instanceof ClientError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const user = await this.#userService.updateUser(id, name);
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await this.#userService.deleteUser(id);
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async deleteAllUsers(req, res) {
        try {
            await this.#userService.deleteAllUsers();
            res.status(200).json({ message: "All users deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export const userController = new UserController();