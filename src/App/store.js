import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import songReducer from '@/features/Song/SongSlice';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const songPersistConfig = {
    ...persistCommonConfig,
    key: 'song',
    whitelist: ['index', 'playlist', 'linkSong'],
};

export const store = configureStore({
    reducer: {
        song: persistReducer(songPersistConfig, songReducer),
    },
    middleware: [thunk],
});

export const persistor = persistStore(store);
