var initialState = {
    formOptions: {
        currencies: [
            { value: 'EUR', symbol: '€' },
            { value: 'USD', symbol: '$' },
        ],
        orderStates: ['Estimate', 'Approval', 'Accepted', 'Billed'],
        maintenanceStates: ['Standard', 'Premium', 'VIP', 'Custom'],
        projectStates: ['Lead', 'Quote', 'Lost', 'Active', 'Closed'],
        projectStatusStates: ['Green', 'Yellow', 'Red'],
        insourcingStates: ['Lead', 'Quote', 'Lost', 'Active', 'Closed'],
    }
};

// get index from array of item that has prop: val
function getIndexByPropVal(arr, prop, val) {
    var index;
     if (arr && arr.forEach) {
        arr.forEach((item, i) => {
            if (item[prop] === val) index = i;
        });
    }
    return index;
}

// get copy of array without item that has prop: val
function removeItemByPropVal(arr, prop, val) {
     if (arr && arr.forEach) {
        var index = getIndexByPropVal(arr, prop, val);
        if (index !== undefined) {
            return [...arr.slice(0, index), ...arr.slice(index+1)];
        } else {
            return arr;
        }
    }   
}

export default function settingsReducer(state = initialState, action) {
    switch(action.type) {
        case 'SAVE_SETTINGS':
            return Object.assign({}, action.settings );
        default:
            return state;
    }
}
