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
    this.props.setRepo(currentRepo)

    if (currentRepo !== {}) {
      const endpoint = new URL(`${settings.apiBase}/repos/${currentRepo.url}/issues?page=1&per_page=10`)
      this.props.getInitialIssues(endpoint.href)
    }
  }

  componentWillUnmount () {
    this.props.issuesClear()
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
      repo,
      location,
      changePage,
      page,
      data
    } = this.props
    const renderIssues = () => {
      if (loading) {
        return <Loader />
      } else {
        return (
          <div>
            <h3>{repo.name}</h3>
            <button className='btn btn-default' onClick={changePage}>Press Me</button>
            <p>{page}</p>
            <ul id='issues-list' className='list-group text-left'>
              {data.map((issue, i) => <IssueListItem key={'Issue-' + i} pathname={location.pathname} issue={issue} />)}
            </ul>
          </div>
        )
      }
    }

    // Only load the component if the repo is valid, else load a default view
    return !repo ? (
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
  repo: PropTypes.object,
  location: PropTypes.object,
  page: PropTypes.number,
  params: PropTypes.object,
  changePage: PropTypes.func,
  setRepo: PropTypes.func,
  getInitialIssues: PropTypes.func,
  issuesClear: PropTypes.func,
  data: PropTypes.array
}

export default Issues
