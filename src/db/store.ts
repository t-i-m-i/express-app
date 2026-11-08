// Stand-in for a database connection so the app runs with zero setup.
// In a real app, controllers would run queries instead of touching these arrays.

export interface Item {
  id: number;
  title: string;
  priceLow: number;
  priceHigh: number;
  categories: { id: number; name: string }[];
}

export interface Favourite {
  id: number;
  userId: string;
  itemId: number;
  createdAt: string;
}

export const items: Item[] = [
  { id: 1, title: 'Volkswagen Golf', priceLow: 12000, priceHigh: 32000, categories: [{ id: 1, name: 'Hatchback' }] },
  { id: 2, title: 'Toyota RAV4', priceLow: 28000, priceHigh: 45000, categories: [{ id: 2, name: 'SUV' }] },
  { id: 3, title: 'Ford Focus', priceLow: 9000, priceHigh: 24000, categories: [{ id: 1, name: 'Hatchback' }] },
];

export const favourites: Favourite[] = [];

let nextFavouriteId = 1;
export const newFavouriteId = () => nextFavouriteId++;
