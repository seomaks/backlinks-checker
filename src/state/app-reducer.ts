import {Dispatch} from "redux";
import {getStatusAPI} from "../api/status-code-api";
import {searchAPI} from "../api/google-index-api";

const initialState = {
  status: 'idle' as RequestStatusType,
  project: 'mightytips.com',
  links: [] as LinksType,
  entities: [] as LinksType,
  statusCodes: [] as StatusCodesType,
  pageSize: 10,
  isIndexing: [] as Array<boolean>,
  googleResults: [] as Array<EntriesType>
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
    case 'APP/CHECK-GOOGLE-INDEX':
      return {...state, isIndexing: [...action.isIndexing]}
    case 'APP/SET-GOOGLE-RESULTS':
      return {...state, googleResults: [...action.googleResults]}
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
export const checkIndexingAC = (isIndexing: Array<boolean>) => ({
  type: 'APP/CHECK-GOOGLE-INDEX', isIndexing
} as const)
export const isGoogleResultsAC = (googleResults: Array<EntriesType>) =>
  ({type: 'APP/SET-GOOGLE-RESULTS', googleResults} as const)

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

export const indexingTC = (links: LinksType, pageSize: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(isStatusAC('loading'))
    let googleResult = await searchAPI.getRequest(links, pageSize)
      .then(results => results.map(
        response => response
          .then(res => dispatch(isGoogleResultsAC(res.data.results)))
          .then(res => dispatch(isStatusAC('succeeded')))
      ))
  } catch (err) {
    console.log(err)
  }
}

// types
export type EntriesType = {
  description: string
  link: string
  title: string
}
export type InitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type LinksType = Array<string>
export type StatusCodesType = Array<number>
export type IsStatusActionType = ReturnType<typeof isStatusAC>
export type SetProjectActionType = ReturnType<typeof setProjectAC>
export type SetLinksActionType = ReturnType<typeof setLinksAC>
export type SetEntitiesActionType = ReturnType<typeof setEntitiesAC>
export type SetStatusCodeActionType = ReturnType<typeof setStatusCodeAC>
export type CheckIndexingActionType = ReturnType<typeof checkIndexingAC>
export type IsGoogleResultsActionType = ReturnType<typeof isGoogleResultsAC>
export type AppActionsType =
  SetStatusCodeActionType
  | SetLinksActionType
  | SetProjectActionType
  | IsStatusActionType
  | SetEntitiesActionType
  | CheckIndexingActionType
  | IsGoogleResultsActionType

