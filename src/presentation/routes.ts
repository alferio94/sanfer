import { Router } from 'express';
import { EventRoutes, GroupsRoutes, UserRoutes } from '.';





export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/groups', GroupsRoutes.routes  );
    router.use('/api/events', EventRoutes.routes  );
    router.use('/api/users', UserRoutes.routes  );



    return router;
  }


}

