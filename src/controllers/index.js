const logger = require('../utils/logger');
const initUsersController = require('./usersController');
const initSignupController = require('./signupController');
const initLoginController = require('./loginController');

module.exports = ({ stores }) => {
  logger.info('Controllers: starting');
  const signupController = initSignupController(stores.usersStore);
  const loginController = initLoginController(stores.usersStore);
  const usersController = initUsersController(stores.usersStore);
  logger.info('Controllers: started');
  return {
    signupController,
    loginController,
    usersController,
  };
};
