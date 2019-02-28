import React from 'react';
import { Button, Modal, Card, Row, Input, Col } from 'react-materialize'
import { connect } from "react-redux"

class TaskForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: '',
      description: '',
      due_date: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleTask = (event) => {
    event.preventDefault()
    return (
      fetch('http://localhost:3000/api/v1/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
         name: this.state.name,
         description: this.state.description,
         due_date: this.state.due_date,
         list_id: this.props.id
      })
    })
    .then(res => res.json())
    .then(window.location.reload())
    )
  }

  modalTrigger = () => {
    return (
      <Card className="opacity grey ligthen-3">New Task</Card>
    )
  }
  render(){
    const { handleChange, handleSubmit } = this
    return (
      <Modal
        className="Center model-close"
        header="Create A New Task!"
        trigger={this.modalTrigger()}>
          <Row >
            <Input onChange={ handleChange } s={6} label='Name of Team' name="name"  />
            <Input s={6} label='Due Date' name='due_date' type='date' onChange={ handleChange} />
            <Input onChange={ handleChange } s ={12} label='descritption' type="textarea" name="descritption"  />
              <Row>
                <Col s={3}></Col>
                <Col s={3} m={8}>
                  <Input name='group1' type='checkbox' value='red' label='Red' className='filled-in' />
                  <Input name='group1' type='checkbox' value='yellow' label='Yellow' className='filled-in'/>
                  <Input name='group1' type='checkbox' value='green' label='Green' className='filled-in'  />
                  <Input name='group1' type='checkbox' value='blue' label='Blue' className='filled-in' />
                </Col>
              </Row>
            <Button onClick={ handleSubmit } className="blue lighten-2">Submit</Button>
          </Row>
      </Modal>
    )
  }
}

function msp(state){
  return {
    currentUser: state.currentUser
  }
}

export default connect(msp)(TaskForm)
