const Validator = require('jsonschema').Validator;

const v = new Validator();

function validate(instance, schema) {
  const valid = v.validate(instance, schema);
  let error = { valid: valid.valid, message: '' };
  for (let i = 0; i < valid.errors.length; i++) {
    error.message = error.message.concat(valid.errors[i].stack).concat(' \n ');
  }

  return error;
}

module.exports = validate;