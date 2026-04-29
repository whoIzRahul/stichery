import type { PersistConfig } from 'redux-persist';
import storage from '@/store/storage';
import type { CartState } from '../types';

export const cartPersistConfig: PersistConfig<CartState> = {
  key: 'cart',
  storage,
  whitelist: ['items'],
};
