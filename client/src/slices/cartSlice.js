import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios.js';

const local = JSON.parse(localStorage.getItem('cart') || '[]');

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { getState }) => {
  const user = getState().auth.user;
  if (!user) return { items: local };
  const { data } = await api.get('/cart');
  return data;
});

export const addToCart = createAsyncThunk('cart/add', async ({ productId, qty }, { getState }) => {
  const user = getState().auth.user;
  if (!user) {
    // Anonymous cart
    return { local: { productId, qty } };
  }
  const { data } = await api.post('/cart', { productId, qty });
  return data;
});

export const updateCartItem = createAsyncThunk('cart/update', async ({ productId, qty }, { getState }) => {
  const user = getState().auth.user;
  if (!user) {
    return { localUpdate: { productId, qty } };
  }
  const { data } = await api.put(`/cart/${productId}`, { qty });
  return data;
});

export const removeCartItem = createAsyncThunk('cart/remove', async ({ productId }, { getState }) => {
  const user = getState().auth.user;
  if (!user) {
    return { localRemove: { productId } };
  }
  const { data } = await api.delete(`/cart/${productId}`);
  return data;
});

const slice = createSlice({
  name: 'cart',
  initialState: { items: local, status: 'idle' },
  reducers: {
    replaceLocal(state, action) { state.items = action.payload; }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (action.payload.items) state.items = action.payload.items;
        else state.items = action.payload;
        localStorage.setItem('cart', JSON.stringify(state.items));
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload.local) {
          const { productId, qty } = action.payload.local;
          const idx = state.items.findIndex(i => i.product === productId || i.productId === productId);
          if (idx >= 0) state.items[idx].qty += qty;
          else state.items.push({ productId, qty });
        } else {
          state.items = action.payload.items;
        }
        localStorage.setItem('cart', JSON.stringify(state.items));
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (action.payload.localUpdate) {
          const { productId, qty } = action.payload.localUpdate;
          const idx = state.items.findIndex(i => i.product === productId || i.productId === productId);
          if (idx >= 0) state.items[idx].qty = qty;
        } else {
          state.items = action.payload.items;
        }
        localStorage.setItem('cart', JSON.stringify(state.items));
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        if (action.payload.localRemove) {
          const { productId } = action.payload.localRemove;
          state.items = state.items.filter(i => (i.product || i.productId) !== productId);
        } else {
          state.items = action.payload.items;
        }
        localStorage.setItem('cart', JSON.stringify(state.items));
      });
  }
});

export const { replaceLocal } = slice.actions;
export default slice.reducer;
