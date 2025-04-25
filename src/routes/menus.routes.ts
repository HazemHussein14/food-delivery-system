import express from "express";
import MenuController from "../controllers/menus.controller";

const menuController = new MenuController();
const router = express.Router();

router.post('/', menuController.createMenu);
router.put('/:menuId', menuController.updateMenu);
router.delete('/:menuId', menuController.deleteMenu);
router.patch('/:menuId/status', menuController.toggleMenuStatus);
router.get('/restaurants/:restaurantId/history', menuController.getHistoricalMenus);
router.get('/search', menuController.searchMenuItems);

export default router;
