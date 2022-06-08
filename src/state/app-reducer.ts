import {Dispatch} from "redux";
import {getStatusAPI} from "../api/status-code-api";

const initialState = {
  project: 'mightytips.com',
  link: '',
  statusCode: 0
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-PROJECT':
      return {...state, project: action.project}
    case 'APP/SET-LINK':
      return {...state, link: action.link}
    case 'APP/SET-STATUS-CODE':
      return {...state, statusCode: action.statusCode}
    default:
      return state
  }
}

// actions
export const setProjectAC = (project: string) => ({type: 'APP/SET-PROJECT', project} as const)
export const setLinkAC = (link: string) => ({type: 'APP/SET-LINK', link} as const)
export const setStatusCodeAC = (statusCode: number) => ({type: 'APP/SET-STATUS-CODE', statusCode} as const)

// thunks
export const statusCodeTC = (link: string) => async (dispatch: Dispatch) => {
  const res = await getStatusAPI.getRequest(link)
    .then(result => {
      return result
    })
  dispatch(setStatusCodeAC(res.status))
}



// types
export type SetProjectActionType = ReturnType<typeof setProjectAC>
export type SetLinkActionType = ReturnType<typeof setLinkAC>
export type SetStatusCodeActionType = ReturnType<typeof setStatusCodeAC>
export type AppActionsType = SetStatusCodeActionType | SetLinkActionType | SetProjectActionType

