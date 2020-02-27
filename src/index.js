const express = require('express');
require('./db/mongoose');
const customerRouter = require('./routers/customer');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(customerRouter);
app.get('/', (req, res) => {
  res.send('<h1>Welcome, this is demo customer API endpoint</h1>');
});

app.listen(port, () => {
  console.log(`Server is setup in port ${port}`);
});