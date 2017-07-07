const Validator = require('jsonschema').Validator;
const v = new Validator();

export function validate(instance: any, schema: any) {
    const valid = v.validate(instance, schema);
    let error = {valid: valid.valid, message: ''};
    for (let i = 0; i < valid.errors.length; i++) {
        error.message = error.message.concat(valid.errors[i].stack).concat(' \n ');
    }

    return error;
}
