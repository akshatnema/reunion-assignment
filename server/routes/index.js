const express = require('express');
const { userSignup, userLogin } = require('../controllers/user');
const { getAllProperties } = require('../controllers/property');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    const { email, name, password } = req.body;

    const response = await userSignup(name, email, password);
    res.status(response.status).json({ message: response.message });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const response = await userLogin(email, password);
    if (response.status === 200) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(response.status).json({ message: response.message, token });
    } else {
        res.status(response.status).json({ message: response.message });
    }
});

router.get('/list-properties', async (req, res) => {
    const response = await getAllProperties();
    res.status(response.status).json({ message: response.message });
})

module.exports = router;