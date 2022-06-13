import {Dispatch} from "redux";
import {getStatusAPI} from "../api/status-code-api";

const initialState = {
  status: 'idle' as RequestStatusType,
  project: 'mightytips.com',
  links: [] as LinksType,
  entities: [] as LinksType,
  statusCodes: [] as StatusCodesType
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-PROJECT':
      return {...state, project: action.project}
    case 'APP/SET-LINKS':
      return {...state, links: [...action.links]}
    case 'APP/SET-ENTITIES':
      return {...state, entities: [...action.entities]}
    case 'APP/SET-STATUS-CODE':
      return {...state, statusCodes: [...action.statusCodes]}
    default:
      return state
  }
}

// actions
export const isStatusAC = (status: RequestStatusType) => ({
  type: 'APP/SET-STATUS', status
} as const)
export const setProjectAC = (project: string) => ({
  type: 'APP/SET-PROJECT', project
} as const)
export const setLinksAC = (links: LinksType) => ({
  type: 'APP/SET-LINKS', links
} as const)
export const setEntitiesAC = (entities: LinksType) => ({
  type: 'APP/SET-ENTITIES', entities
} as const)
export const setStatusCodeAC = (statusCodes: StatusCodesType) => ({
  type: 'APP/SET-STATUS-CODE', statusCodes
} as const)

// thunks
export const statusCodeTC = (links: LinksType) => async (dispatch: Dispatch) => {
  try {
    dispatch(isStatusAC('loading'))
    let httpCodes = await getStatusAPI.getRequest(links)
      .then(results => results.map(
          response => response
            .then(res => res.data.status.http_code)
        )
      )
    Promise.all(httpCodes)
      .then(codes => dispatch(setStatusCodeAC(codes)))
    let urls = await getStatusAPI.getRequest(links)
      .then(results => results.map(
          response => response
            .then(res => res.data.status.url)
        )
      )
    Promise.all(urls)
      .then(urls => dispatch(setEntitiesAC(urls)))
      .then(res => dispatch(isStatusAC('succeeded')))
  } catch (err) {
    console.log(err)
  }
}

// types
export type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type LinksType = Array<string>
export type StatusCodesType = Array<number>
export type IsStatusActionType = ReturnType<typeof isStatusAC>
export type SetProjectActionType = ReturnType<typeof setProjectAC>
export type SetLinksActionType = ReturnType<typeof setLinksAC>
export type SetEntitiesActionType = ReturnType<typeof setEntitiesAC>
export type SetStatusCodeActionType = ReturnType<typeof setStatusCodeAC>
export type AppActionsType =
  SetStatusCodeActionType
  | SetLinksActionType
  | SetProjectActionType
  | IsStatusActionType
  | SetEntitiesActionType

