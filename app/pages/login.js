import React from 'react';
import { Button, Form, FormGroup, ControlLabel, FormControl, Alert, Panel, Row, Col, Checkbox } from 'react-bootstrap';
import Select from 'react-select';
var s = {}; //import withStyles from 'withStyles';
//import s from './login.scss';
import countryData from '../data/countryData';
import api from '../services/api';
import session from '../services/session';


export default class Login extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        alert: { show: false, type: '', text: '' },
        email: '',
        password: '',
        rememberme: false
    };

    componentDidMount() {
        var user = session.getUser();
        if (user && user.id) {
            this.context.router.push('/dashboard');
        }
    }

    showAlert(type, text) {
        this.setState({ alert: { show: true, type: type, text: text } });
    }

    hideAlert() {
        this.setState({ alert: { show: false, type: '', text: '' } });
    }

    handleLogin(e) {
        e.preventDefault();

        api.login({ email: this.state.email, password: this.state.password, rememberme: this.state.rememberme })
            .then(resp => {
                this.context.router.push('/dashboard');
            })
            .catch(err => {
                this.showAlert('danger', err.text || err.message || err);
            });
    }

    render() {
        var { email, password, rememberme } = this.state;
        console.log('STATE', rememberme);
        return (
            <div className={s.root}>
                <Row>
                    <Col sm={8} smOffset={2} lg={6} lgOffset={3}>
                        <p></p>
                        <Panel className="text-center">

                            {this.state.alert.show ?
                                <Alert bsStyle={this.state.alert.type} onDismiss={() => this.hideAlert()}>
                                    <h4>{this.state.alert.text}</h4>
                                </Alert> :
                                null
                            }

                            <h2>Geniem Dashboard</h2>

                            <p>&nbsp;</p>

                            <Form onSubmit={e => this.handleLogin(e)} horizontal>

                                <FormGroup controlId="email">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Email
                                    </Col>
                                    <Col sm={8}>
                                        <FormControl type="text" value={email} onChange={e => this.setState({ email: e.target.value })} />
                                    </Col>
                                </FormGroup>

                                <br />

                                <FormGroup controlId="password">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Password
                                    </Col>
                                    <Col sm={8}>
                                        <FormControl type="password" value={password} onChange={e => this.setState({ password: e.target.value })} />
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col sm={12}>
                                        <Checkbox checked={rememberme} inline onChange={e => this.setState({'rememberme': (e.target.value==='on')})}>Muista minut</Checkbox>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col sm={8} smOffset={2}>
                                        <Button type="submit" bsSize="large" bsStyle="danger" block>Login</Button>
                                    </Col>
                                </FormGroup>

                            </Form>
                        </Panel>
                    </Col>
                </Row>
            </div>
        );
    }
}

