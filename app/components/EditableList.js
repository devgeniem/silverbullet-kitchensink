import React from 'react';
import { Form, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class EditableList extends React.Component {

    static propTypes = {
        data: React.PropTypes.array.isRequired
    };

    static defaultProps = {
        onSuccess: function() {},
        onError: function() {},
        onCancel: function() {}
    };

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
