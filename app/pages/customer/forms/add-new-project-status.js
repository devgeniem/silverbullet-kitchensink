import React from 'react';
import { Form, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import api from '../../../services/api';
import validator from '../../../services/validator';
import moment from 'moment';

const form = {
    state: {
        validator: 'isRequired',
    },
    week: {
        default: parseInt(moment().format('WW'), 10),
    },
    year: {
        default: parseInt(moment().format('GGGG'), 10),
    },
    text: {
        validator: 'isRequired',
    },
};

export default class AddNewProjectStatusForm extends React.Component {

    static propTypes = {
        onSuccess: React.PropTypes.func,
        onError: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        settings: React.PropTypes.object.isRequired,
        projectId: React.PropTypes.string.isRequired,
    };

    static defaultProps = {
        onSuccess: function() {},
        onError: function() {},
        onCancel: function() {},
    };

    constructor(props) {
        super(props);
        var thisYear = parseInt(moment().format('YYYY'), 10);
        var years = [thisYear-1, thisYear];
        var weeks = [];
        for (var i=1; i<54; i++) {
            weeks.push(i);
        }
        var state = {
            formData: {},
            validationState: {},
            submitDisabled: true,
            weeks: weeks,
            years: years,
        };
        Object.keys(form).forEach(key => {
            state.formData[key] = form[key].default || '';
            if (form[key].validator) state.validationState[key] = '';
        });
        console.log('STATE', state);
        this.state = state;
    }

    // Update form value, validation state and submit button state
    handleFormValueChange(target) {
        var { formData, validationState } = this.state;
        var submitDisabled = false;
        // update form data
        formData[target.id] = target.value;
        // validate form data
        if (form[target.id] && form[target.id].validator) {
            if (validator[form[target.id].validator](target.value)) {
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
        var { formData } = this.state;
        e.preventDefault();
        var data = {
            state: formData.state,
            week: formData.year+'W'+formData.week,
            text: formData.text,
        };
        api.post('/project-status', Object.assign({ projectId: this.props.projectId }, data))
            .then(this.props.onSuccess)
            .catch(this.props.onError);
    }

    render() {
        var { formData, validationState, submitDisabled, weeks, years } = this.state;
        var { projectStatuses } = this.props.settings.formData;

        return (
            <Form onSubmit={e => this.handleSubmit(e)}>

                <FormGroup controlId="state" validationState={validationState.state}>
                    <ControlLabel>State</ControlLabel>
                    <FormControl componentClass="select" onChange={e => this.handleFormValueChange(e.target)}>
                        <option value="">Select state</option>
                        {projectStatuses.map((val, i) => <option key={'status-state-'+i} value={val}>{val}</option>)}
                    </FormControl>
                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="date">
                    <ControlLabel>Week number</ControlLabel>
                    <FormControl componentClass="select" value={formData.week} onChange={e => this.handleFormValueChange(e.target)}>
                        {weeks.map(val => <option key={'status-week-'+val} value={val}>{val}</option>)}
                    </FormControl>                    <FormControl.Feedback />
                </FormGroup>

                <FormGroup controlId="year">
                    <ControlLabel>Year</ControlLabel>
                    <FormControl componentClass="select" value={formData.year} onChange={e => this.handleFormValueChange(e.target)}>
                        {years.map(val => <option key={'status-year-'+val} value={val}>{val}</option>)}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="text" validationState={validationState.text}>
                    <ControlLabel>Display date</ControlLabel>
                    <FormControl componentClass="textarea" value={formData.text} placeholder="Type the project status text" onChange={e => this.handleFormValueChange(e.target)} />
                    <FormControl.Feedback />
                </FormGroup>

                <Button type="submit" disabled={submitDisabled} bsStyle="primary" className="pull-right">Add status</Button>
            </Form>
        );
    }
}
