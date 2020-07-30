import { Router, Request, Response } from 'express';

const routes = Router();

routes.post('/user', (request: Request, response: Response) => {
  const { name, email } = request.body;

  const user = {
    name,
    email,
  };

  response.json(user);
});

export default routes;
