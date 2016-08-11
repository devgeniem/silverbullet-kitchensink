import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import EditBubble from '../../components/EditBubble';
var s = {}; //import withStyles from 'withStyles';
//import s from './maintenance-profile.scss';
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
        maintenance: {},
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
        api.get('/maintenance/'+ this.props.params.id)
            .then(maintenance => {
                this.setState({
                    maintenance: maintenance
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    onActionDelete() {
        var { maintenance } = this.state;
        if (confirm("Please confirm that you want to permanently DELETE the maintenance?"))
            api.del('/maintenance/'+maintenance.id)
                .then(() => {
                    this.props.addNotification('success', 'Insourcing deleted');
                    this.context.router.push('/maintenances');
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
        var { maintenance } = this.state;
        var data = {};
        if (attribute === "billing") {
            data[attribute] = value.value;
            data.currency = value.currencyValue;
        } else {
            data[attribute] = value;
        }
        api.put('/maintenance/'+maintenance.id, data)
            .then(() => {
                this.loadInsourcing();
            })
            .catch((err) => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    render() {
        var { formOptions } = this.props;
        var { maintenance, showEdit, showEditPencil, users } = this.state;
        return (
            <div className={s.root}>
                <Row>
                    <Col xs={10} xsOffset={2}>
                        <h1>Maintenance</h1>
                    </Col>
                </Row>
                <Row><Col xs={2} xsOffset={2}><strong>Customer</strong></Col><Col xs={7}>{maintenance.customer ? maintenance.customer.name : null}</Col></Row>
                <Row><Col xs={2} xsOffset={2}><strong>Contact person</strong></Col><Col xs={7}>{maintenance.contactPerson ? maintenance.contactPerson.name : null}</Col></Row>
                <Row>
                    <Col xs={2} xsOffset={2}>
                        <strong>Title</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('title')} onMouseOut={()=>this.hideEditPencil('title')}>
                        {maintenance.title}
                        <EditBubble
                                key="edit-bubble-title"
                                type="text"
                                label="Title"
                                name="title"
                                placeholder="Name of the service"
                                value={maintenance.title}
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
                        {maintenance.state}
                        <EditBubble
                                type="dropdown"
                                dropdownValues={formOptions.maintenanceStates}
                                label="State"
                                name="state"
                                value={maintenance.state}
                                show={showEdit.state}
                                showPencil={showEditPencil.state}
                                onSuccess={d => this.onActionUpdate('state', d)}
                                toggleShow={() => this.toggleEdit('state')}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xsOffset={2}>
                        <strong>Monthly billing</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('billing')} onMouseOut={()=>this.hideEditPencil('billing')}>
                        {formatThousands(maintenance.billing)} {getCurrencySymbol(formOptions, maintenance.currency)}
                        <EditBubble
                                type="currency"
                                label="Monthly billing"
                                name="billing"
                                value={maintenance.billing}
                                currencyValue={maintenance.currency}
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
                        <strong>Link to documentation</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('docLink')} onMouseOut={()=>this.hideEditPencil('docLink')}>
                        {maintenance.docLink}
                        <EditBubble
                                type="text"
                                label="Link to documentation"
                                name="docLink"
                                value={maintenance.docLink}
                                show={showEdit.docLink}
                                showPencil={showEditPencil.docLink}
                                onSuccess={d => this.onActionUpdate('docLink', d)}
                                toggleShow={() => this.toggleEdit('docLink')}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xsOffset={2}>
                        <strong>Invoicer</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('invoicer')} onMouseOut={()=>this.hideEditPencil('invoicer')}>
                        {maintenance.invoicer ? maintenance.invoicer.firstname + ' ' + maintenance.invoicer.lastname : null}
                        <EditBubble
                                type="user"
                                dropdownValues={users}
                                label="Invoicer"
                                name="invoicer"
                                value={maintenance.invoicer ? maintenance.invoicer.id : null}
                                show={showEdit.invoicer}
                                showPencil={showEditPencil.invoicer}
                                onSuccess={d => this.onActionUpdate('invoicer', d)}
                                toggleShow={() => this.toggleEdit('invoicer')}
                            />
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} xsOffset={2}>
                        <strong>Lead developer</strong>
                    </Col>
                    <Col xs={7} onMouseOver={()=>this.showEditPencil('leadDeveloper')} onMouseOut={()=>this.hideEditPencil('leadDeveloper')}>
                        {maintenance.leadDeveloper ? maintenance.leadDeveloper.firstname + ' ' + maintenance.leadDeveloper.lastname : null}
                        <EditBubble
                                type="user"
                                dropdownValues={users}
                                label="Lead developer"
                                name="leadDeveloper"
                                value={maintenance.leadDeveloper ? maintenance.leadDeveloper.id : null}
                                show={showEdit.leadDeveloper}
                                showPencil={showEditPencil.leadDeveloper}
                                onSuccess={d => this.onActionUpdate('leadDeveloper', d)}
                                toggleShow={() => this.toggleEdit('leadDeveloper')}
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
