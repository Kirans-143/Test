const User = require('../models/user');
const Loan = require('../models/loan');

exports.createLoan = async (req, res) => {
  try {
    const { user_id, amount } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const loan = new Loan({ user: user_id, amount });
    await loan.save();

    // Add the loan to the user's loans array
    user.loans.push(loan);
    await user.save();

    return res.status(201).json({ message: 'Loan created successfully', loan });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
