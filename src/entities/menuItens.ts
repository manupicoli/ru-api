import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./menu";

@Entity()
export class MenuItems{
    @PrimaryGeneratedColumn()
    itemId?: number

    @Column()
    name?: string

    @Column()
    description?: string

    @ManyToMany(() => Menu, (menu) => menu.items, { onDelete: "CASCADE" })
    menus?: Menu[]

    constructor(
        itemId?: number,
        name?: string,
        description?: string,
        menus?: Menu[]
    ) {
        this.itemId = itemId,
        this.name = name,
        this.description = description,
        this.menus = menus
    }
}