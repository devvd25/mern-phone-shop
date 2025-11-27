import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios.js';

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  const { data } = await api.get('/auth/me');
  return data;
});

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', payload);
    return data;
  } catch (e) {
    return rejectWithValue(e.response?.data || { message: 'Lỗi đăng nhập' });
  }
});

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/register', payload);
    return data;
  } catch (e) {
    return rejectWithValue(e.response?.data || { message: 'Lỗi đăng ký' });
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await api.post('/auth/logout');
});

// 💡 thunk mới: cập nhật hồ sơ (tên, email, mật khẩu, địa chỉ)
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.put('/auth/me', payload);
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data || { message: 'Cập nhật hồ sơ thất bại' });
    }
  }
);

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
    profileError: null,
    profileSuccess: false,
  },
  reducers: {
    clearProfileStatus(state) {
      state.profileError = null;
      state.profileSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload?.message || 'Đăng nhập thất bại';
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload?.message || 'Đăng ký thất bại';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      // ✅ xử lý updateProfile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.profileError = null;
        state.profileSuccess = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profileError =
          action.payload?.message || 'Cập nhật hồ sơ thất bại';
        state.profileSuccess = false;
      });
  },
});

export const { clearProfileStatus } = slice.actions;
export default slice.reducer;
