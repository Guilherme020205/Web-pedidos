const jwt = require('jsonwebtoken'); // Importa a biblioteca JWT
require('dotenv').config(); // Carrega as variáveis de ambiente

const authenticate = (req, res, next) => {
    const token = req.headers.authorization; // Obtém o token do cabeçalho da requisição
    if (!token) return res.status(403).json({ error: 'Token necessário' }); // Se não houver token, retorna erro

    try {
        // Verifica e decodifica o token
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.userId = decoded.userId; // Armazena o ID do usuário na requisição
        next(); // Passa para o próximo middleware ou rota
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' }); // Retorna erro se o token for inválido
    }
};

module.exports = authenticate;  