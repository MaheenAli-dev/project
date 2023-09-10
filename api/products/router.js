const app = require('express');
const router = app.Router();
const { getAllProducts, postProducts, getProduct, getProductByCategory, getProductByBrand, getProductById, updateProduct, deleteProductById } = require('./controller');

router.get('/allproducts', getAllProducts);
router.post('/products', postProducts);
router.get('/getproduct', getProduct);
router.get('/getproductbycategory/:CategoryName', getProductByCategory);
router.get('/getproductbybrand', getProductByBrand);
router.get('/getproductbyid/:_id', getProductById);
router.put('/updateproduct', updateProduct);
router.delete('/deleteproduct/:_id', deleteProductById);

module.exports = router;





