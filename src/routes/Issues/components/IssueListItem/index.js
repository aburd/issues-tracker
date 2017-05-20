import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import './IssueListItem.scss'

export const IssueListItem = (props) => {
  const { pathname } = props
  const { title, number } = props.issue
  return (
    <Link to={`${pathname}/${number}`} className='issue-list-item list-group-item'
    >
      <div className='title'>
        <h5>{title}</h5>
      </div>
      <div className='number'>#{number}</div>
    </Link>
  )
}

IssueListItem.propTypes = {
  pathname: PropTypes.string,
  issue: PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.number
  })
}

export default IssueListItem
