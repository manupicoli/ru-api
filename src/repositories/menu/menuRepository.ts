import { Between, DataSource, Repository } from "typeorm";
import { Menu } from "../../entities/menu";
import { MenuDTO } from "../../dtos/menu/menuDTO";
import { IMenuRepository } from "./menuRepositoryType";
import { MenuItems } from "../../entities/menuItens";
import { MenuRequest } from "../../dtos/menu/menuRequest";

export class MenuRepository implements IMenuRepository {
    private repository: Repository<Menu>
    private itemRepository: Repository<MenuItems>

    constructor(dataSource: DataSource){
        this.repository = dataSource.getRepository(Menu)
        this.itemRepository = dataSource.getRepository(MenuItems)
    }

    async create(menu: MenuRequest): Promise<Menu> {
        const newMenu = this.repository.create(menu);
        return await this.repository.save(newMenu);
    }

    async getById(menuId: number): Promise<Menu>{
        const menu = await this.repository.findOne({ 
            where: { menuId},
            relations: ['items']
        });

        if(!menu) {
            throw new Error('Menu not found');
        }

        return menu;
    }

    async listWeekMenu(inicialDate: Date, endDate: Date): Promise<Menu[]>{
        const menus = await this.repository.find({
            relations: ['items'],
            where: {
                availableDate: Between(inicialDate, endDate)
            }
        });
        if(!menus) {
            throw new Error('Menus not found');
        }
        return menus;
    }

    async getAll(): Promise<Menu[]> {
        const menus = await this.repository.find({
            relations: ['items']
        });

        if(!menus) {
            throw new Error('Menus not found');
        }

        return menus;
    }

    async addItems(menuId: number, itemsId: number[]): Promise<void> {
        const menu = await this.repository.findOne({
            where: { menuId },
            relations: ['items']
        });

        if(menu){
            const items = await Promise.all(
                itemsId.map(async itemId => {
                    const item = await this.itemRepository.findOneBy({ itemId });
                    return item;
            }));

            const validItems: MenuItems[] = items.filter((item): item is MenuItems => item !== null);

            menu.items ? menu.items = [...menu.items, ...validItems] : menu.items = validItems;
            await this.repository.save(menu);
        }
    }

    async deleteItem(menuId: number, itemId: number): Promise<void> {
        const menu = await this.repository.findOne({
            where: { menuId },
            relations: ['items']
        });

        if (menu) {
            menu.items ? menu.items = menu.items.filter(item => item.itemId !== itemId) : menu.items;
            await this.repository.save(menu);
        } else {
            throw new Error('Menu not found');
        }
    }

    async update(id: number, payload: Partial<MenuDTO>): Promise<Menu> {
        const menuToUpdate = await this.getById(id);
        if(menuToUpdate){
            // if(payload.items){
            //     const ids: number[] = payload.items.map(item => {
            //         return item.itemId ?? 0;
            //     });

            //     this.addItems(id, ids);
            // }
            this.repository.merge(menuToUpdate, payload);
            return await this.repository.save(menuToUpdate);  
        } else {
            throw new Error('Menu could not be updated');
        }
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }
}