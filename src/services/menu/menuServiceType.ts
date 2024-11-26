import { MenuDTO } from "../../dtos/menu/menuDTO";
import { MenuRequest } from "../../dtos/menu/menuRequest";
import { IMenuItemRepository } from "../../repositories/item/itemRepositoryType";
import { IMenuRepository } from "../../repositories/menu/menuRepositoryType";

export interface IMenuService{
    menuRepository: IMenuRepository;
    itemRepository: IMenuItemRepository;

    create: (menu: MenuRequest) => Promise<MenuDTO>;
    getById: (menuId: number) => Promise<MenuDTO>;
    listWeekMenu: () => Promise<MenuDTO[]>;
    getAll: () => Promise<MenuDTO[]>;
    addItemsToMenu: (menuId: number, itemId: number[]) => Promise<void>;
    deleteItem: (menuId: number, itemId: number) => Promise<void>;
    update: (menuId: number, payload: Partial<MenuDTO>) => Promise<MenuDTO>;
    delete: (menuId: number) => Promise<boolean>;
}