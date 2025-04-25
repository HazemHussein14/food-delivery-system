import express from "express";
import PaymentController from "../controllers/payment.controller";

const paymentController = new PaymentController();
const router = express.Router();

router.post("/initiate", paymentController.initiatePayment);
router.get("/transactions", paymentController.getTransactions);
router.get("/transactions/:txnId/receipt", paymentController.generateReceipt);

export default router