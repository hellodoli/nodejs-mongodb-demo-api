const express = require('express');

const app = express();
const port = process.env.PORT;
console.log(port);

app.use(express.json());
app.listen(port, () => {
  console.log(`Server is setup in port ${port}`);
});