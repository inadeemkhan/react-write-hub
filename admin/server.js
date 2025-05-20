const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 7700;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/write-hub';

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err.message));

app.use('/api/articles', require('./routes/articles'));
app.use('/customer/account', require('./routes/customers'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});