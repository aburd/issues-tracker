import React, { Component } from 'react'
import PropTypes from 'prop-types'
import URL from 'url-parse'
import RepoLinks from '../../../components/RepoLinks'
import Loader from '../../../components/Loader'
import IssueListItem from './IssueListItem'
import PaginationBar from './PaginationBar'
import { Container, Row, Col } from 'reactstrap'
import { SETTINGS as settings, REPOS as repos } from '../../../config.js'

class Issues extends Component {
  constructor (props) {
    super(props)
    this.makeDefaultView = this.makeDefaultView.bind(this)
    this.state = {}
  }

  componentWillMount () {
    /*
      Get and Set Initial data for any future usage in the component
    */
    const { setRepo, getInitialIssues, setEndpoint } = this.props
    const currentRepo = repos[this.props.params.name]
    setRepo(currentRepo)

    if (currentRepo !== {}) {
      // Set state for endpoint
      const endpoint = new URL(`${settings.apiBase}/repos/${currentRepo.url}/issues`, true)
      endpoint.query['page'] = this.props.location.query.page
      endpoint.query['per_page'] = 10
      setEndpoint(endpoint)
      // Use endpoint to get data from GithubAPI
      getInitialIssues(endpoint.toString())
    }
  }

  componentWillUnmount () {
    this.props.issuesClear()
  }

  makeDefaultView () {
    /*
      View to show in case an incorrect repo name is used in the URL
    */
    return (
      <div>
        <h3>Not Found :(</h3>
        <p>レポジトリー「{this.props.params.name}」はみつがりませんでした。</p>
        <p>レポジトリーを選択してください</p>
        <RepoLinks />
      </div>
    )
  }

  render () {
    const {
      loading,
      repo,
      location,
      changePage,
      page,
      data
    } = this.props
    const renderIssues = () => {
      if (loading) {
        return <Loader />
      } else {
        return (
          <div>
            <Container>
              <Row>
                <Col><h3>{repo.name}</h3></Col>
              </Row>
              <Row>
                <Col>
                  <button className='btn btn-default' onClick={changePage}>Press Me</button>
                  <p>{page}</p>
                </Col>
              </Row>
              <Row>
                <Col><PaginationBar /></Col>
              </Row>
              <Row>
                <Col>
                  <ul id='issues-list' className='list-group text-left'>
                    {data.map((issue, i) => (
                      <IssueListItem key={'Issue-' + i}
                        pathname={location.pathname}
                        issue={issue}
                      />
                    ))}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col>
                  <PaginationBar />
                </Col>
              </Row>
            </Container>
          </div>
        )
      }
    }

    // Only load the component if the repo is valid, else load a default view
    return !repo ? (
      <div>
        {this.makeDefaultView()}
      </div>
    ) : (
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
  page: PropTypes.number,
  params: PropTypes.object,
  changePage: PropTypes.func,
  setRepo: PropTypes.func,
  setEndpoint: PropTypes.func,
  getInitialIssues: PropTypes.func,
  issuesClear: PropTypes.func,
  data: PropTypes.array
}

export default Issues
