// Simple health endpoint (no underscore) to test function routing
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({ ok: true, time: new Date().toISOString(), note: 'health-check (site/api/health)' });
};
