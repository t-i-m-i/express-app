import type { Request, Response } from 'express';
import { favourites } from '../../../db/store.js';
import type { RemoveFavouriteItemBody } from '../schemas/favourite-items.schema.js';

export async function removeFavouriteItemController(req: Request, res: Response) {
  const userId = req.user!.id;
  const { itemId } = req.body as RemoveFavouriteItemBody;

  const index = favourites.findIndex(f => f.userId === userId && f.itemId === itemId);
  if (index === -1) {
    res.status(404).json({ error: 'Item not found in favourites' });
    return;
  }

  favourites.splice(index, 1);
  res.status(200).json({ success: true, message: 'Item removed from favourites' });
}
