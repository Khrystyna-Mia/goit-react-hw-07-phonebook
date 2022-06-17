import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from 'services/contactsApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { filter } from '../redux/contacts/contacts-reducer';

export const store = configureStore({
  reducer: {
    filter,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

setupListeners(store.dispatch);
