import { ItemsDTO } from "../../dtos/item/itemsDTO";
import { MenuItems } from "../../entities/menuItens";

export function toItemDTO(item: MenuItems): ItemsDTO{
    return {
        itemId: item.itemId,
        name: item.name,
        description: item.description
    };
}

export function toItensDTO(itens: MenuItems[]): ItemsDTO[]{
    return itens.map(item => ({
        itemId: item.itemId,
        name: item.name,
        description: item.description
    }));
}

