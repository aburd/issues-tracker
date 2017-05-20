import React from 'react'
import { Link } from 'react-router'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import PropTypes from 'prop-types'
import './PaginationBar.scss'

export const PaginationBar = () => (
  <Pagination>
    <PaginationItem>
      <PaginationLink previous href='#' />
      <PaginationLink href='#'>Next</PaginationLink>
      <PaginationLink href='#'>Previous</PaginationLink>
      <PaginationLink next href='#' />
    </PaginationItem>
  </Pagination>
)

PaginationBar.propTypes = {

}

export default PaginationBar
