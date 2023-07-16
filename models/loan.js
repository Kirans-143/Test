const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
    required: true,
  },
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
