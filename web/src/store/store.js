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
import UserSlice from "./userSlice/user.Slice.js";

const rootReducer = combineReducers({
  CanvasSlice: CanvasSlice,
  EquipmentSlice: EquipmentSlice,
  user: UserSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["EquipmentSlice", "CanvasSlice"],
  blacklist: ["UserSlice"],
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
