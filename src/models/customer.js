const { model, Schema } = require('mongoose');
const validator = require('validator');

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: String,
    default: 20,
    validate(age) {
      if (age < 0) {
        throw new Error('Customer age invalid');
      }
    }
  },
  phoneNumber: {
    type: String,
    default: null
  }
}, { timestamps: true });

const Customer = new model('Customer', customerSchema);
module.exports = Customer;
