import { Request, Response } from "express";
import { IMenuItemService } from "../services/item/itemServiceType";
import { ItemRequest } from "../dtos/item/itemRequest";

export class ItemController{
    private itemsService: IMenuItemService;

    constructor(itensService: IMenuItemService){
        this.itemsService = itensService;
    }

    create = async(req: Request, res: Response): Promise<void> => {
        try{
            const payload: ItemRequest = req.body;
            const newItem = await this.itemsService.create(payload);
            res.status(201).json({message: "Item created", newItem});
        }catch(error){
            console.log(error);
            res.status(500).json({ message: "Internal Server Error"});
        }
    }

    getById = async(req: Request, res: Response): Promise<void> => {
        try{
            const itemId = parseInt(req.params.itemId);
            const item = await this.itemsService.getById(itemId);
            item ? res.status(200).json(item) : res.status(404).json({message: 'Item not found'});
        }catch(error){
            console.log(error);
            res.status(500).json({ message: "Internal Server Error"});
        }
    }

    update = async(req: Request, res: Response): Promise<void> => {
        try{
            const itemId = parseInt(req.params.itemId);
            const payload: ItemRequest = req.body;
            const updatedItem = await this.itemsService.updateItem(itemId, payload);
            updatedItem ? res.status(200).json({message: "Item updated", updatedItem}) : res.status(404).json({message: 'Item not found'});
        }catch(error){
            console.log(error);
            res.status(500).json({ message: "Internal Server Error"});
        }
    }

    delete = async(req: Request, res: Response): Promise<void> => {
        try{
            const itemId = parseInt(req.params.itemId);
            const deleted = await this.itemsService.deleteItem(itemId);
            deleted ? res.status(200).json({message: "Item deleted"}) : res.status(404).json({message: 'Item not found'});
        }catch(error){
            console.log(error);
            res.status(500).json({ message: "Internal Server Error"});
        }
    }

    getAll = async(req: Request, res: Response): Promise<void> => {
        try{
            const items = await this.itemsService.getAll();
            res.status(200).json(items);
        }catch(error){
            console.log(error);
            res.status(500).json({ message: "Internal Server Error"});
        }
    }
}