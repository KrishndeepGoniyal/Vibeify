import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { playlistService } from "../services/playlistService";


export const fetchPlaylist = createAsyncThunk(
  "playlist/fetchPlaylist",
  async (userId) => {
    const songs = await playlistService.getPlaylist(userId);
    return songs; 
  }
);



export const addToPlaylist = createAsyncThunk(
  "playlist/addToPlaylist",
  async ({ songId, userId }) => {
    await playlistService.addSongToPlaylist(songId, userId);
    return songId;
  }
);


export const removeFromPlaylist = createAsyncThunk(
  "playlist/removeFromPlaylist",
  async ({ songId, userId }) => {
    await playlistService.removeSongFromPlaylist(songId, userId);
    return songId;
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload;
      })
      .addCase(fetchPlaylist.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addToPlaylist.fulfilled, (state, action) => {
        if (!state.playlist.includes(action.payload)) {
          state.playlist.push(action.payload);
        }
      })
      .addCase(removeFromPlaylist.fulfilled, (state, action) => {
        state.playlist = state.playlist.filter(id => id !== action.payload);
      });
  },
});

export default playlistSlice.reducer;
