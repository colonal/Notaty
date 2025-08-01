import User from './user.model.js';

class UserRepository {

    async createUser(name, email, password) {
        const newUser = new User({
            name: name,
            email: email,
            password: password,
            createdAt: new Date(),
        });
        return newUser.save();
    }

    async findUserByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    }

    async findUserById(id) {
        const user = await User.findById(id);
        return user;
    }

    async updateUser(id, name) {
        const user = await User.findByIdAndUpdate(id, { name: name }, { new: true });
        return user;
    }

    async deleteUser(id) {
        await User.findByIdAndDelete(id);
    }

    async findAllUsers() {
        const users = await User.find();
        return users;
    }

    async findUserByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    }

    async deleteAllUsers() {
        await User.deleteMany();
    }
}

export default UserRepository;

