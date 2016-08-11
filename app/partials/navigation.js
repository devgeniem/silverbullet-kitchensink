import React from 'react';
import { Navbar, Nav, NavItem, Dropdown, NavDropdown, MenuItem, Glyphicon, Button } from 'react-bootstrap';
import session from '../services/session';

export default class Navigation extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        isLoaded: false,
        isLoggedIn: false,
        isSuperAdmin: false,
        isAdmin: false,
        isManager: false,
        user: {}
    };

    componentDidMount() {
        var user = session.getUser();
        if (user && user.id) {
            this.setState({
                isLoaded: true,
                isLoggedIn: true,
                isSuperAdmin: user.role === 'superadmin',
                isAdmin: user.role === 'admin',
                isManager: user.role === 'manager',
                user: user
            });
        } else {
            this.setState({
                isLoaded: true
            });
        }
    }

    logout() {
        session.logout();
        window.location.pathname = '/';
    }

    navigateTo(e, url) {
        this.context.router.push(url);
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        if (this.state.isLoaded) {
            if (this.state.isLoggedIn) {
                return (
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                Geniem Oy
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Nav bsStyle="pills">
                            <NavItem onClick={(e) => this.navigateTo(e, "/dashboard")}>Dashboard</NavItem>
                            <Dropdown id="dropdown-customers" componentClass="li">
                                <a href="/customers" onClick={(e) => this.navigateTo(e, "/customers")} style={{display: 'inline-block', paddingRight: 0 }}>Customers</a>
                                <Dropdown.Toggle useAnchor style={{display: 'inline-block', paddingLeft: 0 }}>
                                    &nbsp;
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{minWidth: '200px'}}>
                                    <MenuItem onClick={(e) => this.navigateTo(e, "/orders")}>
                                        Orders
                                        <Button onClick={(e) => this.navigateTo(e, "/order/new")} bsStyle="primary" className="pull-right" bsSize="xsmall">
                                            <Glyphicon glyph="plus-sign"/>
                                        </Button>
                                    </MenuItem>
                                    <MenuItem onClick={(e) => this.navigateTo(e, "/maintenances")}>
                                        Maintenance
                                        <Button onClick={(e) => this.navigateTo(e, "/maintenance/new")} bsStyle="primary" className="pull-right" bsSize="xsmall">
                                            <Glyphicon glyph="plus-sign" />
                                        </Button>
                                    </MenuItem>
                                    <MenuItem onClick={(e) => this.navigateTo(e, "/insourcings")}>
                                        Insourcing
                                        <Button onClick={(e) => this.navigateTo(e, "/insourcing/new")} bsStyle="primary" className="pull-right" bsSize="xsmall">
                                            <Glyphicon glyph="plus-sign" />
                                        </Button>
                                    </MenuItem>
                                    <MenuItem onClick={(e) => this.navigateTo(e,"/invoicings")}>
                                        Invoicing
                                        <Button onClick={(e) => this.navigateTo(e, "/invoicing/new")} bsStyle="primary" className="pull-right" bsSize="xsmall">
                                            <Glyphicon glyph="plus-sign" />
                                        </Button>
                                    </MenuItem>
                                </Dropdown.Menu>
                            </Dropdown>
                            <NavItem onClick={(e) => this.navigateTo(e, "/projects")}>Projects</NavItem>
                            <NavItem onClick={(e) => this.navigateTo(e, "/team")}>Team</NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem>Kirjautunut: <strong>{this.state.user.firstname} {this.state.user.lastname}</strong></NavItem>
                            <NavDropdown id="dropdown-profile" title={false}>
                                <MenuItem onClick={(e) => this.navigateTo(e, "/settings/form-values")}>Settings</MenuItem>
                                <MenuItem onClick={() => this.logout()}>Logout</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar>
                );
            } else {
                return (
                    <Nav bsStyle="pills">
                        <NavItem onClick={(e) => this.navigateTo(e, "/")}>Login</NavItem>
                    </Nav>
                );
            }
        } else {
            return <Nav><NavItem>&nbsp;</NavItem></Nav>;
        }
    }
}
