import { Router } from 'express';
import { TransportService } from '../services/transport.service';
import { TransportController } from './controller';




export class TransportationRoutes {


  static get routes(): Router {

    const router = Router();
    
    const service = new TransportService();
    const controller = new TransportController(service);

    // Definir las rutas
    router.post('/', controller.create);
    router.put('/', controller.update);
    router.get('/:id', controller.getAll);
    //router.get('/:id', controller.getById);
    router.delete('/:id', controller.delete);

    return router;
  }


}

