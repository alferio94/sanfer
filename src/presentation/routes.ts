import { Router } from 'express';
import { AgendaRoutes, EventRoutes, GroupsRoutes, HotelRoutes, ResponsibleRoutes, SpeakerRoutes, TransportationRoutes, UserRoutes } from '.';





export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/groups', GroupsRoutes.routes  );
    router.use('/api/events', EventRoutes.routes  );
    router.use('/api/users', UserRoutes.routes  );
    router.use('/api/responsible', ResponsibleRoutes.routes  );
    router.use('/api/agenda', AgendaRoutes.routes);
    router.use('/api/speaker', SpeakerRoutes.routes);
    router.use('/api/user', UserRoutes.routes);
    router.use('/api/transport', TransportationRoutes.routes);
    router.use('/api/hotel', HotelRoutes.routes);



    return router;
  }


}

