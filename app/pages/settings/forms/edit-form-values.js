import React from 'react';
import { Form, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import api from '../../../services/api';
import validator from '../../../services/validator';

const form = {
    teamMemberRoles: 'isRequired',
    projectStates: 'isRequired',
    projectStatusStates: 'isRequired',
    maintenanceStates: 'isRequired'
};

export default class EditFormValuesForm extends React.Component {

    static propTypes = {
        onSuccess: React.PropTypes.func,
        onError: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        settings: React.PropTypes.object.isRequired
    };

    static defaultProps = {
        onSuccess: function() {},
        onError: function() {},
        onCancel: function() {}
    };

    constructor(props) {
        super(props);
        var state = {
            formData: {},
            validationState: {},
            submitDisabled: true
        };
        Object.keys(form).forEach(key => {
            state.formData[key] = (props.settings && props.settings.formValues && props.settings.formValues[key]) ? props.settings.formValues[key] : '';
            if (form[key]) state.validationState[key] = '';
        });
        this.state = state;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.settings && newProps.settings.formValues) {
            var formData = this.state.formData;
            this.setState({
                formData: Object.assign(formData, newProps.settings.formValues)
            });
        }
    }

    // Update form value, validation state and submit button state
    handleFormValueChange(target) {
        var { formData, validationState } = this.state;
        var submitDisabled = false;
        // update form data
        formData[target.id] = target.value;
        // validate form data
        if (form[target.id]) {
            if (validator[form[target.id]](target.value)) {
                validationState[target.id] = 'success';
            } else {
                validationState[target.id] = 'error';
            }
        }
        // determine submit disabled state
        Object.keys(validationState).forEach(key => {
            if (validationState[key] !== 'success') submitDisabled = true;
        });
        // update state
        this.setState({
            formData: formData,
            validationState: validationState,
            submitDisabled: submitDisabled
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        api.post('/settings', { formValues: this.state.formData })
            .then(this.props.onSuccess)
            .catch(this.props.onError);
    }

    render() {
        var { formData, validationState, submitDisabled } = this.state;

        console.log(formData);

        return (
            <Form onSubmit={e => this.handleSubmit(e)}>


                <Button type="submit" disabled={submitDisabled} bsStyle="primary" className="pull-right">Save settings</Button>
            </Form>
        );
    }
}
