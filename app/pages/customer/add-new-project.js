import React, { PropTypes } from 'react';
import { Form, Alert, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Col } from 'react-bootstrap';
import Select from 'react-select';
var s = {}; //import withStyles from 'withStyles';
//import s from './add-new-project.scss';
import api from '../../services/api';
import { formatThousands, removeItemByPropVal } from '../../services/utils';
import { connect } from "react-redux";
import { addNotification } from "../../actions/notification";
import DatePicker from 'react-datepicker';
import moment from 'moment';

class AddNewProject extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        submitDisabled: true,
        formData: {
            customerName: '',
            name: '',
            state: '',
            jiraLink: '',
            deadline: moment(),
            billing: '',
            currency: 'EUR',
            budgetHours: '',
            fixed: false,
            invoicer: '',
            projectManager: '',
            teamMembers: []
        },
        validationState: {
            customerName: '',
            name: '',
            state: '',
            jiraLink: '',
            deadline: '',
            billing: '',
            budgetHours: '',
            invoicer: '',
            projectManager: '',
            teamMembers: ''
        },
        totalBudget: null,
        users: [],
        customers: [],
        allContactPersons: [],
        contactPersons: [],
        projectStates: ['Lead', 'Quote', 'Lost', 'Active', 'Closed'],
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
        data.deadline = data.deadline.format ? data.deadline.format("YYYY-MM-DD") : null;
        api.post('/project', data)
            .then(() => {
                this.props.addNotification('success', 'New project created');
                this.context.router.push('/projects');
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
        var { formData, totalBudget, customers, contactPersons, allContactPersons } = this.state;
        if (field === 'fixed') {
            formData[field] = !formData.fixed;
        } else if (field === 'teamMembers') {
            formData[field] = [data];
            this.updateValidationState(field, data);
        } else if (field === 'deadline') {
            formData[field] = data;
            this.updateValidationState(field, data.format("YYYY-MM-DD"));
        } else {
            formData[field] = data;
            this.updateValidationState(field, data);
        }
        if ((field === 'billing' || field === 'budgetHours') && (formData.budgetHours && formData.billing)) {
            totalBudget = formData.billing.toString().replace(/\s+/g, "") * formData.budgetHours;
        }
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
            totalBudget: totalBudget,
            customers: customers,
            contactPersons: contactPersons
        });
    }

    getCurrentCurrencySymbol() {
        const { formOptions } = this.props;
        var symbol = '';
        if (formOptions && formOptions.currencies && formOptions.currencies.forEach) {
            formOptions.currencies.forEach(currency => {
                if (currency.value === this.state.formData.currency) symbol = currency.symbol;
            });
        }
        return symbol;
    }

    render() {
        const { users, customers, contactPersons, projectStates, formData, validationState, totalBudget } = this.state;
        const { formOptions } = this.props;
        return (
            <div className={s.root}>

                <Form onSubmit={e => this.handleSubmit(e)} horizontal>

                    <h3>New project</h3>

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

                    <FormGroup controlId="name" validationState={validationState.name}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Project name
                        </Col>
                        <Col sm={6}>
                            <FormControl type="text" value={formData.name} placeholder="Name" onChange={e => this.handleFormValueChange('name', e.target.value)} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="state" validationState={validationState.state}>
                        <Col componentClass={ControlLabel} sm={2}>
                            State
                        </Col>
                        <Col sm={6}>
                            <FormControl componentClass="select" onChange={e => this.handleFormValueChange('state', e.target.value)}>
                                <option value="">Select project state</option>
                                {projectStates.map(val => <option value={val}>{val}</option>)}
                            </FormControl>
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="jiraLink" validationState={validationState.jiraLink}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Jira link
                        </Col>
                        <Col sm={6}>
                            <FormControl type="text" value={formData.jiraLink} placeholder="Paste link here" onChange={e => this.handleFormValueChange('jiraLink', e.target.value)} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="deadline" validationState={validationState.deadline}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Deadline
                        </Col>
                        <Col sm={6}>
                            <DatePicker className="form-control" selected={formData.deadline} onChange={(val) => this.handleFormValueChange('deadline', val)} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="billing" validationState={validationState.billing}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Billing
                        </Col>
                        <Col sm={4}>
                            <FormControl type="text" value={formatThousands(formData.billing)} placeholder="Hourly rate" onChange={e => this.handleFormValueChange('billing', e.target.value)} />
                            <FormControl.Feedback />
                        </Col>
                        <Col sm={2}>
                            <FormControl componentClass="select" value={formData.currency} onChange={e => this.handleFormValueChange('currency', e.target.value)}>
                                {formOptions && formOptions.currencies ? formOptions.currencies.map(val => <option key={'currency-option-'+val.value} value={val.value}>{val.symbol} ({val.value})</option>) : null}
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="budgetHours" validationState={validationState.budgetHours}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Budget
                        </Col>
                        <Col sm={6}>
                            <FormControl type="number" value={formData.budgetHours} placeholder="Total hours" onChange={e => this.handleFormValueChange('budgetHours', e.target.value)} />
                            <FormControl.Feedback />
                            <Checkbox checked={formData.fixed} inline onChange={e => this.handleFormValueChange('fixed', e.target.value)}>Fixed</Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={6}>
                            {totalBudget ? <p><strong>{formatThousands(formData.billing)}</strong> {this.getCurrentCurrencySymbol()}/h x <strong>{formData.budgetHours}</strong> h = <strong>{formatThousands(totalBudget)}</strong> {this.getCurrentCurrencySymbol()}</p> : null }
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

                    <h3>Project team</h3>

                    <hr />

                    <FormGroup controlId="projectManager" validationState={validationState.projectManager}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Project manager
                        </Col>
                        <Col sm={6}>
                            <FormControl componentClass="select" onChange={e => this.handleFormValueChange('projectManager', e.target.value)}>
                                <option value="">Select from users</option>
                                {users.map(val => <option value={val.id}>{val.firstname} {val.lastname}</option>)}
                            </FormControl>
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="teamMembers1" validationState={validationState.teamMembers}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Member #1
                        </Col>
                        <Col sm={6}>
                            <FormControl componentClass="select" onChange={e => this.handleFormValueChange('teamMembers', e.target.value)}>
                                <option value="">Select from users</option>
                                {users.map(val => <option value={val.id}>{val.firstname} {val.lastname}</option>)}
                            </FormControl>
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <Button type="submit" disabled={this.state.submitDisabled} bsSize="large" bsStyle="primary" className="pull-right">Add project</Button>

                </Form>

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
})(AddNewProject), s);
