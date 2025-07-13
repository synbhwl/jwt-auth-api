// made for a single function to auth the user
const jwt = require('jsonwebtoken')
require('dotenv').config()

function auth (req, res, next){
    try{
        const authheader = req.headers['authorization'];
        if (!authheader || !authheader.startsWith('Bearer')) return res.status(401).json({message:"missing credentials"});

        const token = authheader.split(" ")[1];
        if(!token) return res.status(401).json({message:"missing credentials"});

        const decoded = jwt.verify(token, process.env.secret);

        req.user = decoded;

        next();
    } catch(err){
        res.status(403).json({message:`there was an auth error ${err}`});
    };
};

module.exports = { auth }