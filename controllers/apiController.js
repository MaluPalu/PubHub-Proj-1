function index(req, res) {
  res.json({
    message: 'Welcome to PubHub!',
    documentation_url: '',
    base_url: 'localhost:4000',
    endpoints: [
        {method: "GET", path: "/api", description: "Describes all available endpoints"},
    //     {method: "GET", path: "/api/profile", description: "Describes all available endpoints"},
    //     {method: "GET", path: "/api/pubHubs", description: "List local PubHubs specifiations"},
    //     {method: "POST", path: "/api/pubHubs", description: "Add PubHub specifiations"},
    //     {method: "PUT", path: "/api/pubHubs/:id", description: "Update PubHub specifiations"},
    //     {method: "DELETE", path: "/api/pubHubs/:id", description: "Delete PubHub specifiations"},
    //     {method: "GET", path: "/api/pubHubs/:id", description: "Individual PubHub specifiations"}
    ]
  });
}

module.exports = {
  index: index
}
