const express = require('express');
const controller = require('../controllers/controller');

//routs
const router = express.Router();

router.get('/list', controller.list_data_get);

router.put('/item/update/:id', controller.item_details_data_update);

router.get('/item/details/:id', controller.item_details_data_get);




module.exports = router