import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'
import URL from 'url-parse'
import Loader from '../../../components/Loader'
import { SETTINGS as settings, REPOS as repos } from '../../../config.js'
import './Issue.scss'

class Issue extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  // makeDetailViewEndpoint (issuesEndpoint) {
  //   let newIssuesEndpoint = new URL(issuesEndpoint.href)
  //   const newPath = newIssuesEndpoint.path + '/' + this.
  //   newIssuesEndpoint.set('path', )
  // }

  componentWillMount () {
    /*
      Get and Set Initial data for any future usage in the component
    */
    const { setRepo, getIssue, setEndpoint, location } = this.props
    const currentRepo = repos[this.props.params.name]

    if (currentRepo !== {} && currentRepo !== undefined) {
      const pathnameParts = location.pathname.split('/')
      const issueNumber = pathnameParts[pathnameParts.length - 1]
      setRepo(currentRepo)
      // Set state for endpoint
      const endpoint = new URL(`${settings.apiBase}/repos/${currentRepo.url}/issues/${issueNumber}`, true)
      setEndpoint(endpoint)
      // Use endpoint to get data from GithubAPI
      getIssue(endpoint.href)
    }
  }

  componentWillUpdate (newProps, props) {
    // Compare the changes in location to prevent infinite rerendering
    if (this.props.location !== newProps.location) {
      this.props.getIssue(newProps.endpoint.href)
    }
  }

  componentWillUnmount () {
    this.props.issueClear()
  }

  render () {
    const { loading, data } = this.props

    const renderIssue = (loading, data) => {
      const {
        title,
        user,
        body,
        created_at
      } = data
      const createdAt = moment(created_at)
      if (loading || !title) {
        return <Loader />
      } else {
        return (
          <Container className='issue-detail'>
            <Row>
              <Col>
                <div className='title'>
                  <strong>
                    {title}
                  </strong>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <ReactMarkdown
                  className='body text-left'
                  source={body}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>{user.login}</strong> <br />
                <a href={user.url}>
                  <img
                    className='user-avatar'
                    src={user.avatar_url}
                    alt={`${user.login}'s github avatar'`}
                  />
                </a>
              </Col>
              <Col>
                <strong>{createdAt.format('YYYY/MM/DD')}</strong> <br />
                ({createdAt.fromNow()})
              </Col>
            </Row>
          </Container>
        )
      }
    }
    return (
      <div>
        {renderIssue(loading, data)}
      </div>
    )
  }
}

Issue.propTypes = {
  loading: PropTypes.bool,
  location: PropTypes.object,
  getIssue: PropTypes.func,
  setRepo: PropTypes.func,
  setEndpoint: PropTypes.func,
  issueClear: PropTypes.func,
  data: PropTypes.object,
  params: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.string
  })
  // issuesEndpoint: PropTypes.object
}

export default Issue
