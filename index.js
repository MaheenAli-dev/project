const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.SERVER_PORT;
const cors = require('cors');
const path = require('path')


const frontpath = path.join(__dirname, './front/dist')
app.use('/', express.static(frontpath))

app.use(express.json());
app.use(cors());
app.use('/api', require('./api/products/router'))
app.use('/api', require('./api/users/router'))
app.use('/api', require('./api/categories/router'))
app.use('/api', require('./api/brands/router'))
app.use('/api', require('./api/orders/router'))




mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('DATABASE CONNECTED'))
  .catch((err) => console.error('DATABASE CONNECTION ERROR: ', err));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './front/dist/index.html'))
})


app.listen(port, () => {
  console.log(`Example app listening on port http:localhost:${port}`);
});