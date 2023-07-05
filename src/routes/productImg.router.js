const { getAll, create, remove } = require('../controllers/productImg.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');

const routerProductImg = express.Router();

routerProductImg.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, upload.single('image'), create);

routerProductImg.route('/:id')
    .delete(verifyJWT, remove)

module.exports = routerProductImg;