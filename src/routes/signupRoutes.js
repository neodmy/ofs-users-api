const { Router } = require('express');

const router = Router();

module.exports = (signinController) => {
  router.post('/', async (req, res, next) => {
    try {
      const user = await signinController.signInUser(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
