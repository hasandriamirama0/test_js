const { verifySignUp } = require('../middlewares');
const authController = require('../controllers/auth');

module.exports = app => {
  app.post(
    '/auth/signup',
    [ verifySignUp.checkDuplicateNameOrEmail ],
    authController.signup
  );

  app.post('/auth/signin', authController.signin);
};
