import { Menu } from "../../entities/menu";
import { ItemsDTO } from "../item/itemsDTO";

export interface MenuDTO extends Omit<Menu, "menuId">{
    menuId?: number,
    availableDate?: Date,
    mealTime?: string,
    items?: ItemsDTO[]
}