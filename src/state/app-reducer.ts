import {Dispatch} from "redux";
import {getStatusAPI} from "../api/status-code-api";

const initialState = {
  project: 'mightytips.com',
  links: [] as linksType,
  statusCodes: [] as statusCodesType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-PROJECT':
      return {...state, project: action.project}
    case 'APP/SET-LINKS':
      return {...state, links: [...action.links]}
    case 'APP/SET-STATUS-CODE':
      return {...state, statusCodes: [...action.statusCodes]}
    default:
      return state
  }
}

// actions
export const setProjectAC = (project: string) => ({
  type: 'APP/SET-PROJECT',
  project
} as const)
export const setLinksAC = (links: linksType) => ({
  type: 'APP/SET-LINKS',
  links
} as const)
export const setStatusCodeAC = (statusCodes: statusCodesType) => ({
  type: 'APP/SET-STATUS-CODE',
  statusCodes
} as const)

// thunks
export const statusCodeTC = (links: linksType) => async (dispatch: Dispatch) => {
  let res = await getStatusAPI.getRequest(links)
    .then(results => results.map(
        response => response
          .then(res => res.data.status.http_code)
      )
    )
  Promise.all(res)
    .then(codes => dispatch(setStatusCodeAC(codes)))
}

// types
export type linksType = Array<string>
export type statusCodesType = Array<number>
export type SetProjectActionType = ReturnType<typeof setProjectAC>
export type SetLinkActionType = ReturnType<typeof setLinksAC>
export type SetStatusCodeActionType = ReturnType<typeof setStatusCodeAC>
export type AppActionsType =
  SetStatusCodeActionType
  | SetLinkActionType
  | SetProjectActionType

