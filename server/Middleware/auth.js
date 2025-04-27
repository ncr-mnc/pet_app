const jwt = require("jsonwebtoken");
const User = require("../Models/Users");
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //decode token
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.user = user;
            next();
        } catch(err) {
            return res.status(401).json({message: 'Invalid token'});
        }
    } else {
        return res.status(401).json({message: 'No token provided'});
    }
}

module.exports = authMiddleware;