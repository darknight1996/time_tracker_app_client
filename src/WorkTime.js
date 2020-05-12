import React, { Component, useState  } from 'react';
import NavigationBar from './NavigationBar';
import { Container, Input, Button, Label, FormGroup, Form, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'moment'

class WorkTime extends Component {

    constructor(props) {
        super(props)
  
        this.state = {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: new Date(),
            position: '',
            timePeriods: [],
            startDate: '',
            startTime: '',
            endTime: ''
        }
  
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    } 

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/employee/' + this.props.match.params.id);
        const json = await response.json();

        this.setState({
            id: json.id,
            firstName: json.firstName,
            lastName: json.lastName,
            email: json.email,
            dateOfBirth: json.dateOfBirth.substring(0,10),
            position: json.position,
            timePeriods: json.timePeriods
        });
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [name]: value
        });
    }

    async handleSubmit(event) {
        let response = await fetch(`http://localhost:8080/api/addTime/` + this.state.id, {
          method : 'POST',
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({
            startDate: this.state.startDate + 'T' + this.state.startTime + ':00.000+0000',
            endDate: this.state.startDate + 'T' + this.state.endTime + ':00.000+0000',
            employee: {
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                dateOfBirth: this.state.dateOfBirth,
                position: this.state.position
            }
          }),
        });

        if (!response.ok) {
            alert("End Time must be greater than Start Time!");
        } else {
            alert("Time Period has been added.")
        }
        
        event.preventDefault();
    }

    async delete(id) {
        await fetch(`http://localhost:8080/api/time/delete/${id}` , {
            method: 'DELETE'
        }).then(() => {
            this.setState({
                timePeriods: this.state.timePeriods.filter(timePeriod => timePeriod.id !== id)
            });
        });
    }

    render() {
        Moment.locale('en');
        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Work Time</h1>
                    <h3 style={{textAlign: 'center'}}>Employee: {this.state.firstName} {this.state.lastName}</h3>
                    <br></br>
                    <div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="startDate">Date</Label>
                                <Input type="date" name="startDate" id="startDate" required onChange={this.handleChange}  />
                                <Label>Start Time</Label>
                                <Input type="time" name="startTime" id="startTime" required onChange={this.handleChange}  />   
                                <Label >End Time</Label>
                                <Input type="time" name="endTime" id="endTime" required onChange={this.handleChange} />                 
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" type="submit">Add Time</Button>{' '}
                            </FormGroup>
                        </Form>   
                    </div>
                    <div>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Total Hours</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.timePeriods.map( timePeriod =>
                                        <tr>
                                            <td>{Moment(timePeriod.startDate).zone(0).format('YYYY-MM-DD HH:mm')}</td>
                                            <td>{Moment(timePeriod.endDate).zone(0).format('YYYY-MM-DD HH:mm')}</td>
                                            <td>{Moment(timePeriod.endDate).diff(timePeriod.startDate, 'hours')} h</td>
                                            <td><Button color="secondary" onClick={() => {if (window.confirm('Are you sure you wish to delete this time period?')) this.delete(timePeriod.id)}}>Delete</Button></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <Link to={{ pathname: `/employee/times/year/2020/${this.state.id}`}}><Button color="info">See Year Report</Button></Link>
                    </div>
                    <br></br>
                </Container>
            </div>
        );
    }
}

export default WorkTime;