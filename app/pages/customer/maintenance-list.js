import React, { PropTypes } from 'react';
import { Button, Table, Alert, Modal, DropdownButton, MenuItem, Row, Col } from 'react-bootstrap';
var s = {}; //import withStyles from 'withStyles';
//import s from './maintenance-list.scss';
import api from '../../services/api';
import { getCurrencySymbol, formatThousands } from '../../services/utils';
import { connect } from "react-redux";
import { addNotification } from "../../actions/notification";

class MaintenanceList extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        maintenanceFilters: [],
        currentFilter: null,
        maintenances: []
    }

    componentDidMount() {
        this.loadMaintenances();
        this.loadMaintenanceCounts();
    }

    loadMaintenances(filterByState) {
        var url = '/maintenances';
        var currentFilter = null;
        if (filterByState) {
            url = url + '?state=' + encodeURIComponent(filterByState);
            currentFilter = filterByState;
        }
        api.get(url)
            .then(maintenances => {
                this.setState({
                    maintenances: maintenances,
                    currentFilter: currentFilter
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    loadMaintenanceCounts() {
        api.get('/maintenance-count')
            .then(maintenanceCount => {
                this.setState({
                    maintenanceFilters: maintenanceCount
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    onActionDelete(maintenance) {
        if (confirm("Please confirm that you want to permanently DELETE the maintenance?"))
            api.del('/maintenance/'+maintenance.id)
                .then(() => {
                    this.props.addNotification('success', 'Maintenance deleted');
                    this.loadMaintenances();
                })
                .catch((err) => {
                    this.props.addNotification('danger', err.text || err.message || err);
                });
    }

    render() {
        var { maintenances, maintenanceFilters, currentFilter } = this.state;
        var { formOptions } = this.props;
        var totalBudget = 0;
        return (
            <div className={s.root}>

                <Row>
                    <Col xs={10}>
                        <h1>Maintenances</h1>
                    </Col>
                    <Col xs={2}>
                        <Button onClick={() => this.context.router.push('/maintenance/new')} bsStyle="primary">Add deal</Button>
                    </Col>
                </Row>

                <hr className={s.horizontalSpacer} />

                <Row>
                    <Col xs={12}>
                        {maintenanceFilters.map((maintenanceFilter, i) => {
                            if (i === 0) {
                                return (
                                    <span key={'maintenance-filter-link-'+i}>
                                        <a
                                                className={currentFilter === maintenanceFilter.state ? s.filterLinkSelected : s.filterLink}
                                                onClick={() => this.loadMaintenances(maintenanceFilter.state)}
                                            >
                                                {maintenanceFilter.state}{maintenanceFilter.visible ? ' ('+maintenanceFilter.visible+')' : null}
                                        </a>
                                    </span>
                                );
                            } else {
                                return (
                                    <span key={'maintenance-filter-link-'+i}>&nbsp;&nbsp;|&nbsp;&nbsp;
                                        <a
                                                className={currentFilter === maintenanceFilter.state ? s.filterLinkSelected : s.filterLink}
                                                onClick={() => this.loadMaintenances(maintenanceFilter.state)}
                                            >
                                                {maintenanceFilter.state}{maintenanceFilter.visible ? ' ('+maintenanceFilter.visible+')' : null}
                                        </a>
                                    </span>
                                );
                            }
                        })}
                        <span>&nbsp;&nbsp;|&nbsp;&nbsp;
                            <a
                                    className={currentFilter === null ? s.filterLinkSelected : s.filterLink}
                                    onClick={() => this.loadMaintenances()}
                                >
                                All
                            </a>
                        </span>
                    </Col>
                </Row>

                <p></p>

                <Table striped condensed hover responsive>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Maintenance</th>
                            <th>Lead developer</th>
                            <th>Monthly billing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenances.map(maintenance => {
                            totalBudget = totalBudget + maintenance.billing;
                            return (
                                <tr key={maintenance.id} onClick={() => this.context.router.push('/maintenance/'+maintenance.id)}>
                                    <td>{maintenance.customer ? maintenance.customer.name : null}</td>
                                    <td>{maintenance.title}</td>
                                    <td>{maintenance.leadDeveloper ? maintenance.leadDeveloper.firstname + ' ' + maintenance.leadDeveloper.lastname : null}</td>
                                    <td>{formatThousands(maintenance.billing)+' '+getCurrencySymbol(formOptions, maintenance.currency)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td>{formatThousands(totalBudget)+' '+getCurrencySymbol(formOptions, 'EUR')}</td>
                        </tr>
                    </tfoot>
                </Table>

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
})(MaintenanceList),s);
