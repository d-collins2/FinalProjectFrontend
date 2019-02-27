import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux"
import { Route, Switch, withRouter } from "react-router-dom";
import { updateCurrentUserAction, updateTeamId } from './redux/actions.js'
import BoardPage from './Containers/BoardPage.js'
import HomePageUser from './Containers/HomePageUser.js'
import TeamPage from './Containers/TeamPage.js'
import Naviebar from './Components/Naviebar.js'
import Login from './FormComponents/Login.js'
import SignUp from './FormComponents/SignUp.js'

class App extends Component {
  componentDidMount = () => {
    let token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3000/api/v1/current_user/', {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(response => {
        this.props.updateCurrentUserAction(response)
      })
    } else {
        this.props.history.push('/login')
    }
  }

  render(){
    return (
      <div>
        <Naviebar />
        <Switch>
          <Route exact path='/' render={() => <HomePageUser />}/>
          <Route exact path='/boards' render={() => <HomePageUser />}/>
          <Route exact path='/signup' render={() => <SignUp />}/>
          <Route exact path='/login' render={() => <Login />}/>
          <Route path='/teams/:id' render={() => <TeamPage handleTeamClick={this.handleTeamClick}/>}/>
          <Route path='/boards/:id' render={() => <BoardPage />}/>
        </Switch>
      </div>
    )
  }
}

function msp (state){
  return{
    currentUser: state.currentUser,
    teamId: state.teamId
  }
}

export default withRouter(connect(msp, {updateCurrentUserAction, updateTeamId})(App))
