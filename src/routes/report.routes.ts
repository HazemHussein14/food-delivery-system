import express from "express";
import ReportController from "../controllers/report.controller";

const reportController = new ReportController();
const router = express.Router();

router.get('/system/count-restaurants', reportController.getRestaurantCount);
    router.get('/system/count-customers', reportController.getCustomerCount);
    router.get('/system/count-active-customers', reportController.getActiveCustomerCount);
    router.get('/system/orders/daily-count', reportController.getDailyOrderCount);
    router.get('/system/orders/monthly-total', reportController.getMonthlyOrderTotal);
    router.get('/restaurants/:restaurantId/transactions/daily', reportController.getRestaurantDailyTransactions);
    router.get('/restaurants/:restaurantId/transactions/monthly', reportController.getRestaurantMonthlyTransactions);
    router.get('/restaurants/:restaurantId/export/daily-transactions', reportController.generateRestaurantDailyTransactionsReport);
    router.get('/system/export/monthly-transactions', reportController.generateSystemMonthlyTransactionsReport);


export default router;
