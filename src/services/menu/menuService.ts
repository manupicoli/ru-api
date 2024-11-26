import { endOfWeek, startOfWeek } from "date-fns";
import { MenuDTO } from "../../dtos/menu/menuDTO";
import { MenuRequest } from "../../dtos/menu/menuRequest";
import { IMenuItemRepository } from "../../repositories/item/itemRepositoryType";
import { IMenuRepository } from "../../repositories/menu/menuRepositoryType";
import { toMenuDTO, toMenusDTO } from "../../utils/mappers/menuMappers";
import { IMenuService } from "./menuServiceType";

export class MenuService implements IMenuService{
    menuRepository: IMenuRepository;
    itemRepository: IMenuItemRepository;

    constructor(menuRepository: IMenuRepository, itemRepository: IMenuItemRepository){
        this.menuRepository = menuRepository;
        this.itemRepository = itemRepository;
    }
    
    create = async (menu: MenuRequest) => {
        const newMenu = await this.menuRepository.create(menu);
        return toMenuDTO(newMenu);
    };

    getById = async (menuId: number) => {
        const menu = await this.menuRepository.getById(menuId);
        return toMenuDTO(menu);
    }

    listWeekMenu = async () => {
        const now = new Date();
        const inicialDate = startOfWeek(now, { weekStartsOn: 1 });
        const endDate = endOfWeek(now, { weekStartsOn: 1 });
        const menus = await this.menuRepository.listWeekMenu(inicialDate, endDate);
        
        return toMenusDTO(menus);
    }

    getAll = async () => {
        const menus = await this.menuRepository.getAll();
        return toMenusDTO(menus);
    }
    
    addItemsToMenu = async (menuId: number, itemId: number[]) => {
        const menu = await this.getById(menuId);

        const items = itemId.map(async item => {
            await this.itemRepository.getById(item);
        })

        if(menu && items){
            await this.menuRepository.addItems(menuId, itemId);
        } else {
            throw new Error('Menu or Item not found');
        }

    };

    deleteItem = async (menuId: number, itemId: number) => {
        const menu = await this.getById(menuId);
        const item = await this.itemRepository.getById(itemId);

        if(menu && item){
            await this.menuRepository.deleteItem(menuId, itemId);
        } else {
            throw new Error('Menu or Item not found');
        }
    }

    update = async (id: number, payload: Partial<MenuDTO>) => {
        const updatedUser = await this.menuRepository.update(id, payload);
        return toMenuDTO(updatedUser);
    };

    delete = async (id: number) => {
        return this.menuRepository.delete(id);
    };
}