import {
  isStatusAC,
  IsStatusActionType, setAppErrorAC,
  SetAppErrorActionType
} from "./app-reducer";
import {AppThunkType} from "./store";

const initialState = {
  isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType): AppThunkType => dispatch => {
  dispatch(isStatusAC('loading'))
  const AUTH_EMAIL = process.env.REACT_APP_AUTH_EMAIL
  const AUTH_PASS = process.env.REACT_APP_AUTH_PASS

  if (data.email === AUTH_EMAIL && data.password === AUTH_PASS) {
    dispatch(setIsLoggedInAC(true))
    dispatch(isStatusAC('idle'))
  }
  if (data.email !== AUTH_EMAIL || data.password !== AUTH_PASS) {
    dispatch(setAppErrorAC('Wrong e-mail or password'))
    dispatch(isStatusAC('idle'))
  }
}

// types
export type LoginParamsType = {
  email: string
  password: string
}

export type AuthActionsType =
  ReturnType<typeof setIsLoggedInAC>
  | IsStatusActionType
  | SetAppErrorActionType

