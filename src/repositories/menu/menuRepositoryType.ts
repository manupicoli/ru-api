import { MenuDTO } from "../../dtos/menu/menuDTO";
import { MenuRequest } from "../../dtos/menu/menuRequest";
import { Menu } from "../../entities/menu";

export interface IMenuRepository{
    create: (menu: MenuRequest) => Promise<Menu>;
    getById: (menuId: number) => Promise<Menu>;
    listWeekMenu: (inicialDate: Date, endDate: Date) => Promise<Menu[]>;
    getAll: () => Promise<Menu[]>;
    addItems: (menuId: number, itemsId: number[]) => Promise<void>;
    deleteItem: (menuId: number, itemId: number) => Promise<void>;
    update: (menuId: number, payload: Partial<MenuDTO>) => Promise<Menu>;
    delete: (menuId: number) => Promise<boolean>;
}