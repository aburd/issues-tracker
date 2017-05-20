import React, { Component } from 'react'
import PropTypes from 'prop-types'
import URL from 'url-parse'
import Loader from '../../../components/Loader'
import { SETTINGS as settings, REPOS as repos } from '../../../config.js'

class Issue extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        Have a good time, baby.
      </div>
    )
  }
}

Issue.propTypes = {
  loading: PropTypes.bool,
  location: PropTypes.object,
  page: PropTypes.number,
  params: PropTypes.object
}

export default Issue
