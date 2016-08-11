import React, { PropTypes } from 'react';
import { Button, Table, Alert, Modal, DropdownButton, MenuItem, Row, Col } from 'react-bootstrap';
var s = {}; //import withStyles from 'withStyles';
//import s from './insourcing-list.scss';
import api from '../../services/api';
import { getCurrencySymbol, formatThousands, getInsourcingTotalBugdet } from '../../services/utils';
import { connect } from "react-redux";
import { addNotification } from "../../actions/notification";

class InsourcingList extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        insourcingFilters: [],
        currentFilter: null,
        insourcings: []
    }

    componentDidMount() {
        this.loadInsourcings();
        this.loadInsourcingCounts();
    }

    loadInsourcings(filterByState) {
        var url = '/insourcings';
        var currentFilter = null;
        if (filterByState) {
            url = url + '?state=' + encodeURIComponent(filterByState);
            currentFilter = filterByState;
        }
        api.get(url)
            .then(insourcings => {
                this.setState({
                    insourcings: insourcings,
                    currentFilter: currentFilter
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    loadInsourcingCounts() {
        api.get('/insourcing-count')
            .then(insourcingCount => {
                this.setState({
                    insourcingFilters: insourcingCount
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    onActionDelete(insourcing) {
        if (confirm("Please confirm that you want to permanently DELETE the insourcing?"))
            api.del('/insourcing/'+insourcing.id)
                .then(() => {
                    this.props.addNotification('success', 'Insourcing deleted');
                    this.loadInsourcings();
                })
                .catch((err) => {
                    this.props.addNotification('danger', err.text || err.message || err);
                });
    }

    render() {
        var { insourcings, insourcingFilters, currentFilter } = this.state;
        var { formOptions } = this.props;
        var totalBudget = 0;
        return (
            <div className={s.root}>

                <Row>
                    <Col xs={10}>
                        <h1>Insourcings</h1>
                    </Col>
                    <Col xs={2}>
                        <Button onClick={() => this.context.router.push('/insourcing/new')} bsStyle="primary">Add deal</Button>
                    </Col>
                </Row>

                <hr className={s.horizontalSpacer} />

                <Row>
                    <Col xs={12}>
                        {insourcingFilters.map((insourcingFilter, i) => {
                            if (i === 0) {
                                return (
                                    <span key={'insourcing-filter-link-'+i}>
                                        <a
                                                className={currentFilter === insourcingFilter.state ? s.filterLinkSelected : s.filterLink}
                                                onClick={() => this.loadInsourcings(insourcingFilter.state)}
                                            >
                                                {insourcingFilter.state}{insourcingFilter.visible ? ' ('+insourcingFilter.visible+')' : null}
                                        </a>
                                    </span>
                                );
                            } else {
                                return (
                                    <span key={'insourcing-filter-link-'+i}>&nbsp;&nbsp;|&nbsp;&nbsp;
                                        <a
                                                className={currentFilter === insourcingFilter.state ? s.filterLinkSelected : s.filterLink}
                                                onClick={() => this.loadInsourcings(insourcingFilter.state)}
                                            >
                                                {insourcingFilter.state}{insourcingFilter.visible ? ' ('+insourcingFilter.visible+')' : null}
                                        </a>
                                    </span>
                                );
                            }
                        })}
                        <span>&nbsp;&nbsp;|&nbsp;&nbsp;
                            <a
                                    className={currentFilter === null ? s.filterLinkSelected : s.filterLink}
                                    onClick={() => this.loadInsourcings()}
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
                            <th>Allocation</th>
                            <th>Insourcing</th>
                            <th>Jira</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insourcings.map(insourcing => {
                            var budget = getInsourcingTotalBugdet(insourcing.billing, insourcing.allocation);
                            if (budget) totalBudget = totalBudget + budget;
                            return (
                                <tr key={insourcing.id} onClick={() => this.context.router.push('/insourcing/'+insourcing.id)}>
                                    <td>{insourcing.customer ? insourcing.customer.name : null}</td>
                                    <td>{insourcing.allocation} %</td>
                                    <td>{insourcing.title}</td>
                                    <td>{insourcing.jiraLink}</td>
                                    <td>{budget ? formatThousands(budget)+' '+getCurrencySymbol(formOptions, insourcing.currency) : null}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td></td>
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
})(InsourcingList),s);
