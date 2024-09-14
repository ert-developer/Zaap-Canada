import {legacy_createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from '../CombineReducer';
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['Auth', 'favourite', 'location'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = legacy_createStore(persistedReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

const persistor = persistStore(store);

export {store, persistor};
