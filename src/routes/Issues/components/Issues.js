import React, { PropTypes, Component } from 'react'
// import URL from 'url-parse'
// import request from 'superagent';
import RepoLinks from '../../../components/RepoLinks'
import { REPOS as repos } from '../../../config.js'

const mapIssues = (issuesData = []) => {
  return issuesData.map(issue => {
    return (
      <li
        key={'issue-' + issue.number}
        className='issue list-group-item'
      >
        <div className='title'>
          <h5>{issue.title}</h5>
        </div>
        <div className='number'>#{issue.number}</div>
      </li>
    )
  })
}

class Issues extends Component {
  constructor (props) {
    super(props)
    this.makeDefaultView = this.makeDefaultView.bind(this)
    // const endpoint = new URL(`${currentRepo.url}?page=1&per_page=10`)
    this.state = {}
  }

  componentWillUpdate () {}

  componentWillUnmount () {
    this.props.issuesClear()
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
    const { params, changePage, getInitialIssues, page, data } = this.props
    const currentRepo = repos[params.issueName]
    console.log('data', data)
    return !currentRepo ? (
      <div>
        {this.makeDefaultView()}
      </div>
    ) : (
      <div>
        <h3>{currentRepo.name}</h3>
        <button className='btn btn-default' onClick={changePage}>Press Me</button>
        <p>{page}</p>
        <button className='btn btn-info' onClick={getInitialIssues}>Get Issues</button>
        <ul id='issues-list' className='list-group text-left'>
          {mapIssues(data)}
        </ul>
      </div>
    )
  }
}

Issues.propTypes = {
  page: PropTypes.number,
  params: PropTypes.object,
  changePage: PropTypes.func,
  getInitialIssues: PropTypes.func,
  issuesClear: PropTypes.func,
  data: PropTypes.array
}

export default Issues
