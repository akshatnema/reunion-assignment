const Property = require('../models/property');
const {checkPropertyDetails} = require('../utils/property');

// function to add a property to the database
const addProperty = async (owner, name, pricePerMonth, location, propertyType, availabilityDate, imageUrl='', propertyFeatures) => {
    try {
        const propertyDetails = await checkPropertyDetails(owner, name, pricePerMonth, location, propertyType, availabilityDate, imageUrl, propertyFeatures);

        if (propertyDetails.status!==200) return propertyDetails;

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
        const propertyDetails = await checkPropertyDetails(ownerId, name, pricePerMonth, location, propertyType, availabilityDate, imageUrl, propertyFeatures);
        if(propertyDetails.status!==200) return propertyDetails;

        const availableDate = new Date(availabilityDate);
        const updatedProperty = await Property.findOneAndUpdate(
            { propertyId: propertyId, owner: ownerId },
            { name, pricePerMonth, location, propertyType, availableDate, imageUrl, propertyFeatures },
            { new: true }
        );

        if (!updatedProperty) {
            return { status: 404, message: 'Property not found or you do not have permission to update it'}
        }

        return { status: 200, message: 'Property updated successfully'}
    } catch (error) {
        console.log(error)
        return { status: 500, message: 'Internal Server Error' }
    }
}

// function to delete a property by id and owner id
const deleteProperty = async (ownerId, propertyId) => {
    try {
        const deletedProperty = await Property.findOneAndDelete({ propertyId: propertyId, owner: ownerId });
        
        if (!deletedProperty) {
            return { status: 404, message: 'Property not found or you do not have permission to delete it'}
        }

        return { status: 200, message: 'Property deleted successfully'}
    } catch (error) {
        console.error(error)
        return { status: 500, message: 'Internal Server Error' }
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