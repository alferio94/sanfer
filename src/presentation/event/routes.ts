import { Router } from 'express';
import { EventService } from '../services/event.service';
import { EventController } from './controller';
import multer  from'multer'
import { FileUploadService } from '../services/file-upload.service';





export class EventRoutes {


  static get routes(): Router {

    const router = Router();

    const service = new EventService();
    const fileUpload = new FileUploadService();
    const controller = new EventController(service, fileUpload);
    
    // Definir las rutas
    router.post('/', controller.create) 
    router.put('/', controller.update) 
    router.get('/', controller.getEvents) 
    router.get('/:id', controller.getEvent) 
    router.post('/:type', controller.uploadImage) 



    return router;
  }


}

