import { Type, type Static } from '@sinclair/typebox';

// TypeBox schemas are framework-agnostic: this file is the same as in the Fastify app,
// minus the `{ response: { 200: ... } }` wrappers. Express has no response-schema feature
// (Fastify uses it to serialize and strip fields), so only body schemas matter here.

export const FavouriteItemSchema = Type.Object({
  id: Type.Number(),
  itemId: Type.Number(),
  title: Type.String(),
  priceLow: Type.Number(),
  priceHigh: Type.Number(),
  categories: Type.Array(Type.Object({ id: Type.Number(), name: Type.String() })),
  createdAt: Type.String({ format: 'date-time' }),
});
export type FavouriteItem = Static<typeof FavouriteItemSchema>;

export const AddFavouriteItemBodySchema = Type.Object({ itemId: Type.Number() });
export type AddFavouriteItemBody = Static<typeof AddFavouriteItemBodySchema>;

export const RemoveFavouriteItemBodySchema = Type.Object({ itemId: Type.Number() });
export type RemoveFavouriteItemBody = Static<typeof RemoveFavouriteItemBodySchema>;
