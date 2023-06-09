const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')


router.post('/', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    return res.status(200).json({
                        message: 'Auth successful',
                        // token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })

})
module.exports = router