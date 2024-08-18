import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userAdminSlice from "./slices/userAdminSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
};

const pReducer = persistReducer(
  persistConfig,
  combineReducers({
    userReducer: userAdminSlice,
  })
);

const store = configureStore({
  reducer: pReducer,
});
export default store;
export const persistor = persistStore(store);
