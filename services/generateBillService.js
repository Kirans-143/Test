const Loan = require('../models/loan');
const User = require('../models/user');
const Bill = require('../models/bill');
const sendBillEmail = require('../utils/sendBillEmail');

exports.generateBill = async (user_id) => {
  try {
    // Check if the user exists
    const user = await User.findById(user_id);
    if (!user) {
      throw new Error('User not found');
    }

    // Check for pending loans for the user
    const loans = await Loan.find({ user_id, status: 'pending' });
    if (loans.length === 0) {
      throw new Error('No pending loans for the user');
    }

    // Calculate the total amount
    const totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);

    // Generate the bill
    const bill = new Bill({ user_id, total_amount: totalAmount });

    // Send email to the user's configured email address
    sendBillEmail(user.email, bill);

    // Save the bill
    await bill.save();

    return bill;
  } catch (err) {
    throw err;
  }
};
