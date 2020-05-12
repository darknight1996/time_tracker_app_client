import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Input, Button, Label, FormGroup, Form} from 'reactstrap';

class AddEmployee extends Component {


    constructor(props){
        super(props)
  
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: new Date(),
            position: ''
        }
  
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleChange = this.handleChange.bind(this);
      } 

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [name]: value
        })
    }

    async handleSubmit(event){
        await fetch(`http://localhost:8080/api/employee`, {
          method : 'POST',
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(this.state),
        }).then(() => {
            alert("Employee has been successfully created.");
          });
        
        event.preventDefault();
      }

    render() {


        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Add Employee</h1>
                    <br></br>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input type="text" name="firstName" id="firstName" required 
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input type="text" name="lastName" id="lastName" required
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" required
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="dateOfBirth">Date Of Birth</Label>
                            <Input type="date" name="dateOfBirth" id="dateOfBirth" required
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="position">Postion</Label>
                            <Input type="text" name="position" id="position" required
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default AddEmployee;