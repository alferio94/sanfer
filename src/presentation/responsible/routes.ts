import { Router } from 'express';
import { ResponsibleController } from './controller';
import { ResponsibleService } from '../services/responsible.service';




export class ResponsibleRoutes {


  static get routes(): Router {

    const router = Router();
    const service = new ResponsibleService()
    const controller = new ResponsibleController(service)
    
    // Definir las rutas
    router.post('/', controller.create);
    router.put('/', controller.update);
    router.get('/:id', controller.getAll);
    router.delete('/:id', controller.delete);



    return router;
  }


}

