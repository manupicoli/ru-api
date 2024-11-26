import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { MenuItems } from "./menuItens";

@Entity()
export class Menu{
    @PrimaryGeneratedColumn()
    menuId?: number

    @Column()
    availableDate?: Date

    @Column()
    mealTime?: string

    @ManyToMany(() => MenuItems, (items) => items.menus, { onDelete: "CASCADE" })
    @JoinTable()
    items?: MenuItems[]

    constructor(
        menuId?: number,
        availableDate?: Date,
        mealTime?: string,
        items?: MenuItems[]
    ) {
        this.menuId = menuId,
        this.availableDate = availableDate,
        this.mealTime = mealTime,
        this.items = items
    }
}