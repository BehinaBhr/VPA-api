const knex = require("knex")(require("../knexfile"));
const { supabase } = require("../utils/supabase");

// Handles user login by authenticating with Supabase
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Authenticate user with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      res.status(401).json({ message: `Wrong email or password!` });
    } else {
      res.status(200).json(data.session);
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to log in: ${error}` });
  }
};

// Handles user logout by invalidating session with Supabase
const logout = async (_, res) => {
  try {
    // Sign out user from Supabase
    await supabase.auth.signOut(); 
  } catch (error) {
    res.status(500).json({ message: `Unable to log out: ${error}` });
  }
};

module.exports = {
  login,
  logout,
};
