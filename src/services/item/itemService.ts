import { ItemRequest } from "../../dtos/item/itemRequest";
import { ItemsDTO } from "../../dtos/item/itemsDTO";
import { IMenuItemRepository } from "../../repositories/item/itemRepositoryType";
import { toItemDTO } from "../../utils/mappers/itemMappers";
import { IMenuItemService } from "./itemServiceType";

export class ItemService implements IMenuItemService{
    itemRepository: IMenuItemRepository;

    constructor(itemRepository: IMenuItemRepository){
        this.itemRepository = itemRepository;
    }

    create = async (item: ItemRequest) => {
        const newItem = await this.itemRepository.create(item);
        return toItemDTO(newItem);
    };

    getById = async (itemId: number) => {
        const item = await this.itemRepository.getById(itemId);
        return toItemDTO(item);
    }

    getAll = async (): Promise<ItemsDTO[]> => {
        const items = await this.itemRepository.getAll();
        return items.map(toItemDTO);
    };

    updateItem = async (itemId: number, item: ItemRequest) => {
        const updatedItem = await this.itemRepository.updateItem(itemId, item);
        return toItemDTO(updatedItem);
    };

    deleteItem = async (itemId: number) => {
        return await this.itemRepository.deleteItem(itemId);
    };
}