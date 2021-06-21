var { authJwt } = require('../middlewares');
var carController = require('../controllers/cars');
const { uploader } = require('../middlewares');

module.exports = app => {
  app.get(
    '/cars',
    carController.getAll
  );
  app.post(
    '/cars',
    [ authJwt.verifyToken, uploader.upload.array('files', 6) ],
    carController.add
  );
  app.get(
    '/cars/:_id',
    carController.getById
  );
  app.delete(
    '/cars/:_id',
    [ authJwt.verifyToken ],
    carController.delete
  );
  app.patch(
    '/cars/:_id',
    [ authJwt.verifyToken ],
    carController.update
  );
};
