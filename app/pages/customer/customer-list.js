import React, { PropTypes } from 'react';
import { Button, Table, Alert, Modal, DropdownButton, MenuItem } from 'react-bootstrap';
var s = {}; //import withStyles from 'withStyles';
//import s from './customer-list.scss';
import api from '../../services/api';
import { connect } from "react-redux";
import { addNotification } from "../../actions/notification";

class CustomerList extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        customers: []
    }

    componentDidMount() {
        this.loadCustomers();
    }

    loadCustomers() {
        api.get('/customers')
            .then(customers => {
                this.setState({
                    customers: customers
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    onActionDelete(customer) {
        if (confirm("Please confirm that you want to permanently DELETE the customer?"))
            api.del('/customer/'+customer.id)
                .then(() => {
                    this.props.addNotification('success', 'Customer deleted');
                    this.loadCustomers();
                })
                .catch((err) => {
                    this.props.addNotification('danger', err.text || err.message || err);
                });
    }

    render() {
        console.log(this.props);
        return (
            <div className={s.root}>

                <Button onClick={() => this.context.router.push('/customer/new')} bsStyle="primary">Add new customer</Button>

                <p></p>

                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customers.map(customer =>
                            <tr key={customer.id}>
                                <td onClick={() => this.context.router.push('/customer/'+customer.id)}>{customer.name}</td>
                                <td>
                                    <DropdownButton bsSize="xsmall" title="Action" id={`dropdown-action-${customer.id}`} pullRight={true}>
                                        <MenuItem onSelect={(key, e) => this.onActionDelete(customer)}>Delete</MenuItem>
                                    </DropdownButton>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, {
    addNotification
})(CustomerList);
