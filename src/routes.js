import { Router } from 'express';

const routes = new Router();

routes.post('/users', (req, res) => res.json({ id: 1 }));

export default routes;
