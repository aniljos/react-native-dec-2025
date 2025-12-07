import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  isAuthenticated: boolean;
  userName: string;
  accessToken: string;
  refreshToken: string;
};

const initialState: AuthState = {
  isAuthenticated: false,
  userName: "",
  accessToken: "",
  refreshToken: "",
};

type SetAuthPayload = {
  userName: string;
  accessToken: string;
  refreshToken: string;
  isAuthenticated?: boolean;
};

type UpdateTokensPayload = Partial<Pick<AuthState, "accessToken" | "refreshToken">>;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<SetAuthPayload>) => {
      state.isAuthenticated = action.payload.isAuthenticated ?? true;
      state.userName = action.payload.userName;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    updateTokens: (state, action: PayloadAction<UpdateTokensPayload>) => {
      state.accessToken = action.payload.accessToken ?? state.accessToken;
      state.refreshToken = action.payload.refreshToken ?? state.refreshToken;
      if (state.accessToken || state.refreshToken) {
        state.isAuthenticated = true;
      }
    },
    clearAuth: () => initialState,
  },
});

export const { setAuth, updateTokens, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
