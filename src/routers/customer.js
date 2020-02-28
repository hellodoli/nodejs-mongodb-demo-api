const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const handleError = require('../utils/handle-error');

// get all
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.send({ customers });
  } catch (error) {
    handleError(res, 500, error);
  }
});

// get by id
router.get('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return handleError(res, 404, { message: 'Not found Customer' });
    res.send(customer);
  } catch (error) {
    handleError(res, 500, error);
  }
});

// create
router.post('/customers', async (req, res) => {
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.send({ customer });
  } catch (error) {
    handleError(res, 400, error);
  }
});

// update
router.patch('/customers/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allows = ['name', 'age', 'phoneNumber'];

  const isValid = updates.every(update => allows.includes(update));
  if (!isValid) {
    return handleError(res, 400, { message: 'Update missing or invalid' });
  }

  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return handleError(res, 404, { message: 'Not found Customer' });
    updates.forEach(update => customer[update] = req.body[update]);
    await customer.save();
    res.send({ customer });
  } catch (error) {
    handleError(res, 400, error);
  }
});

// delete
router.delete('/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id});
    if (!customer) return handleError(res, 404, { message: 'Not found Customer' });
    res.send({ customer });
  } catch (error) {
    handleError(res, 400, error);
  }
});

module.exports = router;