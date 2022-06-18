import {Dispatch} from "redux";
import {getStatusAPI} from "../api/status-code-api";
import {searchAPI} from "../api/google-index-api";

const initialState = {
  status: 'idle' as RequestStatusType,
  project: 'mightytips.com',
  links: [] as LinksType,
  entities: [] as LinksType,
  statusCodes: [] as StatusCodesType,
  isIndexing: [] as Array<any>,
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
      return {...state, statusCodes: action.statusCodes}
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
export const checkIndexingAC = (isIndexing: Array<any>) => ({
  type: 'APP/CHECK-GOOGLE-INDEX', isIndexing
} as const)
export const isGoogleResultsAC = (googleResults: Array<EntriesType>) =>
  ({type: 'APP/SET-GOOGLE-RESULTS', googleResults} as const)

// thunks
export const statusCodeTC = (links: LinksType) => async (dispatch: Dispatch) => {
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
      dispatch(setStatusCodeAC(res.map(res => res.data.status.http_code)))
      dispatch(setEntitiesAC(res.map(res => res.data.status.url)))
    })

  Promise.all(googleRequest)
    .then(res => {
        let arr: any = []
        res.map(res => {
          for (let y = 0; y <= res.data.results.length; y++) {
            if (res.data.results[y] === undefined) {
              return arr.push('no 🤬')
            }
            else if (links.includes(res.data.results[y].link)) {
              return arr.push('yes 😁')
            } else {
              return arr.push('no 🤬')
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
    })
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