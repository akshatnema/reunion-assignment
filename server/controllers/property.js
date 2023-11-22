const Property = require('../models/property');

const addProperty = async (owner, name, pricePerMonth, location, propertyType, imageUrl) => {
    try {
        if (!name || !pricePerMonth || !location || !propertyType) {
            return { status: 400, message: 'All fields are required' }
        }
        const property = new Property({ owner, name, pricePerMonth, location, propertyType, imageUrl });
        await property.save();
        return { status: 200, message: 'Property added successfully' }
    } catch (error) {
        console.error(error)
        return { status: 500, message: 'Internal Server Error' }
    }
}

const getAllProperties = async () => {
    try {
        const properties = await Property.find({});
        return { status: 200, message: properties }
    } catch (error) {
        console.error(error)
        return { status: 500, message: 'Internal Server Error' }
    }
}

const updateProperty = async (ownerId, propertyId, name, pricePerMonth, location, propertyType, imageUrl) => {
    try {
        const updatedProperty = await Property.findOneAndUpdate(
            { propertyId: propertyId, ownerId: ownerId },
            { name, pricePerMonth, location, propertyType, imageUrl },
            { new: true }
        );

        if (!updatedProperty) {
            return res.status(404).json({ error: 'Property not found or you do not have permission to update it' });
        }

        res.json({ message: 'Property updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteProperty = async (ownerId, propertyId) => {
    try {
        const deletedProperty = await Property.findOneAndDelete({ propertyId: propertyId, owner: ownerId });

        if (!deletedProperty) {
            return res.status(404).json({ error: 'Property not found or you do not have permission to delete it' });
        }

        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getProperty = async (ownerId) => {
    try {
        const properties = await Property.find({ owner: ownerId });
        return { status: 200, message: properties }
    } catch (error) {
        console.error(error)
        return { status: 500, message: 'Internal Server Error' }
    }
}

module.exports = {
    addProperty,
    getAllProperties,
    updateProperty,
    deleteProperty,
    getProperty
}