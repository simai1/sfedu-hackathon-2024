import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import CanvasSlice from "./CanvasSlice/canvas.Slice.js";
import EquipmentSlice from "./basicSlice/basic.Slice.js";

const rootReducer = combineReducers({
  CanvasSlice: CanvasSlice,
  EquipmentSlice: EquipmentSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["EquipmentSlice", "CanvasSlice"],
  // blacklist: ["CanvasSlice"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
