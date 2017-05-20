import React from 'react'
import PropTypes from 'prop-types'

export const Issue = (props) => {
  return (
    <li className='issue list-group-item'>
      <div className='title'>
        <h5>{props.issue.title}</h5>
      </div>
      <div className='number'>#{props.issue.number}</div>
    </li>
  )
}

Issue.propTypes = {
  issue: PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.number
  })
}

export default Issue
