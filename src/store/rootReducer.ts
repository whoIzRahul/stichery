import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { cartPersistConfig, cartReducer } from '@/features/cart/store';
import { countPersistConfig, counterReducer as countReducer } from '@/features/counter/store';
import { wishlistPersistConfig, wishlistReducer } from '@/features/wishlist/store';

export const rootReducer = combineReducers({
  count: persistReducer(countPersistConfig, countReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  wishlist: persistReducer(wishlistPersistConfig, wishlistReducer),
});

export type RootState = ReturnType<typeof rootReducer>;
