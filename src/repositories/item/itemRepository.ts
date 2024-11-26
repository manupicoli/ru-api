import { DataSource, Repository } from "typeorm";
import { MenuItems } from "../../entities/menuItens";
import { IMenuItemRepository } from "./itemRepositoryType";
import { ItemRequest } from "../../dtos/item/itemRequest";

export class ItemRepository implements IMenuItemRepository{
    private repository: Repository<MenuItems>;

    constructor(dataSource: DataSource){
        this.repository = dataSource.getRepository(MenuItems);
    }

    async create(item: ItemRequest): Promise<MenuItems> {
        const newItem = this.repository.create(item);
        return await this.repository.save(newItem);
    };

    async getById(itemId: number): Promise<MenuItems> {
        const item = await this.repository.findOneBy({ itemId });
        if(!item) {
            throw new Error('Item not found');
        }
        return item;        
    }

    async getAll(): Promise<MenuItems[]> {
        return await this.repository.find();
    }

    async updateItem(itemId: number, item: ItemRequest): Promise<MenuItems> {
        await this.repository.update(itemId, item);
        const updatedItem = await this.repository.findOneBy({ itemId });
        if (!updatedItem) {
            throw new Error('Item not found');
        }
        return updatedItem;
    }

    async deleteItem(itemId: number): Promise<boolean> {
        const result = await this.repository.delete(itemId);
        return result.affected ? result.affected > 0 : false;
    }
}