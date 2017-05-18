import Request from 'superagent'

// ------------------------------------
// Constants
// ------------------------------------
export const ISSUES_SET = 'ISSUES_SET'
export const ISSUES_CHANGE_PAGE = 'ISSUES_CHANGE_PAGE'
export const ISSUES_CLEAR = 'ISSUES_CLEAR'

// ------------------------------------
// Actions
// ------------------------------------
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

export const getInitialIssues = () => {
  const url = 'https://api.github.com/repos/angular/protractor/issues?page=1&per_page=10'
  return (dispatch, getState) => {
    return Request.get(url)
      .end((err, res) => {
        if (err) {
          // TODO: write a dispatch for error handling
          console.log(err)
        }
        if (res.statusCode === 200) {
          dispatch({
            type    : 'ISSUES_SET',
            payload : res.body
          })
        }
      })
  }
}

export const actions = {
  changePage,
  getInitialIssues
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
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
  page: 0,
  data: []
}
export default function issuesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
