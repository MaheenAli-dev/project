const { connect } = require('mongoose')
const { Category } = require('./model')
require('dotenv').config()


// Category


const postCategories = async (req, res) => {

    const { CategoryName, CategoryImage } = req.body;
    console.log({ CategoryName, CategoryImage })

    try {

        await connect(process.env.MONGODB_URL)
        await Category.create({ CategoryName, CategoryImage })
        const categories = await Category.find()

        res.json({
            message: "Category Added Successfully",
            categories
        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

const getAllCategories = async (req, res) => {
    try {
        await connect(process.env.MONGODB_URL)
        console.log("DB Connected")
        const getAllCategories = await Category.find()
        res.json({
            Category: getAllCategories
        })

    }
    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getCategoryByName = async (req, res) => {
    const { CategoryName } = req.query;

    try {
        await connect(process.env.MONGODB_URL);
        const category = await Category.findOne({ CategoryName: CategoryName });

        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
            });
        }

        res.json({
            category: category,
        });
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

const getCategoryById = async (req, res) => {
    const { _id } = req.query;

    try {
        await connect(process.env.MONGODB_URL);
        const category = await Category.findById(_id);

        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
            });
        }

        res.json({
            category: category,
        });
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};


const updateCategoryById = async (req, res) => {
    const { _id, CategoryName, CategoryImage } = req.body
    const filter = { _id };
    const update = { CategoryName, CategoryImage };
    try {
        await connect(process.env.MONGODB_URL)

        await Category.findOneAndUpdate(filter, update, {
            new: true
        });

        const category = await Category.find()

        res.json({
            message: "Success",
            category
        })

    }
    catch (error) {
        res.json({
            message: error.message,
        });
    }

};



const deleteCategory = async (req, res) => {
    const { _id } = req.params;

    try {
        await connect(process.env.MONGODB_URL);
        const categories = await Category.findByIdAndDelete(_id)


        if (!categories) {
            return res.status(404).json({
                message: 'Category not found'
            });
        }

        res.json({
            message: 'Category deleted successfully.',
            categories

        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteProductsByCategory = async (req, res) => {
    const { category } = req.body;

    try {
        await connect(process.env.MONGODB_URL);
        const deletedCategorys = await Category.deleteMany({ category });

        if (deletedCategorys.deletedCount === 0) {
            return res.status(404).json({
                message: 'No Categorys found for the specified category'
            });
        }

        res.json({
            message: `Deleted ${deletedCategorys.deletedCount} Categorys with the category '${category}'`,
            deletedCategorys
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { postCategories, deleteCategory, getCategoryByName, getCategoryById, updateCategoryById, deleteProductsByCategory, getAllCategories };