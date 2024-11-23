const express = require('express');
const router = express.Router();
const { User, addUser, getUserByLogin, comparePass } = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

// Регистрация пользователя
router.post('/reg', async (req, res) => {
    const { name, email, login, password } = req.body;

    try {
        // Создаем нового пользователя
        const newUser = new User({ name, email, login, password });
        await addUser(newUser);
        res.status(201).json({ success: true, msg: 'Пользователь был добавлен' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, msg: 'Пользователь не был добавлен' });
    }
});

// Аутентификация пользователя
router.post('/auth', async (req, res) => {
    const { login, password } = req.body;

    try {
        // Проверяем наличие пользователя
        const user = await getUserByLogin(login);
        if (!user) {
            return res.status(404).json({ success: false, msg: 'Пользователь не найден' });
        }

        // Сравниваем пароль
        const isMatch = await comparePass(password, user.password);
        if (isMatch) {
            const token = jwt.sign(
                { id: user._id, login: user.login },
                config.secret,
                { expiresIn: 3600 * 24 } 
            );

            return res.json({
                success: true,
                token: `JWT ${token}`,
                user: {
                    id: user._id,
                    name: user.name,
                    login: user.login,
                    email: user.email,
                },
            });
        } else {
            return res.status(401).json({ success: false, msg: 'Пароли не совпадают' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, msg: 'Ошибка при аутентификации' });
    }
});

// Доступ к личному кабинету
router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ success: true, msg: 'Доступ разрешен', user: req.user });
});

module.exports = router;
