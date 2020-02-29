const { Router } = require('express');

const router = Router();

module.exports = (loginController) => {
  router.post('/', async (req, res, next) => {
    try {
      const user = await loginController.login(req.body, { hostname: req.hostname, ip: req.ip });
      res.send(user);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
