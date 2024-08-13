const getWelcomeMessage = (req, res) => {
  res.send("Welcome to VPA API in seprate route");
};

module.exports = {
  getWelcomeMessage,
};
