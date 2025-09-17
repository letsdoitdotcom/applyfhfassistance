const mongoose = require('../../api/_db');

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  phone: String,
  submittedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });
  try {
    const data = req.body;
    const contact = new Contact({
      name: data.name || '',
      email: data.email || '',
      message: data.message || '',
      phone: data.phone || ''
    });
    await contact.save();
    return res.status(200).json({ success: true, message: 'Contact saved' });
  } catch (err) {
    console.error('contact error', err);
    return res.status(500).json({ success: false, message: 'Error saving contact' });
  }
};
