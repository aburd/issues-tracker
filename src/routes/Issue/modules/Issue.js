import Request from 'superagent'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_LOADING = 'SET_LOADING'
export const SET_REPO = 'SET_REPO'
export const SET_ENDPOINT = 'SET_ENDPOINT'
export const ISSUE_SET = 'ISSUE_SET'
export const ISSUES_CHANGE_PAGE = 'ISSUES_CHANGE_PAGE'
export const ISSUE_CLEAR = 'ISSUE_CLEAR'

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

export function issueClear () {
  return {
    type : ISSUE_CLEAR
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const getIssue = (url) => {
  return (dispatch, getState) => {
    dispatch({
      type : SET_LOADING,
      payload : true
    })
    return Request
      .get(url)
      .end((err, res) => {
        if (err) {
          throw new Error('An error occured loading the REST API:', err)
        } else {
          console.log('res', res)
          dispatch({
            type    : 'ISSUE_SET',
            payload : res.body
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
  getIssue,
  issueClear
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
  [ISSUE_SET] : (state, action) => {
    return Object.assign({}, state, {
      data: action.payload
    })
  },
  [ISSUE_CLEAR] : (state, action) => {
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
  repo: {},
  endpoint: {},
  data: {}
}
export default function issuesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
