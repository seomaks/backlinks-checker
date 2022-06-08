import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
  app: appReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;