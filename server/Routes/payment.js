const express = require('express');
const authmiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('make-payment',authmiddleware, async(req, res)=>{

})

module.exports =  router;