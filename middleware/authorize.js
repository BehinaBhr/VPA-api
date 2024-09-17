const { supabase } = require("../utils/supabase");

async function authorize(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization.slice("Bearer ".length);
  try {
    await supabase.auth.getUser(token);
    next();
  } catch (error) {
    res.sendStatus(401);
  }
}

module.exports = { authorize };
