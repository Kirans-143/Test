const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
