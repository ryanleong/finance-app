import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const { isOpen } = this.state;

        this.setState({
            isOpen: !isOpen,
        });
    }

    renderCorrectMenu(signedIn) {
        if (signedIn) {
            return (
                <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Transactions
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag={Link} to="/transactions">View All</DropdownItem>
                            <DropdownItem tag={Link} to="/transactions/add">Add New Transaction</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Accounts
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag={Link} to="/accounts">View All</DropdownItem>
                            <DropdownItem tag={Link} to="/accounts/add">Add New Account</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Categories
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem tag={Link} to="/categories">View All</DropdownItem>
                            <DropdownItem tag={Link} to="/categories/add">Add New Category</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <NavItem>
                        <NavLink tag={Link} to="/signout">Sign Out</NavLink>
                    </NavItem>
                </Nav>
            );
        }

        return (
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to="/signin">Signin</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/signup">Signup</NavLink>
                </NavItem>
            </Nav>
        );
    }

    render() {
        const signedIn = !_.isEmpty(this.props.authentication);

        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to={!signedIn ? '/' : '/dashboard'}>Finance</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    {this.renderCorrectMenu(signedIn)}
                </Collapse>
            </Navbar>
        );
    }
}


Navigation.propTypes = {
    authentication: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    authentication: state.authentication,
});

export default connect(mapStateToProps, {})(Navigation);
