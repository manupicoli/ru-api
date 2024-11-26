import { ItemRequest } from "../../dtos/item/itemRequest";
import { ItemsDTO } from "../../dtos/item/itemsDTO";
import { IMenuItemRepository } from "../../repositories/item/itemRepositoryType";

export interface IMenuItemService{
    itemRepository: IMenuItemRepository;

    create: (item: ItemRequest) => Promise<ItemsDTO>;
    getById: (itemId: number) => Promise<ItemsDTO>;
    getAll: () => Promise<ItemsDTO[]>;
    updateItem: (itemId: number, item: ItemRequest) => Promise<ItemsDTO>;
    deleteItem: (itemId: number) => Promise<boolean>;
}