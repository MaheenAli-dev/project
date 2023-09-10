const { Schema, model } = require('mongoose');

const BrandsSchema = new Schema({
    BrandName: {
        type: String,
        required: true
    },
    BrandImage: {
        type: [String],
        required: true
    }
});

const Brand = model('brand', BrandsSchema);
module.exports = { Brand };