const express = require('express');
const router = express.Router();
const { submitContactForm, getMessages, deleteMessage } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(submitContactForm)
  .get(protect, admin, getMessages);

router.route('/:id')
  .delete(protect, admin, deleteMessage);

module.exports = router;
