const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Gera um token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Rota para cadastro de usuários
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username e senha são obrigatórios.' });
    }

    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Username já existe.' });
        }
        res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: error.message });
    }
});

// Rota para login de usuários
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username e senha são obrigatórios.' });
    }

    try {
        // Verifica se o usuário existe
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Verifica se a senha está correta
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Retorna o token JWT
        res.status(200).json({
            token: generateToken(user._id),
            message: 'Login realizado com sucesso!'
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error: error.message });
    }
});

// Rota protegida de exemplo
router.get('/profile', protect, async (req, res) => {
    res.json({ message: 'Bem-vindo à área protegida!', user: req.user });
});

module.exports = router;
