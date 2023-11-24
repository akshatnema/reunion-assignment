const Property = require('../models/property');

// function to add a property to the database
const addProperty = async (owner, name, pricePerMonth, location, propertyType, availabilityDate, imageUrl='', propertyFeatures) => {
    try {
        if (!name || !pricePerMonth || !location || !propertyType || !propertyFeatures || !availabilityDate) {
            return { status: 400, message: 'All fields are required' }
        }
        const availableDate = new Date(availabilityDate);
        const property = new Property({ owner, name, pricePerMonth, location, propertyType, availableDate, imageUrl, propertyFeatures });
        await property.save();
        return { status: 200, message: 'Property added successfully' }
    } catch (error) {
        console.error(error)
        return { status: 500, message: 'Internal Server Error' }
    }
}

// function to get all properties from the database
const getAllProperties = async () => {
    try {
        const properties = await Property.find({});
        return { status: 200, message: properties }
    } catch (error) {
        console.error(error)
        return { status: 500, message: 'Internal Server Error' }
    }
}

// function to update a property by id
const updateProperty = async (ownerId, propertyId, name, pricePerMonth, location, propertyType, availabilityDate, imageUrl, propertyFeatures) => {
    try {
        const availableDate = new Date(availabilityDate);
        const updatedProperty = await Property.findOneAndUpdate(
            { propertyId: propertyId, ownerId: ownerId },
            { name, pricePerMonth, location, propertyType, availableDate, imageUrl, propertyFeatures },
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

// function to delete a property by id and owner id
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

// function to get a properties by owner id
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