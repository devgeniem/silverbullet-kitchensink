import React from 'react';
import { Alert, Navbar, Nav, NavItem } from 'react-bootstrap';
import EditFormValuesForm from './forms/edit-form-values';
var s = {}; //import withStyles from 'withStyles';
//import s from './settings.scss';
import api from '../../services/api';

class Settings extends React.Component {

    static propTypes = {
        params: React.PropTypes.object
    };

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        alert: { show: false, type: '', text: '' },
        settings: {}
    };

    componentDidMount() {
        this.loadSettings();
    }

    loadSettings() {
        api.get('/settings')
            .then(settings => {
                this.setState({
                    settings: settings
                });
            })
            .catch(err => {
                this.showAlert('danger', err.text || err.message || err);
                console.error(err);
            });
    }

    showAlert(type, text) {
        this.setState({ alert: { show: true, type: type, text: text } });
    }

    hideAlert() {
        this.setState({ alert: { show: false, type: '', text: '' } });
    }

    navigateTo(e, url) {
        this.context.router.push(url);
        e.preventDefault();
        e.stopPropagation();
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

                {this.renderNavbar()}

                {this.renderForm()}


            </div>
        );
    }

    renderNavbar() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Settings
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem href="/settings/form-values" onClick={(e) => this.navigateTo(e, "/settings/form-values")}>Form values</NavItem>
                    <NavItem href="/settings/manage-users" onClick={(e) => this.navigateTo(e, "/settings/manage-users")}>Manage users</NavItem>
                </Nav>
            </Navbar>
        );
    }

    renderForm() {
        switch (this.props.params.page) {
            case 'form-values':
                    return (
                        <EditFormValuesForm
                                onSuccess={() => this.showAlert('success', 'Settings saved')}
                                onError={err => this.showAlert('danger', err.text || err.message || err)}
                                settings={this.state.settings}
                            />
                    );
                break;
            default:
                    return '';
        }
    }
}

export default withStyles(Settings, s);
