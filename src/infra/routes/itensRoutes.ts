import express from 'express'
import { appDataSource } from '../../data-source';
import { ItemRepository } from '../../repositories/item/itemRepository';
import { ItemService } from '../../services/item/itemService';
import { ItemController } from '../../controllers/itensController';
import { MenuRepository } from '../../repositories/menu/menuRepository';

const itensRepository = new ItemRepository(appDataSource);
const itensService = new ItemService(itensRepository);
const itensController = new ItemController(itensService);
const itensRouter = express.Router()

itensRouter.post('/item', itensController.create)
itensRouter.get('/item/:itemId', itensController.getById)
itensRouter.get('/items', itensController.getAll)
itensRouter.put('/item/:itemId', itensController.update)
itensRouter.delete('/item/:itemId', itensController.delete)

export default itensRouter