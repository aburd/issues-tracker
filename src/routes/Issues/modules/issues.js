import Request from 'superagent'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_LOADING = 'SET_LOADING'
export const SET_REPO = 'SET_REPO'
export const SET_ENDPOINT = 'SET_ENDPOINT'
export const SET_CURRENT_ISSUE = 'SET_CURRENT_ISSUE'
export const ISSUES_SET = 'ISSUES_SET'
export const ISSUES_CHANGE_PAGE = 'ISSUES_CHANGE_PAGE'
export const ISSUES_CLEAR = 'ISSUES_CLEAR'

// ------------------------------------
// Actions
// ------------------------------------
export function setRepo (value) {
  return {
    type    : SET_REPO,
    payload : value
  }
}

export function setEndpoint (value) {
  return {
    type    : SET_ENDPOINT,
    payload : value
  }
}

export function setCurrentIssue (value) {
  return {
    type    : SET_CURRENT_ISSUE,
    payload : value
  }
}

export function issuesClear () {
  return {
    type : ISSUES_CLEAR
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const getIssues = (url) => {
  return (dispatch, getState) => {
    dispatch({
      type : SET_LOADING,
      payload : true
    })
    return Request
      .get(url)
      .end((err, res) => {
        console.log(res)
        if (err) {
          throw new Error('An error occured loading the REST API:', err)
        } else {
          dispatch({
            type    : 'ISSUES_SET',
            payload : res.body,
            paginationLinks   : res.links
          })
          dispatch({
            type : SET_LOADING,
            payload : false
          })
        }
      })
  }
}

export const actions = {
  setRepo,
  setEndpoint,
  getIssues,
  setCurrentIssue
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_LOADING] : (state, action) => {
    return Object.assign({}, state, {
      loading: action.payload
    })
  },
  [SET_REPO] : (state, action) => {
    return Object.assign({}, state, {
      repo: action.payload
    })
  },
  [SET_ENDPOINT] : (state, action) => {
    return Object.assign({}, state, {
      endpoint: action.payload
    })
  },
  [SET_CURRENT_ISSUE] : (state, action) => {
    return Object.assign({}, state, {
      currentIssue: action.payload
    })
  },
  [ISSUES_SET] : (state, action) => {
    return Object.assign({}, state, {
      data: action.payload,
      paginationLinks: action.paginationLinks
    })
  },
  [ISSUES_CLEAR] : (state, action) => {
    return Object.assign({}, state, {
      data: []
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
  data: [],
  paginationLinks: {},
  repo: {},
  endpoint: {},
  currentIssue: 0
}
export default function issuesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
