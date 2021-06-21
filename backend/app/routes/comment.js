const { authJwt } = require('../middlewares');
var commentController = require('../controllers/comment');

module.exports = app => {
  app.post(
    '/cars/:car_id/add-comment',
    [ authJwt.verifyToken ],
    commentController.add
  );
  app.get(
    '/cars/:car_id/comments',
    commentController.getAll
  );
  app.patch(
    '/cars/update-comment/:_id',
    commentController.update
  );
  app.delete(
    '/cars/delete-comment/:_id',
    commentController.delete
  );
}
