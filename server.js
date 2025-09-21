require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'site')));

// Optional request logger — remove or comment out in production
// Request logging intentionally disabled to avoid logging PII in production

// MongoDB Schema
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
  ddn: { type: String, required: true }, // DDN stored as an identifier field
  amountApproved: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

const Application = mongoose.model('Application', applicationSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  phone: String,
  submittedAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// Newsletter Schema
const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subscribedAt: { type: Date, default: Date.now }
});
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// API endpoint to submit application
app.post('/api/submit-application', async (req, res) => {
  try {
    const applicationData = req.body || {};
  // Store raw DDN as provided by the user
  const raw = applicationData.ddn || '';
  applicationData.ddn = raw;
    const application = new Application(applicationData);
    await application.save();

    res.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application._id
    });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application'
    });
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const data = req.body;
    const contact = new Contact({
      name: data.name || '',
      email: data.email || '',
      message: data.message || '',
      phone: data.phone || ''
    });
    await contact.save();
    res.json({ success: true, message: 'Contact message received' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ success: false, message: 'Error saving contact' });
  }
});

// Newsletter subscribe endpoint
app.post('/api/subscribe', async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) return res.status(400).json({ success: false, message: 'Email required' });
    const subscriber = new Newsletter({ email });
    await subscriber.save();
    res.json({ success: true, message: 'Subscribed' });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ success: false, message: 'Error subscribing' });
  }
});

// API endpoint to get all applications (admin use)
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find().sort({ submittedAt: -1 });
    res.json({ success: true, applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications'
    });
  }
});

// Fallback route — serve index.html for unknown paths (optional for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'site', 'index.html'));
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fhfassistance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Debug logs for paths
// Debug path logs removed to avoid accidental disclosure of file paths or PII in logs