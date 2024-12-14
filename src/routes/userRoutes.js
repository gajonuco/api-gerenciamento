const express = require('express');
const router = express.Router();
const User = require('../models/User');

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

module.exports = router;
