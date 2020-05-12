import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Employees extends Component {
    state = {
        employees : []
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/employees');
        const json = await response.json();

        this.setState(
           {employees : json}
        );
    }

    async delete(id) {
        await fetch(`http://localhost:8080/api/employee/delete/${id}` , {
            method: 'DELETE'
          }).then(() => {
            this.setState({
                employees: this.state.employees.filter(employee => employee.id !== id)
              });
          });
    }

    render() {
        const employees = this.state.employees;
        console.log(employees);

        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Employees</h1>
                    <br></br>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Date of Birth</th>
                                <th>Position</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map( employee =>
                                    <tr>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.dateOfBirth.substring(0,10)}</td>
                                        <td>{employee.position}</td>
                                        <td><Link to={{ pathname: `/employee/time/${employee.id}`}}><Button color="info">Time</Button></Link></td>
                                        <td><Link to={{ pathname: `/employee/edit/${employee.id}`}}><Button color="primary">Edit</Button></Link></td>
                                        <td><Button color="secondary" onClick={() => {if (window.confirm('Are you sure you wish to delete this employee?')) this.delete(employee.id)}}>Delete</Button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Employees;