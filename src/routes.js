import { Router } from 'express';

// Middlewares
import AuthMiddleware from './app/middlewares/Auth';

// Controllers
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Rotas que o user não precisa estar logado
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Rotas que o user precisa estar logado
routes.use(AuthMiddleware);

routes.put('/users', UserController.update);
routes.delete('/users', UserController.destroy);

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.list);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.detroy);

routes.get('/plans', PlanController.list);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.destroy);

export default routes;
