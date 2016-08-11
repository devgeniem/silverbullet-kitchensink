import React, { PropTypes } from 'react';
import { Form, Col, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import Select from 'react-select';
import Dropzone from 'react-dropzone';
var s = {}; //import withStyles from 'withStyles';
//import s from './add-new-customer.scss';
import api from '../../services/api';
import { connect } from "react-redux";
import { addNotification } from "../../actions/notification";

class AddNewCustomer extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        submitDisabled: true,
        formData: {
            companyName: '',
            contactPersonName: '',
            contactPersonEmail: '',
            accountManager: ''
        },
        validationState: {
            companyName: '',
            contactPersonName: '',
            contactPersonEmail: '',
            accountManager: ''
        },
        users: [],
        logo: null
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
    }

    handleSubmit(e) {
        e.preventDefault();
        var formData = Object.assign({}, this.state.formData),
            attach = this.state.logo ? { attach: [this.state.logo] } : null;
        api.post('/customer', formData, attach)
            .then(() => {
                this.props.addNotification('success', 'New customer created');
                this.context.router.push('/customers');
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
        var formData = this.state.formData;
        formData[field] = data;
        this.setState({ formData: formData });
        this.updateValidationState(field, data);
    }

    onDrop(files) {
        if (files.length > 0) {
            this.setState({ logo: files[0] });
        }
    }

    render() {
        const { users, logo, formData, validationState } = this.state;

        return (
            <div className={s.root}>

                <Form onSubmit={e => this.handleSubmit(e)} horizontal>

                    <h3>New customer</h3>

                    <hr />

                    <FormGroup controlId="companyName" validationState={validationState.companyName}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Company
                        </Col>
                        <Col sm={6}>
                            <FormControl type="text" value={formData.companyName} placeholder="Type name" onChange={e => this.handleFormValueChange('companyName', e.target.value)} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="contactPersonName" validationState={validationState.contactPersonName}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Contact person name
                        </Col>
                        <Col sm={6}>
                            <FormControl type="text" value={formData.contactPersonName} placeholder="Type name of the individual person" onChange={e => this.handleFormValueChange('contactPersonName', e.target.value)} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="contactPersonEmail" validationState={validationState.contactPersonEmail}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Contact person email
                        </Col>
                        <Col sm={6}>
                            <FormControl type="email" value={formData.contactPersonEmail} placeholder="Contact person email" onChange={e => this.handleFormValueChange('contactPersonEmail', e.target.value)} />
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="accountManager" validationState={validationState.accountManager}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Account mngr.
                        </Col>
                        <Col sm={6}>
                            <FormControl componentClass="select" onChange={e => this.handleFormValueChange('accountManager', e.target.value)}>
                                <option value="">Select user from list</option>
                                {users.map(val => <option value={val.id}>{val.firstname} {val.lastname}</option>)}
                            </FormControl>
                            <FormControl.Feedback />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="logo">
                        <Col componentClass={ControlLabel} sm={2}>
                            Logo
                        </Col>
                        <Col sm={6}>
                            <Dropzone onDrop={files => this.onDrop(files)} multiple={false} accept="image/*" style={{ width: '100%', height: '34px', padding: '6px 12px', fontSize: '14px', lineHeight: 1.42857143, border: "1px solid #ccc", borderRadius: '4px', boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075)' }}>
                                {logo ? logo.name : 'Drop image or click here'}
                            </Dropzone>
                            {logo ? <div style={{paddingTop:'10px'}}><img src={logo.preview} width="200" /></div> : null}
                        </Col>
                    </FormGroup>

                    <Button type="submit" disabled={this.state.submitDisabled} bsSize="large" bsStyle="primary" className="pull-right">Add customer</Button>

                </Form>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default withStyles(connect(mapStateToProps, {
    addNotification
})(AddNewCustomer), s);
