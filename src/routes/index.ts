import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sesseionRouter from './sessions.routes';

const routes = Router();

routes.use('/sessions', sesseionRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
