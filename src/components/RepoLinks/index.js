import React from 'react'
import { Link } from 'react-router'
import { REPOS } from '../../config'
import './RepoLinks.scss'

const makeIssueLinks = () => {
  return Object.keys(REPOS).map((repoName, i) => {
    const repo = REPOS[repoName]
    return (
      <Link
        key={`repo$-${repo.name}-${i}`}
        to={`/issues/${repoName}`}
        className='list-group-item repo-link'
        activeClassName='route--active'
      >
        {repo.name}
      </Link>
    )
  })
}

export default () => {
  return (
    <div className='list-group'>
      {makeIssueLinks()}
    </div>
  )
}
