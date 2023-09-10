const { connect } = require('mongoose')
const { Product } = require('./model')
require('dotenv').config()


// Products


const postProducts = async (req, res) => {

    const { productName, price, brand, category, images, description, rating, thumbnail } = req.body;
    console.log({ productName, price, brand, category, images, description, rating, thumbnail })

    try {

        await connect(process.env.MONGODB_URL)
        const allProducts = await Product.find()
        await Product.create({ productName, price, brand, category, images, description, rating, thumbnail })

        res.json({
           
            message: "Product Created Successfully",
                Product: Product,
                Product: allProducts
        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        await connect(process.env.MONGODB_URL);
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(404).json({
                message: 'No products found',
            });
        }

        res.json({ products });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const getProduct = async (req, res) => {

    const { productName } = req.query

    try {
        await connect(process.env.MONGODB_URL)
        const product = await Product.findOne({ productName: productName })
        res.json(
            {
                product: product
            }
        )

    }

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}

const getProductByBrand = async (req, res) => {

    const { brand } = req.query

    try {
        await connect(process.env.MONGODB_URL)
        const product = await Product.findOne({ brand: brand })
        res.json(
            {
                product: product
            }
        )

    }

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}



const getProductByCategory = async (req, res) => {
    const CategoryName = req.params.CategoryName; 
    
    try {
        const products = await Product.find({ category: CategoryName });
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const getProductById = async (req, res) => {
    const _id = req.params._id;

    try {
        await connect(process.env.MONGODB_URL);
        const product = await Product.findById(_id);

        if (!product) {
            return res.status(404).json({
                message: error.message
            });
        }

        res.json({
            product: product
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const updateProduct = async (req, res) => {
    const { _id, ...updateData } = req.body;
    const filter = { _id };
    try {
        await connect(process.env.MONGODB_URL);

        const updatedProduct = await Product.findOneAndUpdate(filter, updateData, {
            new: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        const allProducts = await Product.find(); 

        res.json({ message: 'Success', product: updatedProduct, allProducts });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const deleteProductById = async (req, res) => {
    const { _id } = req.params;

    try {
        await connect(process.env.MONGODB_URL);
        const deletedProduct = await Product.findByIdAndDelete(_id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.json({
            message: 'Product deleted successfully.',
            product: deletedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};




module.exports = { getAllProducts, postProducts, getProduct, getProductByBrand, getProductByCategory, getProductById, updateProduct, deleteProductById };