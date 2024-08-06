import { Router } from 'express';
import { SpeakerController } from './controller';
import { SpeakerService } from '../services/speaker.service';
import { FileUploadService } from '../services/file-upload.service';




export class SpeakerRoutes {


  static get routes(): Router {

    const router = Router();

    const service = new SpeakerService();
    const fileUpload = new FileUploadService();
    const controller = new SpeakerController(service, fileUpload)
    
    // Definir las rutas
    router.post('/', controller.create );
    router.post('/:id', controller.uploadImage );
    router.get('/:id', controller.getAll );
    router.put('/', controller.update );
    router.delete('/:id', controller.delete );



    return router;
  }


}

