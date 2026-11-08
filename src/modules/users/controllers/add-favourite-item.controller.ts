import type { Request, Response } from 'express';
import { items, favourites, newFavouriteId } from '../../../db/store.js';
import type { AddFavouriteItemBody } from '../schemas/favourite-items.schema.js';

export async function addFavouriteItemController(req: Request, res: Response) {
  const userId = req.user!.id;
  // validateBody() already ran in the route, so this cast is safe.
  // (Fastify infers the type from the route schema; Express can't, so we state it.)
  const { itemId } = req.body as AddFavouriteItemBody;

  if (!items.some(i => i.id === itemId)) {
    res.status(400).json({ error: 'Invalid item ID' });
    return;
  }

  if (favourites.some(f => f.userId === userId && f.itemId === itemId)) {
    res.status(409).json({ error: 'Item is already in favourites' });
    return;
  }

  favourites.push({ id: newFavouriteId(), userId, itemId, createdAt: new Date().toISOString() });
  res.status(201).json({});
}
