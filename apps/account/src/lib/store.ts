"use client"

import { configureStore } from "@reduxjs/toolkit"
import { api } from "@/lib/api"
import uiReducer from "@/lib/slices/ui-slice"
import authReducer from "@/lib/slices/auth-slice"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ui: uiReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
