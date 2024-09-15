const knex = require("knex")(require("../knexfile"));
const { supabase } = require("../utils/supabase");

// Create a new album
const login = async (req, res) => {
  try {
    // to get a response with the full details of created album
    const { email, password } = req.body;

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

const logout = async (_, res) => {
  try {
    await supabase.auth.signOut();
    
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ message: `Unable to log out: ${error}` });
  }
};

module.exports = {
  login,
  logout,
};
