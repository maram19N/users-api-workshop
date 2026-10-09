const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const revokedMiddleware = require('../middleware/revoked'); 

router.post('/signup', controller.signUp);
router.post('/signin', controller.signIn);
router.post('/logout', controller.logout);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/getbyemail/:email', controller.getOne);
router.post('/',revokedMiddleware, controller.create);
router.put('/:id',revokedMiddleware, controller.update);
router.delete('/:id',revokedMiddleware, controller.remove);

module.exports = router;

