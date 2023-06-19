import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { shazamCoreApiMain } from "./services/shazamCore";

export const store = configureStore(
  {
    reducer: {
      [shazamCoreApiMain.reducerPath]: shazamCoreApiMain.reducer,
      player: playerReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(shazamCoreApiMain.middleware),
  },
);
