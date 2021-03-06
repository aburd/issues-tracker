import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'issues/:name',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Issues = require('./containers/IssuesContainer').default
      const reducer = require('./modules/issues').default

      /*  Add the reducer to the store on key 'issues'  */
      injectReducer(store, { key: 'issues', reducer })

      /*  Return getComponent   */
      cb(null, Issues)

    /* Webpack named bundle   */
    }, 'issues')
  }
})
