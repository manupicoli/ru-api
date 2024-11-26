import express from 'express'
import { MenuController } from '../../controllers/menuController';
import { MenuService } from '../../services/menu/menuService';
import { MenuRepository } from '../../repositories/menu/menuRepository';
import { appDataSource } from '../../data-source';
import { ItemRepository } from '../../repositories/item/itemRepository';

const menuRepository = new MenuRepository(appDataSource);
const itensRepository = new ItemRepository(appDataSource);
const menuService = new MenuService(menuRepository, itensRepository);
const menuController = new MenuController(menuService);
const menuRouter = express.Router()

menuRouter.post('/menu', menuController.create)
menuRouter.post('/menu/:menuId/items', menuController.addItem)
menuRouter.post('/menu/:menuId/item', menuController.deleteItem)
menuRouter.get('/menu/:menuId', menuController.getById)
menuRouter.get('/menu', menuController.listWeekMenus)
menuRouter.get('/menus', menuController.getAll)
menuRouter.put('/menu/:menuId', menuController.update)
menuRouter.delete('/menu/:menuId', menuController.delete)

export default menuRouter