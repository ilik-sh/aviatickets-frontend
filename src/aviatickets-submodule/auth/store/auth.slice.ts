import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth.state";
import {
  forgotPassword,
  signIn,
  signUp,
  resetPassword,
  verifyCode,
} from "aviatickets-submodule/auth/store/auth.actions";
import { LocalStorageKeys } from "enums/local-storage-keys.enum";

const initialState: AuthState = {
  isAuth: !!localStorage.getItem(LocalStorageKeys.AccessToken),
  isPending: {
    isAuth: false,
  },
  errors: {
    isAuth: null,
  },
  id: "",
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isAuth = true;
        state.name =
          action.payload.user.firstName + " " + action.payload.user.firstName;
        state.id = action.payload.user.id;
        state.isPending.isAuth = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.error.message || null;
      })
      .addCase(signUp.pending, (state, action) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isAuth = true;
        state.name =
          action.payload.user.firstName + " " + action.payload.user.firstName;
        state.id = action.payload.user.id;
        state.isPending.isAuth = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.error.message || null;
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isPending.isAuth = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.error.message || null;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isPending.isAuth = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.error.message || null;
      })
      .addCase(verifyCode.pending, (state, action) => {
        state.isPending.isAuth = true;
        state.errors.isAuth = null;
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isPending.isAuth = false;
      })
      .addCase(verifyCode.rejected, (state, action) => {
        state.isPending.isAuth = false;
        state.errors.isAuth = action.error.message || null;
      });
  },
});

export const authReducer = authSlice.reducer;
