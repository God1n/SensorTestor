import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiService from '../../services/apiService';
import {fireToast} from '../toast/toastSlice';

type AccessToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};

const apiService = new ApiService();
interface AuthState {
  isAuthenticated: boolean;
  user:
    | {
        id: string;
        sso_user_id: string;
        first_name: string;
        last_name: string;
        profile_pic: string;
        created_at: number;
        created_by: string;
        last_updated_at: number;
        last_updated_by: string;
      }
    | undefined;
  loading: boolean;
  tokens: {accessToken: string | undefined; refreshToken: string | undefined};
  error: string | undefined;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  loading: false,
  tokens: {accessToken: undefined, refreshToken: undefined},
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: state => {
      state.isAuthenticated = false;
      state.user = undefined;
      state.loading = false;
      state.tokens = {accessToken: undefined, refreshToken: undefined};
      state.error = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserInfo.pending, state => {
        state.user = undefined;
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.user = undefined;
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(userLogin.pending, state => {
        state.loading = true;
        state.isAuthenticated = false;
        state.error = undefined;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        apiService.updateTokens(
          action.payload.access_token,
          action.payload.refresh_token,
        );
        state.tokens = {
          accessToken: action.payload.access_token,
          refreshToken: action.payload.refresh_token,
        };
        state.loading = false;
        state.isAuthenticated = true;
        state.error = undefined;
      })
      .addCase(userLogin.rejected, (state, error) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = error.error.message;
      });
  },
});

export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async (code: string, {dispatch}) => {
    try {
      const response: AccessToken = await apiService.post(
        '/generator/auth/sso/google',
        {
          code,
        },
      );
      fireToast(
        {
          title: 'Success',
          message: 'You have successfully logged in.',
          type: 'success',
        },
        dispatch,
      );
      return response;
    } catch (error) {
      fireToast(
        {
          title: 'Error',
          message: 'Login failed. Please check and try again.',
          type: 'error',
        },
        dispatch,
      );
      throw new Error('Authentication with google sso failed');
    }
  },
);

export const fetchUserInfo = createAsyncThunk(
  'home/fetchUserInfo',
  async (_state, {dispatch}) => {
    try {
      const user = (await apiService.get(
        '/generator/userinfo',
      )) as AuthState['user'];
      if (user) {
        return user;
      } else {
        fireToast(
          {
            title: 'Error',
            message: 'Please reload the page and try again.',
            type: 'error',
          },
          dispatch,
        );
        throw new Error('No business categories found');
      }
    } catch (error) {
      fireToast(
        {
          title: 'Error',
          message: 'Please reload the page and try again.',
          type: 'error',
        },
        dispatch,
      );
      throw new Error('No business categories found');
    }
  },
);

export const {logOut} = authSlice.actions;
export default authSlice.reducer;
