const logger = require('../utils/logger');
const usersRoutes = require('./usersRoutes');
const loginRoutes = require('./loginRoutes');
const signupRoutes = require('./signupRoutes');

module.exports = (app, controllers) => {
  logger.info('Routes: starting');
  app.use('/signup', signupRoutes(controllers.signupController));
  app.use('/login', loginRoutes(controllers.loginController));
  app.use('/users', usersRoutes(controllers.usersController));
  logger.info('Routes: started');
};
