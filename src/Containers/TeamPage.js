import React from 'react';
import { Card, Collection, CollectionItem, Row, Col, Tabs, Tab } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TeamBoardContainer from './TeamBoardContainer.js'
import { updateUserAction } from '../redux/actions.js'

class TeamPage extends React.Component{

  team_info = () => {
    const { currentUser, location} = this.props
    const id = location.pathname.split('/')[2]
  // eslint-disable-next-line

    const team_info = currentUser && currentUser.teams_info[id]
    return team_info
  }

  profile = (team) => {
    return (
      <Row>
        <Col>
          <img src={team.img_url} alt="random"/>
        </Col>
        <Col>
          <h1>{team.name}</h1>
        </Col>
      </Row>
    )
  }

  render () {
    const { currentUser, location } = this.props
    const id = location.pathname.split('/')[2]
    // eslint-disable-next-line
    const team = currentUser && currentUser.teams.find(team => team.id == id)
    console.log(this.team_info(), team)
    return (
      <Card className="">
        <div>
          {currentUser ?(
            <Row>
              <Col s={3}>
              </Col>
              <Col s={9}>
                {this.profile(team)}
              </Col>
            </Row>
          ): null}
          <Row>
            <Col s={1}></Col>
            <Col s={10}>
              <Tabs className='Center z-depth-1'><Tab title="Boards" active tabWidth={4}>
                <Row>
                  <Col s={1}></Col>
                  <Col s={10} >
                    <TeamBoardContainer team={team}/>
                  </Col>
                </Row>
              </Tab>
              <Tab title="Members" tabWidth={4}>
                {currentUser &&
                <Row>
                  <Col s={3}></Col>
                  <Col s={6} >
                    <Collection className="z-depth-1">
                      {currentUser.teams_info[id]["team_members"].map(member => {
                        return (
                          <CollectionItem className="Center" key={member.id}>{member.first_name}</CollectionItem>
                        )
                      })}
                    </Collection>
                  </Col>
                </Row>}
              </Tab>
              <Tab
                title="Settings"
                tabWidth={4}>
                <div className="z-depth-1"></div>
              </Tab>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Card>
    )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}


export default withRouter(connect(msp, {updateUserAction})(TeamPage))
