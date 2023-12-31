const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { addProperty, getProperty, deleteProperty, updateProperty } = require('../controllers/property');
const User = require('../models/user');
const { extractToken } = require('../utils/token');

// Add a property
router.post('/', async (req, res) => {
    const tokenResponse = await extractToken(req);

    const { name, pricePerMonth, location, propertyType, availabilityDate, imageUrl, propertyFeatures } = req.body;
    const decoded = jwt.verify(tokenResponse.message, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    const response = await addProperty(user._id, name, pricePerMonth, location, propertyType, availabilityDate, imageUrl, propertyFeatures);
    return res.status(response.status).json({ message: response.message });
})

// Get all properties of a user
router.get('/', async (req, res) => {
    const tokenResponse = await extractToken(req);

    const decoded = jwt.verify(tokenResponse.message, process.env.JWT_SECRET);
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
    const tokenResponse = await extractToken(req);;
    const decoded = jwt.verify(tokenResponse.message, process.env.JWT_SECRET);
    const propertyId = parseInt(req.params.id);

    const user = await User.findOne({ email: decoded.email });

    const response = await deleteProperty(user._id, propertyId);
    return res.status(response.status).json({ message: response.message });
})

// Update a property
router.put('/:id', async (req, res) => {
    const tokenResponse = await extractToken(req);
    const propertyId = parseInt(req.params.id);
    
    const decoded = jwt.verify(tokenResponse.message, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    const { name, pricePerMonth, location, propertyType, imageUrl, availabilityDate, propertyFeatures } = req.body;
    const response = await updateProperty(user._id, propertyId, name, pricePerMonth, location, propertyType, availabilityDate, imageUrl, propertyFeatures);
    return res.status(response.status).json({ message: response.message });
})

module.exports = router;