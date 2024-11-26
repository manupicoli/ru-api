import { ItemRequest } from "../../dtos/item/itemRequest";
import { MenuItems } from "../../entities/menuItens";

export interface IMenuItemRepository{
    create: (item: ItemRequest) => Promise<MenuItems>;
    getById: (itemId: number) => Promise<MenuItems>;
    getAll: () => Promise<MenuItems[]>;
    updateItem: (itemId: number, item: ItemRequest) => Promise<MenuItems>;
    deleteItem: (itemId: number) => Promise<boolean>;
}