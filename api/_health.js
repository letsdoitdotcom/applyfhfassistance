// Lightweight health-check for Vercel / serverless deployments
// Returns 200 JSON so you can verify `/api` routing without auth.
module.exports = (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ ok: true, time: new Date().toISOString(), note: 'health-check' });
  } catch (err) {
    console.error('Health check error', err);
    return res.status(500).json({ ok: false, error: 'internal' });
  }
};
