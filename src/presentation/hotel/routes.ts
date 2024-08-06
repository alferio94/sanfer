import { Router } from 'express';
import { HotelService } from '../services/hotel.service';
import { HotelController } from './controller';
import { FileUploadService } from '../services/file-upload.service';




export class HotelRoutes {


  static get routes(): Router {

    const router = Router();
    
    const service = new HotelService();
    const fileUpload = new FileUploadService();
    const controller = new HotelController(service, fileUpload)
    
    // Definir las rutas
    router.post('/', controller.create );
    router.post('/:id', controller.uploadImage );
    router.get('/:id', controller.getAll );
    router.put('/', controller.update );
    router.delete('/:id', controller.delete )


    return router;
  }


}

