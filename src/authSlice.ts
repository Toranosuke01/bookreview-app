import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const initialState = {
  isSignIn: cookie.get("token") !== undefined,
  iconSubmitted: cookie.get("iconUrl") !== undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state) => {
      state.isSignIn = true;
    },
    signOut: (state) => {
      state.isSignIn = false;
      state.iconSubmitted = false;
    },
    setIcon: (state) => {
      state.iconSubmitted = true;
    },
  },
});

export const { signIn, signOut, setIcon } = authSlice.actions;

export {};
