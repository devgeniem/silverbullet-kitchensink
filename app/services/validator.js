import validator from 'validator';

// Available validator functions: https://www.npmjs.com/package/validator

export default Object.assign({
    isRequired: function(data) {
        return !!data;
    }
}, validator);
