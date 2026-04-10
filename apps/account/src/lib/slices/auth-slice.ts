"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const SESSION_KEY = "tobiira_access_token"

function readToken(): string | null {
  try {
    return sessionStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
}

function writeToken(token: string | null) {
  try {
    if (token) sessionStorage.setItem(SESSION_KEY, token)
    else sessionStorage.removeItem(SESSION_KEY)
  } catch {}
}

type AuthState = {
  accessToken: string | null
}

const initialState: AuthState = {
  accessToken: readToken(),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload
      writeToken(action.payload)
    },
    sessionExpired(state) {
      state.accessToken = null
      writeToken(null)
    },
  },
})

export const { setAccessToken, sessionExpired } = authSlice.actions
export default authSlice.reducer
