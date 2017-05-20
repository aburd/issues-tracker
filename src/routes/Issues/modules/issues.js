import Request from 'superagent'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_LOADING = 'SET_LOADING'
export const SET_REPO = 'SET_REPO'
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

export function changePage (value = 1) {
  return {
    type    : ISSUES_CHANGE_PAGE,
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

export const getInitialIssues = (url) => {
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
          dispatch({
            type    : 'ISSUES_SET',
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
  setRepo,
  changePage,
  getInitialIssues
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
  [ISSUES_CHANGE_PAGE] : (state, action) => {
    return Object.assign({}, state, {
      page: action.payload
    })
  },
  [ISSUES_SET] : (state, action) => {
    return Object.assign({}, state, {
      data: action.payload
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
  page: 0,
  data: [],
  repo: {}
}
export default function issuesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
