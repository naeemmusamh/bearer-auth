'use strict';

const base64 = require('base-64');
const User = require('../models/users-model.js');

module.exports = async(req, res, next) => {

    if (!req.headers.authorization) {
        next('Invalid username&password');
        return;
    }


    try {
        let basic = req.headers.authorization.split(' ').pop();
        let [user, pass] = base64.decode(basic).split(':');

        req.user = await User.authenticateBasic(user, pass);
        next();
    } catch (e) {
        res.status(403).send('Invalid Login');
    }

};