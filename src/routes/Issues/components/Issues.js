import React, { Component } from 'react'
import PropTypes from 'prop-types'
import URL from 'url-parse'
import Loader from '../../../components/Loader'
import IssueListItem from './IssueListItem'
import PaginationBar from './PaginationBar'
import { Container, Row, Col } from 'reactstrap'
import { SETTINGS as settings, REPOS as repos } from '../../../config.js'

class Issues extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentWillMount () {
    /*
      Get and Set Initial data for any future usage in the component
    */
    const { setRepo, getIssues, setEndpoint, location } = this.props
    const currentRepo = repos[this.props.params.name]

    if (currentRepo !== {} && currentRepo !== undefined) {
      setRepo(currentRepo)
      // Set state for endpoint
      const endpoint = new URL(`${settings.apiBase}/repos/${currentRepo.url}/issues`, true)
      endpoint.query['page'] = location.query.page || 1
      endpoint.query['per_page'] = 10
      setEndpoint(endpoint)
      // Use endpoint to get data from GithubAPI
      getIssues(endpoint.toString())
    }
  }

  componentWillUpdate (newProps, props) {
    // Compare the changes in location to prevent infinite rerendering
    if (this.props.location !== newProps.location) {
      this.props.getIssues(newProps.endpoint.toString())
    }
  }

  componentWillUnmount () {
    this.props.issuesClear()
  }

  render () {
    console.log('render called')
    const {
      loading,
      repo,
      location,
      data,
      setEndpoint,
      paginationLinks,
      setCurrentIssue
    } = this.props
    console.log('loading', loading)

    const renderIssues = () => {
      if (loading) {
        return <Loader />
      } else {
        const currentPage = location.query.page || 1

        return (
          <div>
            <Container>
              <Row>
                <Col><h3>{repo.name}</h3></Col>
              </Row>
              <Row>
                <Col>
                  <PaginationBar
                    currentPage={currentPage}
                    location={location}
                    setEndpoint={setEndpoint}
                    paginationLinks={paginationLinks}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <ul id='issues-list' className='list-group text-left'>
                    {data.map((issue, i) => (
                      <IssueListItem
                        key={'Issue-' + i}
                        pathname={location.pathname}
                        issue={issue}
                        setCurrentIssue={setCurrentIssue}
                      />
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col>
                  <PaginationBar
                    currentPage={currentPage}
                    location={location}
                    setEndpoint={setEndpoint}
                    paginationLinks={paginationLinks}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        )
      }
    }

    return (
      <div>
        {renderIssues()}
      </div>
    )
  }
}

Issues.propTypes = {
  loading: PropTypes.bool,
  repo: PropTypes.object,
  location: PropTypes.object,
  params: PropTypes.object,
  paginationLinks: PropTypes.object,
  setRepo: PropTypes.func,
  setEndpoint: PropTypes.func,
  setCurrentIssue: PropTypes.func,
  getIssues: PropTypes.func,
  issuesClear: PropTypes.func,
  data: PropTypes.array
}

export default Issues
