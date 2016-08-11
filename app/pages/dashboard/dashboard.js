import React from 'react';
import { Button, Form, FormGroup, ControlLabel, FormControl, Alert, Panel, Row, Col } from 'react-bootstrap';
//var s = {}; //import withStyles from 'withStyles';
////import s from './dashboard.scss';
var s = {};
import api from '../../services/api';

export default  class Dashboard extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        alert: { show: false, type: '', text: '' }
    };

    showAlert(type, text) {
        this.setState({ alert: { show: true, type: type, text: text } });
    }

    hideAlert() {
        this.setState({ alert: { show: false, type: '', text: '' } });
    }

    render() {
        return (
            <div className={s.root}>
                {this.state.alert.show ?
                    <Alert bsStyle={this.state.alert.type} onDismiss={() => this.hideAlert()}>
                        <h4>{this.state.alert.text}</h4>
                    </Alert> :
                    null
                }

                <Row>
                    <Col xs={3} xsOffset={3} className="text-center">
                        <h1>31</h1>
                        <span>active customers</span>
                    </Col>
                    <Col xs={3} className="text-center">
                        <h1>+2</h1>
                        <span>new customers</span>
                    </Col>
                </Row>

                <Row>
                    <Col xs={3} className="text-center">
                        <h1>12</h1>
                        <span>active project</span>
                    </Col>
                    <Col xs={3} className="text-center">
                        <h1>39</h1>
                        <span>new orders</span>
                    </Col>
                    <Col xs={3} className="text-center">
                        <h1>29</h1>
                        <span>in maintenance</span>
                    </Col>
                    <Col xs={3} className="text-center">
                        <h1>7</h1>
                        <span>insourced</span>
                    </Col>
                </Row>

                <Row>
                    <Col xs={4} className="text-center">
                        <h1>1.987</h1>
                        <span>hours billed</span>
                    </Col>
                    <Col xs={4} className="text-center">
                        <h1>187.579</h1>
                        <span>in revenue</span>
                    </Col>
                    <Col xs={4} className="text-center">
                        <h1>7.862</h1>
                        <span>maintenance revenue</span>
                    </Col>
                </Row>

            </div>
        );
    }
}
