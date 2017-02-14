const express = require('express');
const router = express.Router();
const models = require('../models');
const Reading = models.Reading;

module.exports = function(auth) {

    router.post("/getData", function(req, res, next) {
    	var data = req.body.data;
    	console.log(req.body);
    	var start = new Date(data.from);
    	var end = new Date(data.to);
    	var type = data.type;
    	var table = data.table;

    	/*var item1= "vry";
    	var item2 = "vyb";
    	var item3 =  "vbr";*/
    	//console.log(type)
    	if(type=="VRY"){
    		item1 = 'vry';
	 		item2 = 'vyb';
	 		item3 = 'vbr';
		}
		if(type=="VRN"){
			 item1 = "vrn";
			 item2 = "vyn";
			 item3 = "vbn";
		}
		if(type=="IR"){
			 item1 = 'ir';
			 item2 = 'iy';
			 item3 = 'ib';
		}
		if(type=="KVAR"){
			 item1 = "kva-r";
			 item2 = "kva-y";
			 item3 = "kva-b";
		}
		if(type=="KVARR"){
			 item1 = "kvar-r";
			 item2 = "kvar-y";
			 item3 = "kvar-b";
		}
		if(type=="WR"){
			 item1 = "kw-r";
			 item2 = "kw-y";
			 item3 = "kw-b";
		}
      
       var d =  Reading.findAll({
		  attributes: ["datetime",item1,item2,item3],
		  where: {
		    datetime:{
		    	gte: start,
		    	lte : end
		    }
		  }
		}).then(function(ret){
			return res.json(ret);	
		});

    	
    });
    return router;
};