const Message = require('../models/Message');
const nodemailer = require('nodemailer');

const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Save to database
    const newMessage = await Message.create({ name, email, message });

    // Send email notification
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `New Portfolio Contact from ${name}`,
      text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        // Even if email fails, message is stored, return success but log
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (msg) {
      await msg.deleteOne();
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitContactForm, getMessages, deleteMessage };
