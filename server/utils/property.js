const checkPropertyDetails = async (owner, name, pricePerMonth, location, propertyType, availabilityDate, imageUrl='', propertyFeatures) => {
    const errors = [];

    if (!owner) {
        errors.push('Owner ID is required');
    }

    if (!name) {
        errors.push('Property name is required');
    }

    if (!pricePerMonth) {
        errors.push('Price per month is required');
    }

    if (!location) {
        errors.push('Location is required');
    }

    if (!propertyType) {
        errors.push('Property type is required');
    }

    if (!availabilityDate) {
        errors.push('Availability date is required');
    }

    if (!propertyFeatures) {
        errors.push('Property features are required');
    }

    if(propertyType.toLowerCase()!=='apartment' && propertyType.toLowerCase()!=='independent house' && propertyType.toLowerCase()!=='room') {
        errors.push('Invalid property type');
    }

    if(typeof propertyFeatures.beds!=='number' || typeof propertyFeatures.bathrooms!=='number' || typeof propertyFeatures.length!=='number' || typeof propertyFeatures.width!=='number') {
        errors.push('Invalid property features');
    }

    if (errors.length > 0) {
        return { status: 400, message: errors.join(', ') };
    }

    return { status: 200, message: 'OK' };
}

module.exports = {
    checkPropertyDetails
}