import storage from "redux-persist/lib/storage";
import userAdminSlice from "./slices/userAdminSlice";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PERSISTCONFIG_KEY } from "../utils/settings/apiKey";

const persistConfig = {
  key: PERSISTCONFIG_KEY,
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
