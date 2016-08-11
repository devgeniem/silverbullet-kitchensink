import React, { PropTypes } from 'react';
import { Button, Table, Alert, Modal, DropdownButton, MenuItem, Row, Col } from 'react-bootstrap';
import EditBubble from '../../components/EditBubble';
var s = {}; //import withStyles from 'withStyles';
//import s from './customer-profile.scss';
import api from '../../services/api';
import { formatThousands } from '../../services/utils';
import { connect } from "react-redux";
import { addNotification } from "../../actions/notification";
import { loadCustomer, loadContactPersons } from "../../actions/customerActions";
import { loadUsers } from "../../actions/userActions";

class CustomerProfile extends React.Component {

    static propTypes = {
        params: React.PropTypes.object
    };

    static contextTypes = {
        router: React.PropTypes.object
    };


    constructor(props) {
        super(props);
        this.state = {
            showEditPencil: {},
            showEdit: {}
        };
    }

    componentWillMount() {
        if (!this.props.customer || this.props.customer.id !== this.props.params.id)
            this.props.loadCustomer(this.props.params.id);

        if (!this.props.users)
            this.props.loadUsers();

        if (!this.props.contactPersons)
            this.props.loadContactPersons(this.props.params.id);
    }

/*
    loadUsers() {
        api.get('/users')
            .then(users => {
                this.setState({
                    users: users
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    loadCustomer() {
        api.get('/customer/'+ this.props.params.id)
            .then(customer => {
                this.setState({
                    customer: customer
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    loadContactPersons() {
        api.get('/contact-persons?customer='+ this.props.params.id)
            .then(contactpersons => {
                this.setState({
                    contactPersons:contactpersons
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }
*/

    showEditPencil(attribute) {
        var { showEditPencil } = this.state;
        if (!showEditPencil[attribute]) {
            showEditPencil[attribute] = true;
            this.setState({
                showEditPencil: showEditPencil
            });
        }
    }

    toggleEdit(attribute) {
        var { showEdit } = this.state;
        showEdit[attribute] = !showEdit[attribute];
        this.setState({
            showEdit: showEdit
        });
    }

    hideEditPencil(attribute) {
        var { showEditPencil } = this.state;
        if (showEditPencil[attribute]) {
            showEditPencil[attribute] = false;
            this.setState({
                showEditPencil: showEditPencil
            });
        }
    }

    onActionUpdate(attribute, value) {
        var { customer } = this.state;
        var data = {};
        data[attribute] = value;
        api.put('/customer/'+customer.id, data)
            .then(() => {
                this.loadCustomer();
            })
            .catch((err) => {
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
        var { showEdit, showEditPencil } = this.state;

        console.log('PROPS->',this.props);

        var { customer, users, contactPersons } = this.props;


        return (
            <div className={s.root}>

                <Row>
                    <Col className="text-center">
                        <img src={"/api/customer/logo/"+customer.id} height="320"/>
                        <h1 onMouseOver={()=>this.showEditPencil('name')} onMouseOut={()=>this.hideEditPencil('name')}>
                            {customer.name}
                            <EditBubble
                                key="edit-bubble-name"
                                type="text"
                                label="Name"
                                name="name"
                                value={customer.name}
                                show={showEdit.name}
                                showPencil={showEditPencil.name}
                                onSuccess={d => this.onActionUpdate('name', d)}
                                toggleShow={() => this.toggleEdit('name')}
                            />
                        </h1>
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center">
                        <h4 onMouseOver={()=>this.showEditPencil('contactPerson')} onMouseOut={()=>this.hideEditPencil('contactPerson')}>
                            Contact person: {customer.contactPerson ? customer.contactPerson.name : ''}
                            <EditBubble
                                type="user"
                                dropdownValues={contactPersons}
                                label="Contact person"
                                name="contactPerson"
                                value={customer.contactPerson ? customer.contactPerson.id : null}
                                show={showEdit.contactPerson}
                                showPencil={showEditPencil.contactPerson}
                                onSuccess={d => this.onActionUpdate('contactPerson', d)}
                                toggleShow={() => this.toggleEdit('contactPerson')}
                            />
                        </h4>
                    </Col>
                </Row>

                <Row>
                    <Col className="text-center">
                        <h4 onMouseOver={()=>this.showEditPencil('accountManager')} onMouseOut={()=>this.hideEditPencil('accountManager')}>
                            Account manager: {customer.accountManager ? customer.accountManager.firstname+' '+customer.accountManager.lastname : ''}
                            <EditBubble
                                type="user"
                                dropdownValues={users}
                                label="Account manager"
                                name="accountManager"
                                value={customer.accountManager ? customer.accountManager.id : null}
                                show={showEdit.accountManager}
                                showPencil={showEditPencil.accountManager}
                                onSuccess={d => this.onActionUpdate('accountManager', d)}
                                toggleShow={() => this.toggleEdit('accountManager')}
                            />
                        </h4>
                    </Col>
                </Row>

                {customer.projects && customer.projects.length ?
                <Row>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th className="col-xs-6">Projects</th>
                                <th className="col-xs-3">tunnit</th>
                                <th className="col-xs-3">laskutus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.projects.map(project =>
                                <tr key={project.id}>
                                    <td className="col-xs-6" onClick={() => this.context.router.push('/project/'+project.id)}>{project.name}</td>
                                    <td className="col-xs-3" onClick={() => this.context.router.push('/project/'+project.id)}>123</td>
                                    <td className="col-xs-3" onClick={() => this.context.router.push('/project/'+project.id)}>{formatThousands(17000)} &euro;</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row> :
                null }

                {customer.maintenances && customer.maintenances.length ?
                <Row>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th className="col-xs-9">Maintenances</th>
                                <th className="col-xs-3">kk-laskutus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.maintenances.map(maintenance =>
                                <tr key={maintenance.id}>
                                    <td onClick={() => this.context.router.push('/maintenance/'+maintenance.id)}>{maintenance.name}</td>
                                    <td onClick={() => this.context.router.push('/maintenance/'+maintenance.id)}>{formatThousands(150)} &euro;</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row> :
                null }

                {customer.orders && customer.orders.length ?
                <Row>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th className="col-xs-6">Orders</th>
                                <th className="col-xs-3">tunnit</th>
                                <th className="col-xs-3">laskutus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.orders.map(order =>
                                <tr key={order.id}>
                                    <td className="col-xs-6" onClick={() => this.context.router.push('/order/'+order.id)}>{order.title}</td>
                                    <td className="col-xs-3" onClick={() => this.context.router.push('/order/'+order.id)}>123</td>
                                    <td className="col-xs-3" onClick={() => this.context.router.push('/order/'+order.id)}>{formatThousands(17000)} &euro;</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row> :
                null }

                {customer.insourcings && customer.insourcings.length ?
                <Row>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th className="col-xs-6">Insourcings</th>
                                <th className="col-xs-3">kk</th>
                                <th className="col-xs-3">kk-laskutus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.insourcings.map(insourcing =>
                                <tr key={insourcing.id}>
                                    <td className="col-xs-6" onClick={() => this.context.router.push('/insourcing/'+insourcing.id)}>{insourcing.title}</td>
                                    <td className="col-xs-3" onClick={() => this.context.router.push('/insourcing/'+insourcing.id)}>120</td>
                                    <td className="col-xs-3" onClick={() => this.context.router.push('/insourcing/'+insourcing.id)}>{formatThousands(150)} &euro;</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row> :
                null }

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.user.users,
        customer: state.customer.customer,
        contactPersons: state.customer.contactPersons
    };
}

export default withStyles(connect(mapStateToProps, {
    addNotification,
    loadCustomer,
    loadUsers,
    loadContactPersons
})(CustomerProfile), s);
