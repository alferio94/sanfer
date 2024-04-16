import { CreateGroupDto } from './../../domain/dtos/user-group/create-group.dto';
import { Request, Response } from "express";
import {CustomError, UpdateGroupDto } from "../../domain";
import { GroupsService } from "../services/user-group.service";

export class GroupController {
  constructor(
    private readonly groupService: GroupsService
  ) {}

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  create = async (req:Request, res:Response) =>{
    const [error, createGroupDto] = CreateGroupDto.create(req.body);
    if(error) return res.status(400).json({error})
    this.groupService.createGroup(createGroupDto!)
    .then(group => res.status(201).json(group))
    .catch(error => this.handleError(error, res)) 

  }
  update = async (req:Request, res:Response) =>{
    const [error, updateGroupDto] = UpdateGroupDto.create(req.body);
    if(error) return res.status(400).json({error})
    this.groupService.updateGroup(updateGroupDto!)
    .then(group => res.status(202).json(group))
    .catch(error => this.handleError(error, res)) 

  }

  getCategories = async (req:Request, res:Response) =>{
    this.groupService.getAll()
    .then(groups => res.json(groups))
    .catch(error => this.handleError(error, res)) 
  }

}
