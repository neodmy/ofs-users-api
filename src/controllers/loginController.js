/* eslint-disable no-underscore-dangle */
const logger = require('../utils/logger');
const loginSchema = require('../schemas/login');
const createError = require('../utils/errors');
const { verifyPassword } = require('../utils/encrypt');

module.exports = (store) => {
  logger.info('   LoginController: starting');
  const login = async (user, { hostname, ip }) => {
    const { error } = loginSchema.validate(user);
    if (error) throw createError(error.message, 400);

    const currentUser = await store.findOneByNickname(user.nickname);
    if (!currentUser /* || !currentUser.confirmed */) throw createError('Invalid credentials', 401);

    const isAuthorized = await verifyPassword(user.password, currentUser.password);
    if (!isAuthorized) throw createError('Invalid credentials', 401);

    const { value } = await store.updateOneById(
      currentUser._id,
      { lastAccess: { hostname, ip, date: new Date() } },
    );

    return value;
  };

  logger.info('   LoginController: started');
  return {
    login,
  };
};
