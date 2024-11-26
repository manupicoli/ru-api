import { Request, Response } from "express";
import { IMenuService } from "../services/menu/menuServiceType";
import { MenuRequest } from "../dtos/menu/menuRequest";

export class MenuController{
    private menuService: IMenuService;

    constructor(menuService: IMenuService){
        this.menuService = menuService;
    }

    create = async(req: Request, res: Response): Promise<void> => {
        try{
            const payload: MenuRequest = req.body;
            const newMenu = await this.menuService.create(payload);
            res.status(201).json({message: "Menu created", newMenu});
        }catch(error){
            console.log(error);
            res.status(500).json({ message: "Internal Server Error"});
        }
    }

    listWeekMenus = async(req: Request, res: Response): Promise<void> => {
        try{
            const menus = await this.menuService.listWeekMenu();
            menus ? res.status(200).json(menus) : res.status(404).json({message: 'No menu for this week yet'});
        } catch(error){
            res.status(500).json({ message: "Internal Server Error"});
        }
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const menus = await this.menuService.getAll();
            menus ? res.status(200).json(menus) : res.status(404).json({ message: 'No menus found' });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" }); 
        }
    }

    getById = async(req: Request, res: Response): Promise<void> => {
        try{
            const menuId = parseInt(req.params.menuId);
            const menu = await this.menuService.getById(menuId);
            menu ? res.status(200).json(menu) : res.status(404).json({message: 'Menu not found'});
        } catch(error){
            res.status(500).json({ message: "Internal Server Error"});
        }
    }

    addItem = async(req: Request, res: Response): Promise<void> => {
        try{
            const menuId: number = parseInt(req.params.menuId);
            const itemId: number[] = req.body;

            await this.menuService.addItemsToMenu(menuId, itemId);
            res.status(201).json({message: "Items added"});
        } catch(error){
            console.log(error);
            res.status(500).json({ message: "Internal Server Error"});
        }
    }

    deleteItem = async(req: Request, res: Response): Promise<void> => {
        try{
            const menuId = parseInt(req.params.menuId);
            const itemId = req.body.itemId;
            await this.menuService.deleteItem(menuId, itemId);
            res.status(204).json({ message: 'Item deleted'});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    update = async(req: Request, res: Response): Promise<void> => {
        try{
            const menuId = parseInt(req.params.menuId);
            const payload = req.body;
            const updatedMenu = await this.menuService.update(menuId, payload);
            updatedMenu ? res.status(200).json(updatedMenu) : res.status(404).json({message: "Menu not found"});
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    delete = async(req: Request, res: Response): Promise<void> => {
        try{
            const menuId = parseInt(req.params.menuId);
            const deleteMenu = await this.menuService.delete(menuId);
            deleteMenu ? res.status(204).json({ message: 'Menu deleted'}) : res.status(404).json({ message: 'Menu not found'});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}