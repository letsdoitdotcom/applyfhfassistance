const mongoose = require('./_db');

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subscribedAt: { type: Date, default: Date.now }
});

const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });
    const subscriber = new Newsletter({ email });
    await subscriber.save();
    return res.status(200).json({ success: true, message: 'Subscribed' });
  } catch (err) {
    console.error('subscribe error', err);
    return res.status(500).json({ success: false, message: 'Error subscribing' });
  }
};
