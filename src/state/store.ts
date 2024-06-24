import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import authReducer from './auth/authSlice';
import toastReducer from './toast/toastSlice';

const authConfig = {
  key: 'auth',
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authReducer),
    toast: toastReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
