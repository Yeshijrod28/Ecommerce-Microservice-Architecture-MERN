import express from 'express';
import {
  getProducts, getProductById, createProduct, updateProduct, deleteProduct, updateStock
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/:id/stock', updateStock);

export default router;
