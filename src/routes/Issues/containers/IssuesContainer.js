import { connect } from 'react-redux'
import { changePage, getInitialIssues, issuesClear, setRepo } from '../modules/issues'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the issues:   */

import Issues from '../components/Issues'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  changePage : (ev) => {
    return changePage(1)
  },
  setRepo : (repo) => setRepo(repo),
  getInitialIssues : (url) => getInitialIssues(url),
  issuesClear : () => issuesClear()
}

const mapStateToProps = (state) => ({
  loading : state.issues.loading,
  page    : state.issues.page,
  data    : state.issues.data,
  repo    : state.issues.repo
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const issues = (state) => state.issues
    const tripleCount = createSelector(issues, (count) => count * 3)
    const mapStateToProps = (state) => ({
      issues: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Issues)
