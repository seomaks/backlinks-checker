import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionsType, appReducer} from './app-reducer';
import {authReducer} from "./auth-reducer";

const saveToLocalStorage = (state: AppRootStateType) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer
})

const persistedStore = loadFromLocalStorage();

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, persistedStore, applyMiddleware(thunkMiddleware));
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

// @ts-ignore
window.store = store;

