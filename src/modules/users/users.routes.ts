import { Router } from 'express';
import { validateBody } from '../../middleware/validate-body.js';
import { getFavouriteItemsController } from './controllers/get-favourite-items.controller.js';
import { addFavouriteItemController } from './controllers/add-favourite-item.controller.js';
import { removeFavouriteItemController } from './controllers/remove-favourite-item.controller.js';
import {
  AddFavouriteItemBodySchema,
  RemoveFavouriteItemBodySchema,
} from './schemas/favourite-items.schema.js';

// Fastify: export async function usersRoutes(app) { app.get(...) }, registered with { prefix: '/v1' }
// Express: a Router is a mini-app. server.ts mounts it with app.use('/v1', usersRouter).
export const usersRouter = Router();

// A route takes any number of functions. They run left to right, exactly like the global chain:
//   path,  middleware,  middleware,  ...,  final handler
usersRouter.get('/favourite-items', getFavouriteItemsController);

usersRouter.post(
  '/favourite-items',
  validateBody(AddFavouriteItemBodySchema), // plays the role of `{ schema: { body } }`
  addFavouriteItemController
);

usersRouter.delete(
  '/favourite-items',
  validateBody(RemoveFavouriteItemBodySchema),
  removeFavouriteItemController
);
