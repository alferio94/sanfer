import { Request, Response } from "express";
import {CreateResponsibleDto, CustomError, UpdateResponsibleDto } from "../../domain";
import { ResponsibleService } from '../services/responsible.service';

export class ResponsibleController {
  constructor(
    private readonly responsibleService: ResponsibleService
  ) {}

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  create = async (req:Request, res:Response) =>{
    const [error, createResponsibleDto] = CreateResponsibleDto.create(JSON.parse(req.body.responsible));
    if(error) return res.status(400).json({error})
    this.responsibleService.create(createResponsibleDto!)
    .then(responsible => res.status(201).json(responsible))
    .catch(error => this.handleError(error, res)) 

  }
  update = async (req:Request, res:Response) =>{
    const [error, updateResponsibleDto] = UpdateResponsibleDto.create(JSON.parse(req.body.responsible));
    if(error) return res.status(400).json({error})
    this.responsibleService.update(updateResponsibleDto!)
    .then(responsible => res.status(202).json(responsible))
    .catch(error => this.handleError(error, res)) 

  }

  getAll = async (req:Request, res:Response) =>{
    const id = req.params.id;
    this.responsibleService.getAll(id)
    .then(responsibles => res.json(responsibles))
    .catch(error => this.handleError(error, res)) 
  }
  delete=(req:Request, res:Response) =>{
    const id = req.params.id;
    if(!id) return res.status(400).json({error: 'ID invalido'});
    this.responsibleService.delete(id)
    .then(responsible => res.json(responsible))
  }

}
