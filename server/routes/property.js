const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { addProperty, getProperty, deleteProperty } = require('../controllers/property');
const User = require('../models/user');

// Add a property
router.post('/', async (req, res) => {
    const { token, name, pricePerMonth, location, propertyType, imageUrl, propertyFeatures } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    const response = await addProperty(user._id, name, pricePerMonth, location, propertyType, imageUrl, propertyFeatures);
    return res.status(response.status).json({ message: response.message });
})

// Get all properties of a user
router.get('/', async (req, res) => {
    const { token } = req.query;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    let response = await getProperty(user._id);
    if (response.status !== 200) return res.status(response.status).json({ message: response.message });

    response.message = response.message.map(property => {
        return { ...property._doc, owner: user.name }
    })
    return res.status(response.status).json({ message: response.message });
})

// Delete a property
router.delete('/:id', async (req, res) => {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const propertyId = req.params.id;
    const response = await deleteProperty(decoded.email, propertyId);
    return res.status(response.status).json({ message: response.message });
})

// Update a property
router.put('/:id', async (req, res) => {
    const { token } = req.body;
    const propertyId = req.params.id;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findOne({ email: decoded.email });
    const { name, pricePerMonth, location, propertyType, imageUrl } = req.body;
    const response = await updateProperty(user._id, propertyId, name, pricePerMonth, location, propertyType, imageUrl);
    return res.status(response.status).json({ message: response.message });
})

module.exports = router;