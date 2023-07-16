const User = require('../models/user');
const generateBillService = require('../services/generateBillService');

exports.generateBill = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      // Generate a new user
      const user = await User.generateUser(req.body.name, req.body.email);
      // Use the generated user's ID for bill generation
      const bill = await generateBillService.generateBill(user._id);
      return res.status(200).json({ message: 'Bill generated successfully', bill });
    }

    // Generate the bill for an existing user
    const bill = await generateBillService.generateBill(user_id);
    return res.status(200).json({ message: 'Bill generated successfully', bill });
  } catch (err) {
    console.error(err);
    if (err.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    } else if (err.message === 'No pending loans for the user') {
      return res.status(200).json({ message: 'No pending loans for the user' });
    } else {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};
