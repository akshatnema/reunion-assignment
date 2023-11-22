const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(401).json({ error: 'Token not provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (expiredToken(decoded)) res.status(401).json({ error: 'Unauthorized' });

        const user = await User.findOne({ email: decoded.email });

        if (user) next();
        else return res.status(401).json({ error: 'Unauthorized' });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const expiredToken = (decodedToken) => {
    const currentTime = Math.floor(Date.now() / 1000);

    // Compare the current time with the expiration time
    return decodedToken.exp < currentTime;
}

module.exports = {
    authenticatedUser
}