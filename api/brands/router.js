const app = require('express');
const router = app.Router();
const {postBrands, getBrandByName, getAllBrands, getBrandById, updateBrandById, deleteProductsByBrand, deleteBrand } = require('./controller');


router.post('/brands', postBrands);
router.get('/getallbrands', getAllBrands);
router.get('/getbrandbyname', getBrandByName);
router.get('/getbrandbyid', getBrandById);
router.put('/updatebrand/:id', updateBrandById);
router.delete('/deletebrand/:_id', deleteBrand)
router.delete('/deleteproductsbybrand', deleteProductsByBrand);

module.exports = router;





