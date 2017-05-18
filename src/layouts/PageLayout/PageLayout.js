import React from 'react'
import PropTypes from 'prop-types'
import { IndexLink } from 'react-router'
import './PageLayout.scss'
import { SETTINGS } from '../../config'

export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    <IndexLink to='/' activeClassName='page-layout__nav-item--active'>
      <h1>{SETTINGS.title}</h1>
    </IndexLink>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
