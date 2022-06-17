import { createReducer } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
import { filterContact } from './contacts-actions';

// const items = createReducer([], {
//   [addContact]: (state, { payload }) => [...state, payload],
//   [deleteContact]: (state, { payload }) =>
//     state.filter(({ id }) => id !== payload),
// });

export const filter = createReducer('', {
  [filterContact]: (_, { payload }) => payload,
});

// export default combineReducers({
//   items,
//   filter,
// });
