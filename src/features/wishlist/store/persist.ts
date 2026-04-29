import type { PersistConfig } from 'redux-persist';
import storage from '@/store/storage';
import type { WishlistState } from '../types';

export const wishlistPersistConfig: PersistConfig<WishlistState> = {
  key: 'wishlist',
  storage,
  whitelist: ['items'],
};
