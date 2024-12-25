import { combineReducers, configureStore } from '@reduxjs/toolkit'
import settingReducer from './slices/settingSlice'
import authReducer from './slices/authSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const rootPersistConfig = {
    key: 'apm',
    storage,
}

const rootReducer = combineReducers({
    setting: settingReducer,
    auth: authReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
})

export const persistor = persistStore(store)

export type IRootState = ReturnType<typeof rootReducer>
