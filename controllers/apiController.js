function index(req, res) {
  res.json({
    message: 'Welcome to PubHub!',
    documentation_url: '',
    base_url: 'localhost:4000',
    endpoints: [
        {method: "GET", path: "/api", description: "Describes all available endpoints"},
    ]
  });
}

module.exports = {
  index: index
}
