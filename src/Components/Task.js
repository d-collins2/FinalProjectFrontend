import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Button, Row, Col, Collection, CollectionItem, Input, Icon } from 'react-materialize'
import MoveOver from './MoveOver.js'
import { connect } from 'react-redux'
import { updateCurrentUserAction } from '../redux/actions.js'
import Modal from '../style/Modal.js'

class Task  extends React.Component {
  state = {
    name: '',
    due_date: '',
    description: '',
    labels: '',
    show: false
  }

  showModal = () => {
    const { task } = this.props
    this.setState({
      show: true,
      name: task.name,
      due_date: task.due_date,
      description: task.description,
      labels: task.labels
    });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleSubmit = () => {
    const { task, currentUser, board } = this.props
    const { name, due_date, description, labels } = this.state

    fetch(`http://localhost:3000/api/v1/tasks/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name: name,
      due_date: due_date,
      description: description,
      topic: `Task Updated by ${currentUser.full_name}`,
      user_id: currentUser.id,
      board_id: board.id,
      labels: labels
    })
  })
    .then(fetch('http://localhost:3000/api/v1/current_user/', {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(response => {
      this.props.updateCurrentUserAction(response)
      this.hideModal()
    })
  )}

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/tasks/${this.props.task.id}`, { method: 'DELETE' })
    .then(fetch('http://localhost:3000/api/v1/current_user/', {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(response => {
      this.props.updateCurrentUserAction(response)
      this.hideModal()
    })
  )}

  labels = () => {
    switch(this.props.task.labels) {
      case "blue":
        return <i className="material-icons blue600 left">fiber_manual_record</i>
      case "red":
        return <i className="material-icons red600 left">fiber_manual_record</i>
      case "yellow":
        return <i className="material-icons yellow600 left">fiber_manual_record</i>
      case "green":
        return <i className="material-icons green600 left">fiber_manual_record</i>
      case "orange":
        return <i className="material-icons orange600 left">fiber_manual_record</i>
      default:
        return null
    }
  }

  taskInfo = () => {
    const { task, start } = this.props
    return (
      <div className="grey lighten-4" draggable onClick={this.showModal} onDragStart={(event) => start(event, task)}>
        <Card>
          { task.name }
          {task.labels ? this.labels() : null}
        </Card>
      </div>
    )
  }

  handleCheckBoxChange = (event) => {
    this.setState({
      labels: event.target.value
    })
  }

  modalInfo = () => {
    const { handleChange, handleSubmit, handleDelete } = this
    const { task, board, currentUser } = this.props
      // eslint-disable-next-line
    const filtered = () => currentUser && currentUser.teams_info[board.team_id].lists[board.id].filter(list => list.id != task.list_id)
    return (
      <>
      { this.taskInfo() }
      <Modal className='Center' show={this.state.show} handleClose={this.hideModal}>
        <div>
          <Row>
              <Col s={2} m={8}>
                <Row >
                  <Input onChange={ handleChange } s={6} label='Name of Team' name="name" placeholder={task.name} />
                  <Input s={6} label='Due Date' name='due_date' type='date' onChange={ handleChange} placeholder={task.due_date}/>
                  <Input onChange={ handleChange } s ={12} label='description' type="textarea" name="description" placeholder={task.description}  />
                  <label className='Center'>Labels</label>
                    <Row>
                      <Col s={3}></Col>
                      <Col s={3} m={8}>
                        <Input onChange={this.handleCheckBoxChange} name='group1' type='checkbox' value='red' label={<i className="material-icons red600 left">fiber_manual_record</i> }className='filled-in' />
                        <Input onChange={this.handleCheckBoxChange} name='group1' type='checkbox' value='blue' label={<i className="material-icons blue600 left">fiber_manual_record</i>} className='filled-in' />
                        <Input onChange={this.handleCheckBoxChange} name='group1' type='checkbox' value='yellow' label={<i className="material-icons yellow600 left">fiber_manual_record</i>} className='filled-in'/>
                        <Input onChange={this.handleCheckBoxChange} name='group1' type='checkbox' value='green' label={<i className="material-icons green600 left">fiber_manual_record</i>} className='filled-in'  />
                        <Input onChange={this.handleCheckBoxChange} name='group1' type='checkbox' value='orange' label={<i className="material-icons orange600 left">fiber_manual_record</i>} className='filled-in' />
                      </Col>
                    </Row>
                  <Button onClick={ handleSubmit } className="blue lighten-2">Submit</Button>
                </Row>
              </Col>
              <Col s={3} m={3}>
                <Card className="z-depth-1" >
                  <Collection defaultValue="1">
                    {filtered() && filtered().map(list => {
                      return  <CollectionItem key={ list.id }><MoveOver task={ task } id={ list.id } list={ list }/></CollectionItem>
                    })}
                  </Collection>
                  <Button onClick={ handleDelete } className="red"><Icon large>delete</Icon><br/></Button>
                </Card>
              </Col>
            </Row>
        </div>
      </Modal>
      </>)
    }

  render(){
    console.log(this.state)
    return (
    <div >
      {this.modalInfo()}
    </div>
    )
  }
}

function msp (state){
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(msp, {updateCurrentUserAction})(Task))
