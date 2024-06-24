import {ThunkDispatch, UnknownAction, createSlice} from '@reduxjs/toolkit';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastProps = {
  title: string;
  message: string;
  type: ToastType;
  count?: number;
  id?: string;
};

interface ToastState {
  toasts: ToastProps[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: {payload: ToastProps; type: string}) => {
      if (state.toasts.length > 0) {
        const toast = state.toasts.find(
          item =>
            item.title === action.payload.title &&
            item.message === action.payload.message &&
            item.type === action.payload.type,
        );
        if (toast) {
          toast.count = toast.count ? toast.count + 1 : 2;
          const _index = state.toasts.findIndex(
            item =>
              item.title === action.payload.title &&
              item.message === action.payload.message &&
              item.type === action.payload.type,
          );
          state.toasts[_index] = toast;
        } else {
          state.toasts.push({...action.payload, count: 1});
        }
      } else {
        state.toasts.push({...action.payload, count: 1});
      }
    },
    removeToast: (state, action: {payload: ToastProps; type: string}) => {
      state.toasts = state.toasts.filter(item => item.id !== action.payload.id);
    },
  },
});

export const fireToast = (
  message: {
    title: string;
    message: string;
    type: ToastType;
  },
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
) => {
  const _id = Math.random().toString(36);
  dispatch(
    addToast({
      title: message.title,
      message: message.message,
      type: message.type,
      id: _id,
    }),
  );
  setTimeout(() => {
    dispatch(
      removeToast({
        title: message.title,
        message: message.message,
        type: message.type,
        id: _id,
      }),
    );
  }, 5000);
};

export const {addToast, removeToast} = toastSlice.actions;
export default toastSlice.reducer;
