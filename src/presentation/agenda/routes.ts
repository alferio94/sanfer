import { Router } from 'express';
import { AgendaController } from './controller';




export class AgendaRoutes {


  static get routes(): Router {

    const router = Router();
    const controller = new AgendaController();
    // Definir las rutas
    router.post('/', controller.create );
    router.get('/:id', controller.getByEvent );
    router.get('/app/:id', controller.getByEventApp );
    router.put('/', controller.update );
    router.delete('/:id', controller.delete );



    return router;
  }


}

