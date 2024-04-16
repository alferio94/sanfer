import { Router } from 'express';
import { UserService } from '../services/user.service';
import { UserController } from './controller';




export class UserRoutes {


  static get routes(): Router {

    const router = Router();
    const service = new UserService()
    const controller = new UserController(service)

    
    // Definir las rutas
    router.post('/',  controller.create);
    router.put('/',  controller.update);
    router.get('/',  controller.getUsers);
    router.post('/csv',  controller.createFromCsv);



    return router;
  }


}

