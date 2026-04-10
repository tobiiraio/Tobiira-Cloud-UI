"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type UiState = {
  selectedOrganizationId: string | null
  isFabOpen: boolean
}

const initialState: UiState = {
  selectedOrganizationId: null,
  isFabOpen: false,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedOrganizationId(state, action: PayloadAction<string | null>) {
      state.selectedOrganizationId = action.payload
    },
    setFabOpen(state, action: PayloadAction<boolean>) {
      state.isFabOpen = action.payload
    },
  },
})

export const { setSelectedOrganizationId, setFabOpen } = uiSlice.actions
export default uiSlice.reducer
