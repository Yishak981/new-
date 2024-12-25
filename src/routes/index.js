function setRoutes(app) {
  // Define your routes here
  app.get('/', (req, res) => {
    res.send('Welcome to my Node app!');
  });

  // Add more routes as needed
}

module.exports = setRoutes;