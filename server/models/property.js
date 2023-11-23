const mongoose = require('mongoose');

const propertyFeatures = new mongoose.Schema({
    beds: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true }
});

const propertySchema = new mongoose.Schema({
    propertyId: { type: String, unique: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    pricePerMonth: { type: Number, required: true },
    location: { type: String, required: true },
    propertyType: { type: String, required: true },
    propertyFeatures: propertyFeatures,
    imageUrl: { type: String },
});

propertySchema.pre('save', async function (next) {
    try {
        if (!this.isNew) {
            return next();
        }

        const lastUser = await Property.findOne({}, {}, { sort: { 'propertyId': -1 } });
        this.propertyId = lastUser ? lastUser.propertyId + 1 : 1;

        next();
    } catch (error) {
        next(error);
    }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;