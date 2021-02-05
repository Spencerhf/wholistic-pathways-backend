const classController = require('../controllers').classes;

module.exports = function(app) {
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the API!',
  }));

  app.post('/classes/new', classController.create);
  app.get('/classes', classController.getClasses);
//   app.put('/classes/update', classController.update);
};
