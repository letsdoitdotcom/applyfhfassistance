const mongoose = require('../../api/_db');

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
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });
  try {
    const data = req.body || {};

  // Store raw DDN as provided
  const raw = data.ddn || '';
  const toSave = Object.assign({}, data, { ddn: raw });

    const application = new Application(toSave);
    await application.save();
    return res.status(200).json({ success: true, message: 'Application submitted', applicationId: application._id });
  } catch (err) {
    console.error('submit-application error', err);
    return res.status(500).json({ success: false, message: 'Error submitting application' });
  }
};
