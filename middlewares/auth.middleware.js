const jwt = require('jsonwebtoken');
const env = require('../utils/auth'); 

const autMiddleware = async (req, res, next) => {
    if(!req.headers.authorization) {
        res.status(401).json({ message: "Acceso no autorizado"});
    } else {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, env.AUTH_SECRET, (err, decoded) => {
            if(err) {
                res.status(500).json({message: "Ha ocurrido un problema al decodificar el token"});
            } else {
                req.user = decoded.user;
                next();    
            }
        })     
    }    
}

module.exports = autMiddleware;