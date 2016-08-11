import React, { PropTypes } from 'react';
import { Form, Alert, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Col } from 'react-bootstrap';
import Select from 'react-select';
var s = {}; //import withStyles from 'withStyles';
//import s from './add-new-maintenance.scss';
import api from '../../services/api';
import { formatThousands, removeItemByPropVal } from '../../services/utils';
import { connect } from "react-redux";
import { addNotification } from "../../actions/notification";

class AddNewMaintenance extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        submitDisabled: true,
        formData: {
            customerName: '',
            contactPersonName: '',
            title: '',
            state: '',
            billing: '',
            currency: 'EUR',
            docLink: '',
            invoicer: '',
            leadDeveloper: ''
        },
        validationState: {
            customerName: '',
            contactPersonName: '',
            title: '',
            state: '',
            billing: '',
            docLink: '',
            invoicer: '',
            leadDeveloper: ''
        },
        users: [],
        customers: [],
        contactPersons: [],
        allContactPersons: [],
        maintenanceStates: ['Standard', 'Premium', 'VIP', 'Custom'],
    };

    componentDidMount() {
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
        api.get('/customers')
            .then(customers => {
                if (customers && customers.map) {
                    this.setState({
                        customers: customers.map(customer => { return { value: customer.name, label: customer.name, id: customer.id, contactPersonName: (customer.contactPerson ? customer.contactPerson.name : null) }})
                    });
                }
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
        api.get('/contact-persons')
            .then(contactPersons => {
                if (contactPersons && contactPersons.map) {
                    this.setState({
                        allContactPersons: contactPersons.map(contactPerson => { return { value: contactPerson.name, label: contactPerson.name, customerId: contactPerson.customer }}),
                        contactPersons: contactPersons.map(contactPerson => { return { value: contactPerson.name, label: contactPerson.name, customerId: contactPerson.customer }}),
                    });
                }
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        var data = this.state.formData;
        data.billing = data.billing.toString().replace(/\s+/g, "");
        api.post('/maintenance', data)
            .then(() => {
                this.props.addNotification('success', 'New maintenance deal created');
                this.context.router.push('/maintenances');
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    updateSubmitState(validationState) {
        var submitDisabled = false;
        Object.keys(validationState).forEach(key => {
            if (validationState[key] !== 'success') submitDisabled = true;
        });
        this.setState({
            submitDisabled: submitDisabled
        });
    }

    updateValidationState(field, data) {
        var validationState = this.state.validationState;
        if (data !== '') {
            validationState[field] = 'success';
        } else {
            validationState[field] = 'error';
        }
        this.updateSubmitState(validationState);
        this.setState({
            validationState: validationState
        });
    }

    handleFormValueChange(field, data) {
        var { formData, customers, contactPersons, allContactPersons } = this.state;
        formData[field] = data;
        this.updateValidationState(field, data);
        // add value to customers array if not already there
        if (field === 'customerName') {
            customers = removeItemByPropVal(customers, 'new', true);
            if (data && customers && customers.forEach) {
                let foundCustomer;
                customers.forEach(customer => {
                    if (customer.value === data) foundCustomer = customer;
                });
                if (!foundCustomer) {
                    contactPersons = [];
                    customers.push({ value: data, label: data+' (new)', new: true });
                } else {
                    contactPersons = allContactPersons.filter(contactPerson => contactPerson.customerId === foundCustomer.id);
                    if (foundCustomer.contactPersonName) {
                        field = 'contactPersonName';
                        data = foundCustomer.contactPersonName;
                        formData[field] = data;
                        this.updateValidationState(field, foundCustomer.contactPersonName);
                    }
                }
            } else {
                // when customer is cleared, show all contact persons
                contactPersons = this.state.allContactPersons;
            }
        }
        // add value to contactPersons array if not already there
        if (field === 'contactPersonName') {
            contactPersons = removeItemByPropVal(contactPersons, 'new', true);
            if (data && contactPersons && contactPersons.forEach) {
                let found = false;
                contactPersons.forEach(contactPerson => {
                    if (contactPerson.value === data) found = true;
                });
                if (!found) {
                    contactPersons.push({ value: data, label: data+' (new)', new: true });
                }
            }
        }
        this.setState({
            formData: formData,
            customers: customers,
            contactPersons: contactPersons
        });
    }

    render() {
        const { users, customers, contactPersons, maintenanceStates, formData, validationState, billingTotal } = this.state;
        const { formOptions } = this.props

        return (
            <div className={s.root}>

                <Form onSubmit={e => this.handleSubmit(e)} horizontal>

                    <h3>New maintenance</h3>

                    <hr />

                    <FormGroup controlId="customerName" validationState={validationState.customerName}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Customer
                        </Col>
                        <Col sm={6}>
                            <Select
                                options={customers}
                                value={formData.customerName}
                                placeholder="Type a name or select from list"
                                allowCreate={true}
                                onChange={(option) => this.handleFormValueChange('customerName', (option ? option.value : ''))}
                                onBlur={(e) => console.log(e)}
                                filterOptions={(options, filter, values) => {
                                    // Filter already selected values
                                    let filteredOptions = options.filter(option => {
                                      return !values || !(values.includes(option));
                                    });
                                    // Filter by label
                                    if (filter !== undefined && filter != null && filter.length > 0) {
                                      filteredOptions = filteredOptions.filter(option => {
                                        return RegExp(filter, 'ig').test(option.label);
                                      });
                                    }
                                    // Append Addition option
                                    if (filteredOptions.length == 0) {
                                      filteredOptions.push({
                                        label:  <span><strong>Create new customer:</strong>: {filter}</span>,
                                        value:  filter,
                                        create: true,
                                      });
                                    }
                                    return filteredOptions;
                                }}
                            />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="contactPersonName" validationState={validationState.contactPersonName}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Contact person
                        </Col>
                        <Col sm={6}>
                            <Select
                                options={contactPersons}
                                value={formData.contactPersonName}
                                placeholder="Type a name or select from list"
                                allowCreate={true}
                                onChange={(option) => this.handleFormValueChange('contactPersonName', (option ? option.value : ''))}
                                onBlur={(e) => console.log(e)}
                                filterOptions={(options, filter, values) => {
                                    // Filter already selected values
                                    let filteredOptions = options.filter(option => {
                                      return !values || !(values.includes(option));
                                    });
                                    // Filter by label
                                    if (filter !== undefined && filter != null && filter.length > 0) {
                                      filteredOptions = filteredOptions.filter(option => {
                                        return RegExp(filter, 'ig').test(option.label);
                                      });
                                    }
                                    // Append Addition option
                                    if (filteredOptions.length == 0) {
                                      filteredOptions.push({
                                        label:  <span><strong>Create new contact person:</strong>: {filter}</span>,
                                        value:  filter,
                                        create: true,
                                      });
                                    }
                                    return filteredOptions;
                                }}
                            />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="title" validationState={validationState.title}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Maintenance title
                        </Col>
                        <Col sm={6}>
                            <FormControl type="text" value={formData.title} placeholder="Name of the service" onChange={e => this.handleFormValueChange('title', e.target.value)} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="state" validationState={validationState.state}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Plan
                        </Col>
                        <Col sm={6}>
                            <FormControl componentClass="select" onChange={e => this.handleFormValueChange('state', e.target.value)}>
                                <option value="">Select maintenance plan</option>
                                {maintenanceStates.map(val => <option value={val}>{val}</option>)}
                            </FormControl>
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="billing" validationState={validationState.billing}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Billing
                        </Col>
                        <Col sm={4}>
                            <FormControl type="text" value={formatThousands(formData.billing)} placeholder="Monthly cost" onChange={e => this.handleFormValueChange('billing', e.target.value)} />
                            <FormControl.Feedback />
                        </Col>
                        <Col sm={2}>
                            <FormControl componentClass="select" value={formData.currency} onChange={e => this.handleFormValueChange('currency', e.target.value)}>
                                {formOptions.currencies ? formOptions.currencies.map(val => <option value={val.value}>{val.symbol} ({val.value})</option>) : null}
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="docLink" validationState={validationState.docLink}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Link to documentation
                        </Col>
                        <Col sm={6}>
                            <FormControl type="text" value={formData.docLink} placeholder="Paste link" onChange={e => this.handleFormValueChange('docLink', e.target.value)} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="invoicer" validationState={validationState.invoicer}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Invoicer
                        </Col>
                        <Col sm={6}>
                            <FormControl componentClass="select" onChange={e => this.handleFormValueChange('invoicer', e.target.value)}>
                                <option value="">Select user managing invoicing</option>
                                {users.map(val => <option value={val.id}>{val.firstname} {val.lastname}</option>)}
                            </FormControl>
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="leadDeveloper" validationState={validationState.leadDeveloper}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Lead developer
                        </Col>
                        <Col sm={6}>
                            <FormControl componentClass="select" onChange={e => this.handleFormValueChange('leadDeveloper', e.target.value)}>
                                <option value="">Select lead developer</option>
                                {users.map(val => <option value={val.id}>{val.firstname} {val.lastname}</option>)}
                            </FormControl>
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <Button type="submit" disabled={this.state.submitDisabled} bsSize="large" bsStyle="primary" className="pull-right">Add deal</Button>

                </Form>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        formOptions: state.settings.formOptions
    };
}

export default withStyles(connect(mapStateToProps, {
    addNotification
})(AddNewMaintenance), s);
