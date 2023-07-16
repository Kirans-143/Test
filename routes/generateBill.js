const express = require('express');
const router = express.Router();
const generateBillController = require('../controllers/generateBillController');

// POST /generate/bill
router.post('/', generateBillController.generateBill);

module.exports = router;
