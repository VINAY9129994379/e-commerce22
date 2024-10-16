const express = require('express');
const { listProduct, addProduct, removeProduct, singleProduct } = require('../controllers/productController');
const upload = require('../middleware/multer');
const adminAuth = require('../middleware/adminAuth');

const productRouter = express.Router();

productRouter.post(
  '/add', adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
);

productRouter.post('/remove',adminAuth, removeProduct);
productRouter.post('/single',adminAuth, singleProduct);
productRouter.post('/list',adminAuth, listProduct);

module.exports = productRouter;
