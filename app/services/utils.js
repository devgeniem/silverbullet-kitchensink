export function formatThousands(num) {
    if (!num) return num;
    var input = num.toString().replace(/\s+/g, "");
    if (input.length > 3) {
        var split = input.toString().split("").reverse();
        var output = [];
        var i = 0;
        split.forEach(c => {
            output.push(c);
            i++;
            if (i === 3) {
                i = 0;
                output.push(' ');
            }
        });
        return output.reverse().join('').trim();
    } else {
        return input;
    }
}

// get index from array of item that has prop: val
export function getIndexByPropVal(arr, prop, val) {
    var index;
     if (arr && arr.forEach) {
        arr.forEach((item, i) => {
            if (item[prop] === val) index = i;
        });
    }
    return index;
}

// get copy of array without item that has prop: val
export function removeItemByPropVal(arr, prop, val) {
     if (arr && arr.forEach) {
        var index = getIndexByPropVal(arr, prop, val);
        if (index !== undefined) {
            return [...arr.slice(0, index), ...arr.slice(index+1)];
        } else {
            return arr;
        }
    }
}

export function getCurrencySymbol(formOptions, currencyValue) {
    var symbol = '';
    if (formOptions && formOptions.currencies && formOptions.currencies.forEach) {
        formOptions.currencies.forEach(currency => {
            if (currency.value === currencyValue) symbol = currency.symbol;
        });
    }
    return symbol;
}

export function getInsourcingTotalBugdet(price, allocation) {
    if (!price || !allocation) return 0;
    var p = parseFloat(price.toString().replace(/\s+/g, ""));
    var a = parseFloat(allocation)/100;
    return Math.round(p*a*158);
}
