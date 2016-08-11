import api from '../services/api';

export function loadCustomer(customerId) {
    return dispatch => {
        api.get('/customer/' + customerId)
            .then(customer => {
                dispatch({
                    type: 'LOAD_CUSTOMER',
                    customer
                });
            })
            .catch(err => {
                dispatch({
                    type: 'ERROR',
                    error: err
                });
            });
    };
}

export function loadContactPersons(customerId) {
    return dispatch => {
        api.get('/contact-persons?customer=' + customerId)
            .then(contactPersons => {
                dispatch({
                    type: 'LOAD_CONTACTPERSONS',
                    contactPersons
                });
            })
            .catch(err => {
                dispatch({
                    type: 'ERROR',
                    error: err
                });
            });
    };
}
