import { connect } from 'react-redux'
import { setRepo, setEndpoint, getIssue, issueClear } from '../modules/issue'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the issue:   */

import Issue from '../components/Issue'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  setRepo         : (repo) => setRepo(repo),
  setEndpoint     : (endpoint) => setEndpoint(endpoint),
  getIssue        : (url) => getIssue(url),
  issueClear      : () => issueClear()
}

const mapStateToProps = (state) => ({
  loading       : state.issue.loading,
  data          : state.issue.data,
  repo            : state.issue.repo,
  endpoint        : state.issue.endpoint
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const issue = (state) => state.issue
    const tripleCount = createSelector(issue, (count) => count * 3)
    const mapStateToProps = (state) => ({
      issue: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Issue)
