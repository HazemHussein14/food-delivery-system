import express from "express";
import RestaurantController from "../controllers/restaurants.controller";

const restaurantController = new RestaurantController();
const router = express.Router();

router.post('/', restaurantController.registerRestaurant);
router.put('/:restaurantId', restaurantController.updateRestaurant);
router.patch('/:restaurantId/status', restaurantController.toggleRestaurantStatus);
router.get('', restaurantController.getAllRestaurants);
router.get('/search', restaurantController.searchRestaurants);
router.get('/top-rated', restaurantController.getTopRatedRestaurants);
router.get('/recommended', restaurantController.getRecommendedRestaurants);

export default router;
