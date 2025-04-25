import express from "express";
import OrderController from "../controllers/orders.controller";

const orderController = new OrderController();
const router = express.Router();

router.post('/', orderController.placeOrder);
router.patch('/:orderId/cancel', orderController.cancelOrder);
router.patch('/:orderId/status', orderController.updateOrderStatus);
router.get('/restaurants/:restaurantId/history', orderController.getRestaurantOrderHistory);
router.get('/:orderId/summary', orderController.getOrderSummary);
router.get('/:orderId', orderController.getOrderDetails);
router.get('/:orderId/status', orderController.trackOrderStatus);

export default router;
