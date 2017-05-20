import React, { Component } from 'react'
import PropTypes from 'prop-types'
import URL from 'url-parse'
import RepoLinks from '../../../components/RepoLinks'
import Loader from '../../../components/Loader'
import IssueListItem from './IssueListItem'
import { SETTINGS as settings, REPOS as repos } from '../../../config.js'

class Issues extends Component {
  constructor (props) {
    super(props)
    this.makeDefaultView = this.makeDefaultView.bind(this)
    this.state = {}
  }

  componentWillMount () {
    const currentRepo = repos[this.props.params.name]

    if (currentRepo) {
      const endpoint = new URL(`${settings.apiBase}/repos/${currentRepo.url}/issues?page=1&per_page=10`)
      this.props.getInitialIssues(endpoint.href)
    }
  }

  componentWillUnmount () {
    this.props.issuesClear()
  }

  componentWillReceiveProps (newProps, props) {
    const currentRepo = repos[newProps.params.name]
    const { params, getInitialIssues } = this.props

    // TODO: use immutable for deep object equality
    if (currentRepo && params.name !== newProps.params.name) {
      const endpoint = new URL(`${settings.apiBase}/repos/${currentRepo.url}/issues?page=1&per_page=10`)
      getInitialIssues(endpoint.href)
    }
  }

  makeDefaultView () {
    return (
      <div>
        <h3>Not Found :(</h3>
        <p>レポジトリー「{this.props.params.name}」はみつがりませんでした。</p>
        <p>レポジトリーを選択してください</p>
        <RepoLinks />
      </div>
    )
  }

  render () {
    const {
      loading,
      params,
      location,
      changePage,
      page,
      data
    } = this.props
    const currentRepo = repos[params.name]
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
              {data.map((issue, i) => <IssueListItem key={'Issue-' + i} pathname={location.pathname} issue={issue} />)}
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
  location: PropTypes.object,
  page: PropTypes.number,
  params: PropTypes.object,
  changePage: PropTypes.func,
  getInitialIssues: PropTypes.func,
  issuesClear: PropTypes.func,
  data: PropTypes.array
}

export default Issues
