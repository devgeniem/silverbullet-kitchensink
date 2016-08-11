import React, { PropTypes } from 'react';
import { Button, Table, Alert, Modal, DropdownButton, MenuItem, Row, Col } from 'react-bootstrap';
//var s = {}; //import withStyles from 'withStyles';
////import s from './order-list.scss';
var s = {};
import api from '../../services/api';
import { getCurrencySymbol, formatThousands } from '../../services/utils';
import { connect } from "react-redux";
import { addNotification } from "../../actions/notification";

class OrderList extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    };

    state = {
        orderFilters: [],
        currentFilter: null,
        orders: []
    }

    componentDidMount() {
        this.loadOrders();
        this.loadOrderCounts();
    }

    loadOrders(filterByState) {
        var url = '/orders';
        var currentFilter = null;
        if (filterByState) {
            url = url + '?state=' + encodeURIComponent(filterByState);
            currentFilter = filterByState;
        }
        api.get(url)
            .then(orders => {
                this.setState({
                    orders: orders,
                    currentFilter: currentFilter
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    loadOrderCounts() {
        api.get('/order-count')
            .then(orderCount => {
                this.setState({
                    orderFilters: orderCount
                });
            })
            .catch(err => {
                this.props.addNotification('danger', err.text || err.message || err);
            });
    }

    onActionDelete(order) {
        if (confirm("Please confirm that you want to permanently DELETE the order?"))
            api.del('/order/'+order.id)
                .then(() => {
                    this.props.addNotification('success', 'Order deleted');
                    this.loadOrders();
                })
                .catch((err) => {
                    this.props.addNotification('danger', err.text || err.message || err);
                });
    }

    render() {
        var { orders, orderFilters, currentFilter } = this.state;
        var { formOptions } = this.props;
        var totalBudget = 0;
        return (
            <div className={s.root}>

                <Row>
                    <Col xs={10}>
                        <h1>Orders</h1>
                    </Col>
                    <Col xs={2}>
                        <Button onClick={() => this.context.router.push('/order/new')} bsStyle="primary">Add order</Button>
                    </Col>
                </Row>

                <hr className={s.horizontalSpacer} />

                <Row>
                    <Col xs={12}>
                        {orderFilters.map((orderFilter, i) => {
                            if (i === 0) {
                                return (
                                    <span key={'order-filter-link-'+i}>
                                        <a
                                                className={currentFilter === orderFilter.state ? s.filterLinkSelected : s.filterLink}
                                                onClick={() => this.loadOrders(orderFilter.state)}
                                            >
                                                {orderFilter.state}{orderFilter.visible ? ' ('+orderFilter.visible+')' : null}
                                        </a>
                                    </span>
                                );
                            } else {
                                return (
                                    <span key={'order-filter-link-'+i}>&nbsp;&nbsp;|&nbsp;&nbsp;
                                        <a
                                                className={currentFilter === orderFilter.state ? s.filterLinkSelected : s.filterLink}
                                                onClick={() => this.loadOrders(orderFilter.state)}
                                            >
                                                {orderFilter.state}{orderFilter.visible ? ' ('+orderFilter.visible+')' : null}
                                        </a>
                                    </span>
                                );
                            }
                        })}
                        <span>&nbsp;&nbsp;|&nbsp;&nbsp;
                            <a
                                    className={currentFilter === null ? s.filterLinkSelected : s.filterLink}
                                    onClick={() => this.loadOrders()}
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
                            <th>Order</th>
                            <th>Account manager</th>
                            <th>Jira</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => {
                            if (order.totalBudget) totalBudget = totalBudget + order.totalBudget;
                            return (
                                <tr key={order.id} onClick={() => this.context.router.push('/order/'+order.id)}>
                                    <td>{order.customerName}</td>
                                    <td>{order.title}</td>
                                    <td>{order.accountManager}</td>
                                    <td>{order.jiraLink}</td>
                                    <td>{order.totalBudget ? formatThousands(order.totalBudget)+' '+getCurrencySymbol(formOptions, order.currency) : null}</td>
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
})(OrderList),s);
