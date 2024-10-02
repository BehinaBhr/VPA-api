const { supabase } = require("../utils/supabase");

// Middleware to authorize user by validating the token in the Authorization header
async function authorize(req, res, next) {
  const { authorization } = req.headers;
  // Extract token from Authorization header
  const token = authorization.slice("Bearer ".length);
  try {
    await supabase.auth.getUser(token);
    next();
  } catch (error) {
    res.status(401).json({ error: "Authorization failed." });
  }
}

module.exports = { authorize };
