import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import URL from 'url-parse'
// import request from 'superagent';
import RepoLinks from '../../../components/RepoLinks'
import Loader from '../../../components/Loader'
import Issue from './Issue'
import { SETTINGS as settings, REPOS as repos } from '../../../config.js'

class Issues extends Component {
  constructor (props) {
    super(props)
    this.makeDefaultView = this.makeDefaultView.bind(this)
    this.state = {}
  }

  componentWillMount () {
    const currentRepo = repos[this.props.params.issueName]

    if (currentRepo) {
      const endpoint = new URL(`${settings.apiBase}/repos/${currentRepo.url}/issues?page=1&per_page=10`)
      this.props.getInitialIssues(endpoint)
    }
  }

  componentWillUnmount () {
    this.props.issuesClear()
  }

  componentWillReceiveProps (newProps, props) {
    const currentRepo = repos[newProps.params.issueName]
    const { params, getInitialIssues } = this.props

    // TODO: use immutable for deep object equality
    if (currentRepo && params.issueName !== newProps.params.issueName) {
      const endpoint = new URL(`${settings.apiBase}/repos/${currentRepo.url}/issues?page=1&per_page=10`)
      getInitialIssues(endpoint)
    }
  }

  makeDefaultView () {
    return (
      <div>
        <h3>Not Found :(</h3>
        <p>レポジトリー「{this.props.params.issueName}」はみつがりませんでした。</p>
        <p>レポジトリーを選択してください</p>
        <RepoLinks />
      </div>
    )
  }

  render () {
    const { loading, params, changePage, page, data } = this.props
    const currentRepo = repos[params.issueName]
    const renderIssues = () => {
      if (loading) {
        return <Loader />
      } else {
        return (
          <div>
            <h3>{currentRepo.name}</h3>
            <button className='btn btn-default' onClick={changePage}>Press Me</button>
            <p>{page}</p>
            <ul id='issues-list' className='list-group text-left'>
              {data.map((issue, i) => <Issue key={'Issue-' + i} issue={issue} />)}
            </ul>
          </div>
        )
      }
    }

    // Only load the component if the currentRepo is valid, else load a default view
    return !currentRepo ? (
      <div>
        {this.makeDefaultView()}
      </div>
    ) : (
      <div>
        {renderIssues()}
      </div>
    )
  }
}

Issues.propTypes = {
  loading: PropTypes.bool,
  page: PropTypes.number,
  params: PropTypes.object,
  changePage: PropTypes.func,
  getInitialIssues: PropTypes.func,
  issuesClear: PropTypes.func,
  data: PropTypes.array
}

export default Issues
