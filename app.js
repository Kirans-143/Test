const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Import routes
const generateBillRoute = require('./routes/generateBill');
const userRoute = require('./routes/user');
const loanRoute = require('./routes/loanRoute');

app.use(bodyParser.json());

// Use routes
app.use('/generate/bill', generateBillRoute);
app.use('/users', userRoute); 
app.use('/loans', loanRoute);

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/testBack_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
