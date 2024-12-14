const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Obtém o token do header
            token = req.headers.authorization.split(' ')[1];

            // Verifica e decodifica o token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Busca o usuário pelo ID no token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({ message: 'Não autorizado, token inválido.' });
        }
    } else {
        res.status(401).json({ message: 'Não autorizado, token ausente.' });
    }
};

module.exports = protect;
