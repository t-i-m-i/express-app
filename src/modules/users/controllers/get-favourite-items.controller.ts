import type { Request, Response } from 'express';
import { items, favourites } from '../../../db/store.js';
import type { FavouriteItem } from '../schemas/favourite-items.schema.js';

// Fastify: (request: AuthenticatedRequest, reply: FastifyReply)
// Express: (req: Request, res: Response). Same idea, different names.
export async function getFavouriteItemsController(req: Request, res: Response) {
  const userId = req.user!.id; // auth middleware ran earlier and set this

  const data: FavouriteItem[] = favourites
    .filter(f => f.userId === userId)
    .flatMap(f => {
      const item = items.find(i => i.id === f.itemId);
      return item
        ? [{ id: f.id, itemId: item.id, title: item.title, priceLow: item.priceLow, priceHigh: item.priceHigh, categories: item.categories, createdAt: f.createdAt }]
        : [];
    })
    .reverse(); // newest first, like ORDER BY created_at DESC

  res.status(200).json({ data });
}
