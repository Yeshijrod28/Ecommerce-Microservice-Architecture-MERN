import express from 'express';
import { getCart, addToCart, updateItem, removeItem, clearCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/:userId', getCart);
router.post('/add', addToCart);
router.put('/update', updateItem);
router.delete('/remove', removeItem);
router.delete('/clear', clearCart);

export default router;
