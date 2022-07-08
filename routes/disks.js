const express = require('express');
const router = express.Router();
const diskController = require('../app/api/controllers/disks');
router.get('/', diskController.getAll);
router.post('/', diskController.create);
router.get('/:bookId', diskController.getById);
router.put('/:bookId', diskController.updateById);
router.delete('/:bookId', diskController.deleteById);
module.exports = router;