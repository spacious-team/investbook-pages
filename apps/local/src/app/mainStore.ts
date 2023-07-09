import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './examples/redux-component/redux-example.state';

const store = configureStore({
  reducer: { counter: counterReducer },
});

export default store;
