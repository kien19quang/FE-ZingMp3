import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSong } from '@/services/SongService';

let initialState = {
    index: 0,
    playlist: [],
    linkSong: {},
    play: false,
};

export const fetchSong = createAsyncThunk('song/getSong', async (songId) => {
    let response = {};
    if (songId) {
        response = await getSong(songId);
    }
    return response.data;
});

export const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        updateIndex: (state, action) => {
            return { ...state, index: action.payload };
        },

        updatePlaylist: (state, action) => {
            return { ...state, playlist: [...action.payload] };
        },

        updatePlay: (state, action) => {
            return { ...state, play: action.payload };
        },

        updateLinkSong: (state, action) => {
            return { ...state, linkSong: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSong.fulfilled, (state, action) => {
            return { ...state, linkSong: action.payload };
        });
        builder.addCase(fetchSong.rejected, (state, action) => {
            return { ...state, linkSong: {} };
        });
    },
});

export const { updateIndex, updatePlaylist, updatePlay, updateLinkSong } = songSlice.actions;

export default songSlice.reducer;
