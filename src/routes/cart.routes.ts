import express from "express";
import CartController from "../controllers/cart.controller";
const cartController = new CartController();
const router = express.Router();

router.post('/:customerId/items', cartController.addItemToCart);
router.delete('/:customerId', cartController.clearCart);
router.put('/:customerId', cartController.modifyEntireCart);
router.get('/:customerId', cartController.viewCart);
router.delete('/:customerId/items/:itemId', cartController.removeItemFromCart);
router.post('/:customerId/checkout', cartController.checkoutCart);
router.patch('/:customerId/items/quantities', cartController.updateItemQuantities);

export default router;
