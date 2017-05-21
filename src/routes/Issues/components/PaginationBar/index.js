import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Pagination, PaginationItem } from 'reactstrap'
import './PaginationBar.scss'

const makePaginationBar = (props) => {
  // console.log('makePaginationBar running...')
  // console.log('Location:', props.location)
  const { currentPage, location, setEndpoint, paginationLinks } = props

  const getPrev = (currentPage) => {
    const pageNumber = parseInt(currentPage)
    const newPage = parseInt(pageNumber - 1)
    return (newPage < 1)
      ? 1
      : newPage
  }
  const getNext = (currentPage) => {
    const pageNumber = parseInt(currentPage)
    const newPage = parseInt(pageNumber + 1)
    return (newPage > 100)
      ? 1
      : newPage
  }
  const handlePaginationClick = (newEndpoint) => () => {
    setEndpoint(newEndpoint)
  }

  return (
    <Pagination>
      {paginationLinks.first &&
        <PaginationItem>
          <Link
            className='page-link'
            to={{ pathname: location.pathname, query: { page: 1 } }}
            onClick={handlePaginationClick(paginationLinks.first)}
          >
            <span aria-hidden='true'>&laquo;</span>
          </Link>
        </PaginationItem>
      }
      {paginationLinks.prev &&
        <PaginationItem>
          <Link
            className='page-link'
            to={{ pathname: location.pathname, query: { page: getPrev(currentPage) } }}
            onClick={handlePaginationClick(paginationLinks.prev)}
          >
            Prev
          </Link>
        </PaginationItem>
      }
      {paginationLinks.next &&
        <PaginationItem>
          <Link
            className='page-link'
            to={{ pathname: location.pathname, query: { page: getNext(currentPage) } }}
            onClick={handlePaginationClick(paginationLinks.next)}
          >
            Next
          </Link>
        </PaginationItem>
      }
      {paginationLinks.last &&
        <PaginationItem>
          <Link
            className='page-link'
            to={{ pathname: location.pathname, query: { page: parseInt(paginationLinks.last.match(/page=(\d+)/)[1]) } }}
            onClick={handlePaginationClick(paginationLinks.last)}
          >
            <span aria-hidden='true'>&raquo;</span>
          </Link>
        </PaginationItem>
      }
    </Pagination>
  )
}

export const PaginationBar = (props) => {
  console.log(props.location)
  if (props.location === undefined) {
    return null
  } else {
    return makePaginationBar(props)
  }
}

makePaginationBar.propTypes = {
  currentPage: PropTypes.number,
  location: PropTypes.object,
  setEndpoint: PropTypes.func,
  paginationLinks: PropTypes.object
}

export default PaginationBar
