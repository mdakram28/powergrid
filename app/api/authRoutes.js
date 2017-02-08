const express = require('express');
const router = express.Router();

const models = require('../models');
const User = models.User;

router.get("/login",function(req,res){
	res.json({
		error: "Under construction"
	})
});

module.exports = router;
