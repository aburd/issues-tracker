import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import './IssueListItem.scss'

export const IssueListItem = (props) => {
  const { pathname } = props
  const { title, number } = props.issue
  const sterilizedPathname = pathname.split('')[pathname.length - 1] === '/'
    ? pathname.slice(0, pathname.length - 1)
    : pathname
  const handleIssueListItemClick = (issueNumber) => () => {
    props.setCurrentIssue(issueNumber)
  }
  return (
    <Link
      to={`${sterilizedPathname}/${number}`}
      className='issue-list-item list-group-item'
      onClick={handleIssueListItemClick(number)}
    >
      <div className='title'>
        <h5>{title}</h5>
      </div>
      <div className='number'>#{number}</div>
    </Link>
  )
}

IssueListItem.propTypes = {
  setCurrentIssue: PropTypes.func,
  pathname: PropTypes.string,
  issue: PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.number
  })
}

export default IssueListItem
