import React from 'react'
import { connect } from 'react-redux'
import TeamForm from '../forms/TeamForm.js'
import {
  Card,
  Collapsible,
  CollapsibleItem,
  Collection,
  CollectionItem } from 'react-materialize'

class RightToolBar extends React.PureComponent{
  constructor(props, context) {
    super(props, context);
    this.state= {
      teams: null,
      possibleMembers: null
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/api/v1/users')
    .then(res => res.json())
    .then(users => {
      this.setState({
        possibleMembers: users,
        teams:this.props.currentUser.teams
      })
    })
  }

  handleBoardClick = (currentUser) => this.props.history.push(`/`)
  handleHomeClick = (currentUser) => this.props.history.push(`/home`)

  addTeam = (src) => this.setState({ teams: [...this.state.teams].concat(src) })

  render(){
    const { teams } = this.state
      return (
        <Card className="Center grey lighten-3 ">
          <Collection className="Center z-depth-1">
            { teams ? ( teams.map(team => {
              return (
                <CollectionItem
                  className="font"
                  key={ team.id }
                  href={ `/teams/${team.id}` }>
                  { team.name }
                </CollectionItem>
              )
            })) : (<CollectionItem className="font">{ "Add a Team" }</CollectionItem>
          )}
          </Collection>
          <Collapsible popout>
            <CollapsibleItem header='Create A Team' icon='group_add'>
              <TeamForm
                addTeam={ this.addTeam }
                possibleMembers={ this.state.possibleMembers }/>
            </CollapsibleItem>
          </Collapsible>
        </Card>
      )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(msp)(RightToolBar)
