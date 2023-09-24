import { combineReducers, configureStore } from "@reduxjs/toolkit";
import alertStatusReducer from "./features/AlertStatus";
const reducer = combineReducers({
  alertStatus: alertStatusReducer,
});

const store = configureStore({
  reducer: reducer,
});
export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
