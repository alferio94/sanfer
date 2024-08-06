import { Router } from 'express';
import { GroupController } from './controller';
import { GroupsService } from '../services/user-group.service';




export class GroupsRoutes {


  static get routes(): Router {

    const router = Router();
    const service = new GroupsService()
    const controller = new GroupController(service)
    // Definir las rutas
    router.post('/', controller.create );
    router.put('/', controller.update );
    router.get('/', controller.getCategories );
    router.delete('/:id', controller.delete );



    return router;
  }


}

