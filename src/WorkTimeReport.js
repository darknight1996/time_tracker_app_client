import React, { Component, useState  } from 'react';
import NavigationBar from './NavigationBar';
import { Container, Input, Button, Label, FormGroup, Form, Table, Progress } from 'reactstrap';

class WorkTimeReport extends Component {

    constructor(props) {
        super(props)
  
        this.state = {
            items: []
        }
    } 

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/times/year/' + this.props.match.params.year + '/' + this.props.match.params.id);
        const json = await response.json();

        this.setState(
            {items : json}
         );
    }

    render() {
        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Work Time Report</h1>
                    <br></br>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Wort Time</th>
                                <th>Overtime</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.map( item =>
                                    <tr>
                                        <td>{item.monthName}</td>
                                        <td>
                                            <div className="text-center">{item.hours}h / 160 h</div>
                                            <Progress color="success" value={item.percent}></Progress>
                                        </td>
                                        <td>{((item.hours - 160) > 0) ? item.hours - 160 : '0'} h</td>
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

export default WorkTimeReport;