import React, { Component } from 'react';
import {Nav, NavItem, NavLink, Navbar, NavbarBrand} from 'reactstrap';

class NavigationBar extends Component {
    state = {}

    render() {
        return (
            <div>
              <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Time Tracker Application</NavbarBrand>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/employees/">Employees</NavLink>
                    </NavItem> 
                    <NavItem>
                      <NavLink href="/employee/add">Add Employee</NavLink>
                    </NavItem>
                  </Nav>
              </Navbar>
            </div>
        );
    }
}

export default NavigationBar;