const express = require('express');
const router = express.Router();
const controller = require('../controllers/doctor.controller');

router.get('/', controller.getAll);
router.get('/patient-min', controller.getByPatientMin);
router.get('/:id', controller.getById);
router.get('/getbyemail/:email', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/patient/:p', controller.getByPatient);

module.exports = router;