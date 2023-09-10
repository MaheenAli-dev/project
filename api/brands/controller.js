const { connect } = require('mongoose')
const { Brand } = require('./model')
require('dotenv').config()


// Brand


const postBrands = async (req, res) => {

    const { BrandName, BrandImage  } = req.body;
    console.log({ BrandName, BrandImage  })

    try {

        await connect(process.env.MONGODB_URL)
        await Brand.create({ BrandName, BrandImage  })
        const brands = await Brand.find()

        res.json({
            message: "Brand Added Successfully",
            brands 
        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

const getAllBrands = async(req, res) => {
    try {
        await connect(process.env.MONGODB_URL)
        console.log("DB Connected")
        const getAllBrands = await Brand.find()
        res.json({
            Brand: getAllBrands
        })

    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getBrandByName = async (req, res) => {  
    const { BrandName } = req.query;

    try {
        await connect(process.env.MONGODB_URL);
        const brand = await Brand.findOne({ BrandName: BrandName });

        if (!brand) {
            return res.status(404).json({
                message: 'Brand not found',
            });
        }

        res.json({
            brand: brand,
        });
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

const getBrandById = async (req, res) => {
    const { _id } = req.query;

    try {
        await connect(process.env.MONGODB_URL);
        const brand = await Brand.findById(_id);

        if (!brand) {
            return res.status(404).json({
                message: 'Brand not found',
            });
        }

        res.json({
            brand: brand,
        });
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

const updateBrandById = async (req, res) => {
    const BrandId = req.params.id;
    const { brand } = req.body;

    try {
        await connect(process.env.MONGODB_URL);
        const updateBrandById = await Brand.findByIdAndUpdate(
            BrandId,
            { brand },
            { new: true }
        );

        if (updateBrandById) {
            res.json({
                message: "Brand updated successfully.",
                brand: updateBrandById,
            });
        } else {
            res.json({
                message: "Brand not found.",
            });
        }
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

const deleteBrand = async (req, res) => {
    const { _id } = req.params;

    try {
        await connect(process.env.MONGODB_URL);
        const brands = await Brand.findByIdAndDelete(_id)


        if (!brands) {
            return res.status(404).json({
                message: 'Brand not found'
            });
        }

        res.json({
            message: 'Brand deleted successfully.',
            brands

        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteProductsByBrand = async (req, res) => {
    const { brand } = req.body;

    try {
        await connect(process.env.MONGODB_URL);
        const deletedBrands = await Brand.deleteMany({ Brand });

        if (deletedBrands.deletedCount === 0) {
            return res.status(404).json({
                message: 'No Brands found for the specified Brand'
            });
        }

        res.json({
            message: `Deleted ${deletedBrands.deletedCount} Brands with the Brand '${brand}'`,
            deletedBrands
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {postBrands, deleteBrand, getBrandByName, getBrandById, updateBrandById, deleteProductsByBrand, getAllBrands };