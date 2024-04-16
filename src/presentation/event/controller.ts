import { Request, Response } from "express";
import {CreateEventDto, CustomError, UpdateEventDto } from "../../domain";
import { EventService } from "../services/event.service";
import { UploadedFile } from "express-fileupload";
import { FileUploadService } from "../services/file-upload.service";

export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly uploadFile: FileUploadService
  ) {}

  private handleError = (error: any, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };

  create =  (req:Request, res:Response) =>{
    const [error, createEventDto] = CreateEventDto.create(req.body);
    if(error) return res.status(400).json({error})
    this.eventService.createEvent(createEventDto!)
    .then(event => res.status(201).json(event))
    .catch(error => this.handleError(error, res)) 

  }
  update =  (req:Request, res:Response) =>{
     const [error, updatEventDto] = UpdateEventDto.create(JSON.parse(req.body.event));
    if(error) return res.status(400).json({error})
    this.eventService.updateEvent(updatEventDto!)
    .then(event => res.status(202).json(event))
    .catch(error => this.handleError(error, res)) 
  }
  getEvents =  (req:Request, res:Response) =>{
    this.eventService.getAll()
    .then(events => res.json(events))
    .catch(error => this.handleError(error, res)) 
  }
  getEvent =  (req:Request, res:Response) =>{
    const id = req.params.id
    this.eventService.getEvent(id)
    .then(events => res.json(events))
    .catch(error => this.handleError(error, res)) 
  }
  uploadImage = (req:Request, res:Response) =>{
    const type = req.params.type
    const event = JSON.parse(req.body.event);
    if(!req.files || Object.keys(req.files).length === 0 ){
      return res.status(400).json({error: 'No hay archivos cargados'});
    }
    const file = req.files.file as UploadedFile;
    this.uploadFile.uploadSingle(file, type, undefined, event.id)
    .then(uploaded => {
      this.eventService.getEvent(event.id)
      .then((event:any) =>{
          if(event) event[type] = uploaded
          this.eventService.updateEvent(event)
          .then(eventUpdated => res.json(eventUpdated));
      })
    })
    .catch(error => this.handleError(error, res)) 
  }
}
