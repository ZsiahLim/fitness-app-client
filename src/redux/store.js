import { configureStore, combineReducers } from '@reduxjs/toolkit'
import UserReducer from './userSlice'
import ContactReducer from './ContactsSlice'
import ConversationReducer from './ConversationSlice'
import BlogReducer from './BlogSlice'
import SessionReducer from './SessionSlice'
import RecordReducer from './RecordSlice'
import CalendarReducer from './CalendarSlice'
import NotificationReducer from './NotificationSettingSlice'
import MeasurementsReducer from './MeasurementSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    user: UserReducer,
    contact: ContactReducer,
    conversation: ConversationReducer,
    blog: BlogReducer,
    session: SessionReducer,
    calendar: CalendarReducer,
    notificationTab: NotificationReducer,
    record: RecordReducer,
    measurement: MeasurementsReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export const persistor = persistStore(store)
