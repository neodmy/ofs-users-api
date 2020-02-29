/* eslint-disable no-underscore-dangle */
const logger = require('../utils/logger');
const createError = require('../utils/errors');
const errorsType = require('../utils/errorsType');
const authUserSchema = require('../schemas/authUser');

const validateSchema = (schema) => {
  const { error } = authUserSchema.validate(schema);
  if (error) throw createError(error.message, 400);
  return schema._id;
};

module.exports = (store) => {
  logger.info('   UsersController: starting');
  /**
   * Finds all documents in the collection
   * @return {Array} an array of objects or an empty array
   */
  const findAll = async () => {
    const result = await store.findAll();
    return result;
  };

  /**
   * Finds one document by the given id
   * @param {number} id The id to match
   * @return {Object} The object found
   */
  const findOneById = async (id) => {
    const result = await store.findOneById(id);
    if (!result) throw createError(errorsType.USER_NOT_FOUND);
    return result;
  };

  /**
   * Updates previous values with the new ones from the given object
   * @param {number} id The object id
   * @param {Object} inputData The updated object
   * @return {Object|null} The updated object or null
   */
  const updateOneById = async (id, user) => {
    const result = await findOneById(id);
    delete result._id;
    const { value } = await store.updateOneById(id, user);
    return value;
  };

  /**
   * Removes every object
   * @return {number} The number documents removed
   */
  const deleteAll = async () => {
    const { result } = await store.deleteAll();
    return result.n;
  };

  /**
   * Removes one document matching given id
   * @param {number} id The id of the document to be removed
   * @return {number} The number of documents removed
   */
  const deleteOneById = async (id) => {
    const currentUser = await findOneById(id);
    const { result } = await store.deleteOneById(currentUser._id);
    return result.n;
  };

  logger.info('   UsersController: started');
  return {
    findAll,
    findOneById,
    updateOneById,
    deleteOneById,
    deleteAll,
  };
};
