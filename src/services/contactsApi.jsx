import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62ac950e402135c7acb4cacf.mockapi.io/',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContactsApi: builder.query({
      query: () => `contacts`,
    }),
  }),
});

export const { useGetContactsApiQuery } = contactsApi;
