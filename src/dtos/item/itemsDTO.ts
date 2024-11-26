import { MenuItems } from "../../entities/menuItens";

export interface ItemsDTO extends Omit<MenuItems, "itemId">{
    itemId?: number,
    name?: string,
    description?: string
}