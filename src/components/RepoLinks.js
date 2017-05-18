import React from 'react'
import { Link } from 'react-router'
import { REPOS } from '../config'

const makeIssueLinks = () => {
  return Object.keys(REPOS).map((repoName, i) => {
    const repo = REPOS[repoName]
    return (
      <li key={`repo$-${repo.name}-${i}`}>
        <Link
          to={`/issues/${repoName}`}
          activeClassName='route--active'
        >
          {repo.name}
        </Link>
      </li>
    )
  })
}

export default () => {
  return (
    <ul>
      {makeIssueLinks()}
    </ul>
  )
}
