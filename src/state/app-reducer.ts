import {Dispatch} from "redux";
import {getStatusAPI} from "../api/status-code-api";
import {searchAPI} from "../api/google-index-api";

const initialState = {
  status: 'idle' as RequestStatusType,
  project: 'mightytips.com',
  links: [] as EntitiesType,
  entities: [] as EntitiesType,
  statusCodes: [] as StatusCodesType,
  isIndexing: [] as EntitiesType,
  liveLinks: [] as EntitiesType,
  error: null as ErrorType,
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
      return {...state, statusCodes: action.statusCodes}
    case 'APP/CHECK-GOOGLE-INDEX':
      return {...state, isIndexing: [...action.isIndexing]}
    case 'APP/LINK-IS-ALIVE':
      return {...state, liveLinks: [...action.liveLinks]}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
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
export const setLinksAC = (links: EntitiesType) => ({
  type: 'APP/SET-LINKS', links
} as const)
export const setEntitiesAC = (entities: EntitiesType) => ({
  type: 'APP/SET-ENTITIES', entities
} as const)
export const setStatusCodeAC = (statusCodes: StatusCodesType) => ({
  type: 'APP/SET-STATUS-CODE', statusCodes
} as const)
export const checkIndexingAC = (isIndexing: EntitiesType) => ({
  type: 'APP/CHECK-GOOGLE-INDEX', isIndexing
} as const)
export const liveLinksAC = (liveLinks: EntitiesType) => ({
  type: 'APP/LINK-IS-ALIVE', liveLinks
} as const)
export const setAppErrorAC = (error: ErrorType) => ({
  type: 'APP/SET-ERROR',
  error
} as const)

// thunks
export const statusCodeTC = (links: EntitiesType, project: string) => async (dispatch: Dispatch) => {
  dispatch(isStatusAC('loading'))
  let siteRequest = await getStatusAPI.getRequest(links)
    .then(results => results.map(response => response
        .then(res => res)
      )
    )

  let googleRequest = await searchAPI.getRequest(links)
    .then(results => results.map(response => response
        .then(res => res)
      )
    )

  Promise.all(siteRequest)
    .then(res => {
      dispatch(isStatusAC('loading'))
      const arr: any = []
      res.map(res => {
        if (res.data.contents === undefined) {
          return arr.push('Nope 🤬')
        } else if (res.data.contents.includes((project))) {
          return arr.push('Yep 😁')
        } else {
          return arr.push('Nope 🤬')
        }
        return arr
      })
      dispatch(liveLinksAC(arr))
      dispatch(setStatusCodeAC(res.map(res => res.data.status.http_code)))
      dispatch(setEntitiesAC(res.map(res => res.data.status.url)))
      dispatch(isStatusAC('succeeded'))
    })
    .catch(err => {
      console.log(err)
      dispatch(setAppErrorAC(err.message))
    })

  Promise.all(googleRequest)
    .then(res => {
        dispatch(isStatusAC('loading'))
        const arr: Array<string> = []
        res.map(res => {
          for (let y = 0; y <= res.data.results.length; y++) {
            if (res.data.results[y] === undefined) {
              return arr.push('Nope 🤬')
            } else if (links.map(link => link.replace(/^https?\:\/\//i, "")).includes(res.data.results[y].link.replace(/^https?\:\/\//i, ""))) {
              return arr.push('Yep 😁')
            } else {
              return arr.push('Nope 🤬')
            }
          }
          return arr
        })
        dispatch(checkIndexingAC(arr))
        dispatch(isStatusAC('succeeded'))
      }
    )
    .catch(err => {
      console.log(err)
      dispatch(setAppErrorAC(err.message))
    })
}

// types
export type InitialStateType = typeof initialState
export type ErrorType = string | null
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type EntitiesType = Array<string>
export type StatusCodesType = Array<number>
export type IsStatusActionType = ReturnType<typeof isStatusAC>
export type SetProjectActionType = ReturnType<typeof setProjectAC>
export type SetLinksActionType = ReturnType<typeof setLinksAC>
export type SetEntitiesActionType = ReturnType<typeof setEntitiesAC>
export type SetStatusCodeActionType = ReturnType<typeof setStatusCodeAC>
export type CheckIndexingActionType = ReturnType<typeof checkIndexingAC>
export type LiveLinksActionType = ReturnType<typeof liveLinksAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type AppActionsType =
  SetStatusCodeActionType
  | SetLinksActionType
  | SetProjectActionType
  | IsStatusActionType
  | SetEntitiesActionType
  | CheckIndexingActionType
  | LiveLinksActionType
  | SetAppErrorActionType