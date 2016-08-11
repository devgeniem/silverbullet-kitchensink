import React from 'react';
import { Button, Form, FormGroup, ControlLabel, FormControl, HelpBlock, Alert, Panel } from 'react-bootstrap';
import Select from 'react-select';
var s = {}; //import withStyles from 'withStyles';
import countryData from '../data/countryData';
import api from '../../services/api';
import Webcam from 'react-webcam';

export default class UserRegister extends React.Component {

    static propTypes = {
        params: React.PropTypes.object
    };

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        alert: { show: false, type: '', text: '' },
        loading: true,
        activationCodeValid: false,
        submitDisabled: true,
        formData: {
            password: '',
            password_confirm: ''
        },
        validationState: {
            password: '',
            password_confirm: ''
        }
    };

    componentDidMount() {
        api.get('/user/check-activation/' + this.props.params.id + '/' + this.props.params.activationCode)
            .then(valid => {
                if (valid) {
                    this.setState({
                        loading: false,
                        activationCodeValid: true
                    });
                } else {
                    this.setState({
                        loading: false
                    });
                }
            })
            .catch(err => {
                this.showAlert('danger', err.text || err.message || err);
            });
    }

    showAlert(type, text) {
        this.setState({ alert: { show: true, type: type, text: text } });
    }

    hideAlert() {
        this.setState({ alert: { show: false, type: '', text: '' } });
    }

    handleSubmit(e) {
        e.preventDefault();

        var body = {
            activationCode: this.props.params.activationCode,
            newPassword: this.state.formData.password
        };

        api.post('/user/activate/' + this.props.params.id, body)
            .then(valid => {
                if (valid) {
                    this.context.router.push('/');
                } else {
                    this.showAlert('danger', 'Activation failed, incorrect data!');
                }
            })
            .catch(err => {
                this.showAlert('danger', err.text || err.message || err);
            });
    }

    updateSubmitState(validationState) {
        var submitDisabled = false;
        Object.keys(validationState).forEach((key) => {
            if (validationState[key] !== 'success') submitDisabled = true;
        });
        this.setState({
            submitDisabled: submitDisabled
        });
    }

    updateValidationState(field, data) {
        var validationState = this.state.validationState;
        if (data.length) {
            if (this.state.formData.password_confirm) {
                if (this.state.formData.password === this.state.formData.password_confirm) {
                    validationState[field] = 'success';
                } else {
                    validationState[field] = 'error';
                }
            } else {
                validationState[field] = 'success';
            }
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

    renderRegisterForm() {
        const validationState = this.state.validationState;
        const formData = this.state.formData;

        return (
            <Panel>
                {this.state.alert.show ?
                    <Alert bsStyle={this.state.alert.type} onDismiss={() => this.hideAlert()}>
                        <h4>{this.state.alert.text}</h4>
                    </Alert> :
                    null
                }
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <FormGroup controlId='password' validationState={validationState.password}>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl type='password' value={formData.password} onChange={e => this.handleFormValueChange('password', e.target.value) } />
                        <FormControl.Feedback />
                        <HelpBlock>Give new password</HelpBlock>
                    </FormGroup>

                    <FormGroup controlId='password_confirm' validationState={validationState.password_confirm}>
                        <ControlLabel>Password confirmation</ControlLabel>
                        <FormControl type='password' value={formData.password_confirm} onChange={e => this.handleFormValueChange('password_confirm', e.target.value) } />
                        <FormControl.Feedback />
                        <HelpBlock>Give same password again</HelpBlock>
                    </FormGroup>
                    <Button type="submit" bsStyle='primary' disabled={this.state.submitDisabled}>Rekisteröi</Button>
                </Form>
            </Panel>
        );
    }

    render() {
        return (
            <div>
                <center><h1>Register your account</h1></center>
                {this.state.loading
                    ? <div className='loading'>Loading..</div>
                    : this.state.activationCodeValid ? this.renderRegisterForm() : <Alert bsStyle='danger'>Check that the url is correct</Alert>}
            </div>
        );
    }
}
