const express = require('express');
const router = express.Router();

const models = require('../models');
var jwt = require("jwt-simple");
const cfg = global.config;
const users = [{
    id: 0,
    username: 'mdakram28',
    password: '1234'
}, {
    id: 1,
    username: 'blah blah',
    password: '12345'
}, {
    id: 2,
    username: 'a',
    password: 'a'
}];

module.exports = function(auth) {

    router.post("/login", function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        if (username && password) {
            var user = users.find(function(u) {
                return u.username === username && u.password === password;
            });
            if (user) {
                var payload = {
                    id: user.id
                };
                var token = jwt.encode(payload, cfg.jwtSecret);

    			res.cookie('token',token);
				console.log("cookie set :: "+req.cookies.token);
                res.json({
                    token: token
                });
            } else {
                res.status(401).json({
                    err: "User not found"
                });
            }
        } else {
            res.status(401).json({
                err: "Bad parameters"
            });
        }
    });

	router.post("/logout",function(req,res){
		req.cookies.token = undefined;
		return res.sendStatus(200);
	});

    router.get("/isLoggedIn", auth.authenticate(), function(req, res) {
        res.json(users[req.user.id]);
    });
    return router;
};
