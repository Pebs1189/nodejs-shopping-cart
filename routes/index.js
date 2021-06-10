const express = require('express');

const {renderIndex, addId, getCart, removeId} = require('../controllers/controller');

const router = express.Router();

//TODO: Apply express-validator for security improvement 
router.get('/', renderIndex);
router.get('/add/:id', addId);
router.get('/cart', getCart);
router.get('/remove/:id', removeId);

module.exports = router;
