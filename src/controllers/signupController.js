const logger = require('../utils/logger');
const signinSchema = require('../schemas/signin');
const createError = require('../utils/errors');
const { calculateHash } = require('../utils/encrypt');

module.exports = (store) => {
  logger.info('   SigninController: starting');
  const signInUser = async (user) => {
    const { error } = signinSchema.validate(user);
    if (error) throw createError(error.message, 400);

    const prevUser = await store.findOneByNickname(user.nickname);
    if (prevUser) throw createError('Invalid nickname', 400);

    const newUser = { ...user };
    newUser.password = await calculateHash(user.password);
    newUser.confirmed = false;
    newUser.bookings = [];
    try {
      await store.insertOne(newUser);
      return 'User succesfully created';
    } catch (err) {
      throw createError('Internal server error', 500);
    }
  };

  logger.info('   SigninController: started');
  return {
    signInUser,
  };
};
