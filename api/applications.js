const mongoose = require('./_db');

const applicationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  motherFirst: { type: String, required: true },
  motherLast: { type: String, required: true },
  referralName: String,
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postal: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: String, required: true },
  occupation: { type: String, required: true },
  sex: { type: String, required: true },
  income: { type: String, required: true },
  ddn: { type: String, required: true },
  amountApproved: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' });

  // Simple token-based protection for admin access
  const adminToken = process.env.ADMIN_API_TOKEN || process.env.VERCEL_ADMIN_API_TOKEN || '';
  const provided = req.headers['x-admin-token'] || req.headers['X-Admin-Token'] || '';
  if (!adminToken || !provided || provided !== adminToken) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const apps = await Application.find().sort({ submittedAt: -1 }).limit(100);
    return res.status(200).json({ success: true, applications: apps });
  } catch (err) {
    console.error('applications error', err);
    return res.status(500).json({ success: false, message: 'Error fetching applications' });
  }
};
