import React, { PropTypes } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import EditBubble from '../../components/EditBubble';
var s = {}; //import withStyles from 'withStyles';
//import s from './order-profile.scss';
import api from '../../services/api';
import { formatThousands, getCurrencySymbol } from '../../services/utils';
import { connect } from "react-redux";
import { addNotification } from "../../actions/notification";

class OrderProfile extends React.Component {

    static propTypes = {
        params: React.PropTypes.object
    };

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        order: {},
        showEditPencil: {},
        showEdit: {},
        users: []
    }

    componentDidMount() {
        this.loadOrder();
        this.loadUsers();
    }

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

    loadOrder() {
        api.get('/order/'+ this.props.params.id)
            .then(order => {
                this.setState({
                    order: order
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    onActionDelete() {
        var { order } = this.state;
        if (confirm("Please confirm that you want to permanently DELETE the order?"))
            api.del('/order/'+order.id)
                .then(() => {
                    this.props.addNotification('success', 'Order deleted');
                    this.context.router.push('/orders');
                })
                .catch((err) => {
                    this.props.addNotification('danger', err.text || err.message || err);
                });
    }

    toggleEdit(attribute) {
        var { showEdit } = this.state;
        showEdit[attribute] = !showEdit[attribute];
        this.setState({
            showEdit: showEdit
        });
    }

    showEditPencil(attribute) {
        var { showEditPencil } = this.state;
        if (!showEditPencil[attribute]) {
            showEditPencil[attribute] = true;
            this.setState({
                showEditPencil: showEditPencil
            });
        }
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
        var { order } = this.state;
        var data = {};
        if (attribute === "billing") {
            data[attribute] = value.value;
            data.currency = value.currencyValue;
        } else {
            data[attribute] = value;
        }
        api.put('/order/'+order.id, data)
            .then(() => {
                this.loadOrder();
            })
            .catch((err) => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    render() {
        var { formOptions } = this.props;
        var { order, showEdit, showEditPencil, users } = this.state;
        return (
            <div className={s.root}>
                <Row>
                    <Col xs={10} xsOffset={2}>
                        <h1>Order</h1>
                    </Col>
                </Row>
                <Row><Col xs={2} xsOffset={2}><strong>Order number</strong></Col><Col xs={7}>{order.slug}</Col></Row>
                <Row><Col xs={2} xsOffset={2}><strong>Customer</strong></Col><Col xs={7}>{order.customer ? order.customer.name : null}</Col></Row>
                <Row><Col xs={2} xsOffset={2}><strong>Contact person</strong></Col><Col xs={7}>{order.contactPerson ? order.contactPerson.name : null}</Col></Row>
                <Row>
                    <Col xs={2} xsOffset={2}>
                        <strong>Invoicer</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('invoicer')} onMouseOut={()=>this.hideEditPencil('invoicer')}>
                        {order.invoicer ? order.invoicer.firstname + ' ' + order.invoicer.lastname : null}
                        <EditBubble
                                type="user"
                                dropdownValues={users}
                                label="Invoicer"
                                name="invoicer"
                                value={order.invoicer ? order.invoicer.id : null}
                                show={showEdit.invoicer}
                                showPencil={showEditPencil.invoicer}
                                onSuccess={d => this.onActionUpdate('invoicer', d)}
                                toggleShow={() => this.toggleEdit('invoicer')}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xsOffset={2}>
                        <strong>Title</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('title')} onMouseOut={()=>this.hideEditPencil('title')}>
                        {order.title}
                        <EditBubble
                                key="edit-bubble-title"
                                type="text"
                                label="Title"
                                name="title"
                                value={order.title}
                                show={showEdit.title}
                                showPencil={showEditPencil.title}
                                onSuccess={d => this.onActionUpdate('title', d)}
                                toggleShow={() => this.toggleEdit('title')}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xsOffset={2}>
                        <strong>State</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('state')} onMouseOut={()=>this.hideEditPencil('state')}>
                        {order.state}
                        <EditBubble
                                type="dropdown"
                                dropdownValues={formOptions.orderStates}
                                label="State"
                                name="state"
                                value={order.state}
                                show={showEdit.state}
                                showPencil={showEditPencil.state}
                                onSuccess={d => this.onActionUpdate('state', d)}
                                toggleShow={() => this.toggleEdit('state')}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xsOffset={2}>
                        <strong>Jira issue</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('jiraLink')} onMouseOut={()=>this.hideEditPencil('jiraLink')}>
                        {order.jiraLink}
                        <EditBubble
                                type="text"
                                label="Jira issue"
                                name="jiraLink"
                                value={order.jiraLink}
                                show={showEdit.jiraLink}
                                showPencil={showEditPencil.jiraLink}
                                onSuccess={d => this.onActionUpdate('jiraLink', d)}
                                toggleShow={() => this.toggleEdit('jiraLink')}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xsOffset={2}>
                        <strong>Billing</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('billing')} onMouseOut={()=>this.hideEditPencil('billing')}>
                        {formatThousands(order.billing)} {getCurrencySymbol(formOptions, order.currency)}
                        <EditBubble
                                type="currency"
                                label="Billing"
                                name="billing"
                                value={order.billing}
                                currencyValue={order.currency}
                                currencyDropdownValues={formOptions.currencies}
                                show={showEdit.billing}
                                showPencil={showEditPencil.billing}
                                onSuccess={d => this.onActionUpdate('billing', d)}
                                toggleShow={() => this.toggleEdit('billing')}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xsOffset={2}>
                        <strong>Work estimate</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('estimatedHours')} onMouseOut={()=>this.hideEditPencil('estimatedHours')}>
                        {order.estimatedHours} {order.fixed ? ' (fixed)' : null}
                        <EditBubble
                                type="text"
                                label="Work estimate"
                                name="estimatedHours"
                                value={order.estimatedHours}
                                show={showEdit.estimatedHours}
                                showPencil={showEditPencil.estimatedHours}
                                onSuccess={d => this.onActionUpdate('estimatedHours', d)}
                                toggleShow={() => this.toggleEdit('estimatedHours')}
                            />
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        formOptions: state.settings ? state.settings.formOptions : {}
    };
}

export default withStyles(connect(mapStateToProps, {
    addNotification
})(OrderProfile), s);
