const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Определение схемы пользователя
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Создание модели пользователя
const User = mongoose.model('User', UserSchema);

// Методы для работы с пользователями
module.exports = {
    User, // Экспорт модели

    // Получение пользователя по логину
    async getUserByLogin(login) {
        try {
            return await User.findOne({ login });
        } catch (error) {
            throw new Error(`Error finding user by login: ${error.message}`);
        }
    },

    // Получение пользователя по ID
    async getUserById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            throw new Error(`Error finding user by ID: ${error.message}`);
        }
    },

    // Добавление нового пользователя
    async addUser(newUser) {
        try {
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            return await newUser.save();
        } catch (error) {
            throw new Error(`Error adding user: ${error.message}`);
        }
    },

    // Сравнение паролей
    async comparePass(passFromUser, userDbPass) {
        try {
            return await bcrypt.compare(passFromUser, userDbPass);
        } catch (error) {
            throw new Error(`Error comparing passwords: ${error.message}`);
        }
    },
};
