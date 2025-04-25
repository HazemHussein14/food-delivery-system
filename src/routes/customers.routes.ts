import express from "express";
import CustomerController from "../controllers/customer.controller";

const customerController = new CustomerController();
const router = express.Router();

router.get('/:customerId/orders', customerController.getCustomerOrderHistory);
router.get('/:customerId/payment-settings', customerController.getPaymentSettings);
router.post('/:customerId/addresses', customerController.createAddress);
router.get('/:customerId/addresses', customerController.getAddresses);
router.put('/:customerId/addresses/:addressId', customerController.updateAddress);
router.patch('/:customerId/addresses/:addressId/status', customerController.toggleAddressStatus);
router.patch('/:customerId/deactivate', customerController.deactivateAccount);
router.post('/reviews', customerController.submitReview);

export default router;
