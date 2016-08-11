import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import EditBubble from '../../components/EditBubble';
var s = {}; //import withStyles from 'withStyles';
//import s from './insourcing-profile.scss';
import api from '../../services/api';
import { formatThousands, getCurrencySymbol } from '../../services/utils';
import { connect } from "react-redux";
import { addNotification } from "../../actions/notification";

class InsourcingProfile extends React.Component {

    static propTypes = {
        params: React.PropTypes.object
    };

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        insourcing: {},
        showEditPencil: {},
        showEdit: {},
        users: []
    }

    componentDidMount() {
        this.loadInsourcing();
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

    loadInsourcing() {
        api.get('/insourcing/'+ this.props.params.id)
            .then(insourcing => {
                this.setState({
                    insourcing: insourcing
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    onActionDelete() {
        var { insourcing } = this.state;
        if (confirm("Please confirm that you want to permanently DELETE the insourcing?"))
            api.del('/insourcing/'+insourcing.id)
                .then(() => {
                    this.props.addNotification('success', 'Insourcing deleted');
                    this.context.router.push('/insourcings');
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
        var { insourcing } = this.state;
        var data = {};
        if (attribute === "billing") {
            data[attribute] = value.value;
            data.currency = value.currencyValue;
        } else {
            data[attribute] = value;
        }
        api.put('/insourcing/'+insourcing.id, data)
            .then(() => {
                this.loadInsourcing();
            })
            .catch((err) => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    render() {
        var { formOptions } = this.props;
        var { insourcing, showEdit, showEditPencil, users } = this.state;
        return (
            <div className={s.root}>
                <Row>
                    <Col xs={10} xsOffset={2}>
                        <h1>Insourcing</h1>
                    </Col>
                </Row>
                <Row><Col xs={2} xsOffset={2}><strong>Order number</strong></Col><Col xs={7}>{insourcing.slug}</Col></Row>
                <Row><Col xs={2} xsOffset={2}><strong>Customer</strong></Col><Col xs={7}>{insourcing.customer ? insourcing.customer.name : null}</Col></Row>
                <Row><Col xs={2} xsOffset={2}><strong>Contact person</strong></Col><Col xs={7}>{insourcing.contactPerson ? insourcing.contactPerson.name : null}</Col></Row>
                <Row>
                    <Col xs={2} xsOffset={2}>
                        <strong>Invoicer</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('invoicer')} onMouseOut={()=>this.hideEditPencil('invoicer')}>
                        {insourcing.invoicer ? insourcing.invoicer.firstname + ' ' + insourcing.invoicer.lastname : null}
                        <EditBubble
                                type="user"
                                dropdownValues={users}
                                label="Invoicer"
                                name="invoicer"
                                value={insourcing.invoicer ? insourcing.invoicer.id : null}
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
                        {insourcing.title}
                        <EditBubble
                                key="edit-bubble-title"
                                type="text"
                                label="Title"
                                name="title"
                                value={insourcing.title}
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
                        {insourcing.state}
                        <EditBubble
                                type="dropdown"
                                dropdownValues={formOptions.insourcingStates}
                                label="State"
                                name="state"
                                value={insourcing.state}
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
                        {insourcing.jiraLink}
                        <EditBubble
                                type="text"
                                label="Jira issue"
                                name="jiraLink"
                                value={insourcing.jiraLink}
                                show={showEdit.jiraLink}
                                showPencil={showEditPencil.jiraLink}
                                onSuccess={d => this.onActionUpdate('jiraLink', d)}
                                toggleShow={() => this.toggleEdit('jiraLink')}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xsOffset={2}>
                        <strong>Price</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('billing')} onMouseOut={()=>this.hideEditPencil('billing')}>
                        {formatThousands(insourcing.billing)} {getCurrencySymbol(formOptions, insourcing.currency)}
                        <EditBubble
                                type="currency"
                                label="Price"
                                name="billing"
                                value={insourcing.billing}
                                currencyValue={insourcing.currency}
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
                        <strong>Monthly allocation</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('allocation')} onMouseOut={()=>this.hideEditPencil('allocation')}>
                        {insourcing.allocation} {insourcing.fixed ? ' (fixed)' : null}
                        <EditBubble
                                type="text"
                                label="Monthly allocation"
                                name="allocation"
                                value={insourcing.allocation}
                                show={showEdit.allocation}
                                showPencil={showEditPencil.allocation}
                                onSuccess={d => this.onActionUpdate('allocation', d)}
                                toggleShow={() => this.toggleEdit('allocation')}
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
})(InsourcingProfile), s);
