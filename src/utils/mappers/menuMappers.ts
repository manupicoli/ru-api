import { MenuDTO } from "../../dtos/menu/menuDTO";
import { Menu } from "../../entities/menu";

export function toMenuDTO(menu: Menu): MenuDTO{
    return {
        menuId: menu.menuId,
        availableDate: menu.availableDate,
        mealTime: menu.mealTime,
        items: menu.items
    };
}

export function toMenusDTO(menus: Menu[]): MenuDTO[]{
    return menus.map(menu => ({
        menuId: menu.menuId,
        availableDate: menu.availableDate,
        mealTime: menu.mealTime,
        items: menu.items
    }));
}

