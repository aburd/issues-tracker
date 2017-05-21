import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
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
    <ul className='pagination'>
      {paginationLinks.first &&
        <li>
          <Link
            to={{ pathname: location.pathname, query: { page: 1 } }}
            onClick={handlePaginationClick(paginationLinks.first)}
          >
            <span aria-hidden='true'>&laquo;</span>
          </Link>
        </li>
      }
      {paginationLinks.prev &&
        <li>
          <Link
            to={{ pathname: location.pathname, query: { page: getPrev(currentPage) } }}
            onClick={handlePaginationClick(paginationLinks.prev)}
          >
            Prev
          </Link>
        </li>
      }
      {paginationLinks.next &&
        <li>
          <Link
            to={{ pathname: location.pathname, query: { page: getNext(currentPage) } }}
            onClick={handlePaginationClick(paginationLinks.next)}
          >
            Next
          </Link>
        </li>
      }
      {paginationLinks.last &&
        <li>
          <Link
            to={{ pathname: location.pathname, query: { page: parseInt(paginationLinks.last.match(/page=(\d+)/)[1]) } }}
            onClick={handlePaginationClick(paginationLinks.last)}
          >
            <span aria-hidden='true'>&raquo;</span>
          </Link>
        </li>
      }
    </ul>
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
