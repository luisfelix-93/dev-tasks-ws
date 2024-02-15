const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    // Bearer XXXX
    const [, token] = authHeader.split(' ');
  
    const decoded = await jwt.verify(token, authConfig.secret);
    req.userId = decoded.id;
  
    await next();
}

module.exports = authMiddleware;