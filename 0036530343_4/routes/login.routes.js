const express = require('express');
const db = require('../db');
const router = express.Router();
const User = require('../models/UserModel')


router.get('/', function (req, res, next) {
    //####################### ZADATAK #######################
    //vrati login stranicu

    res.render("login", {
        title: 'Login',
        linkActive: 'login',
        user: req.session.user,
        err: undefined
    })

    //#######################################################

});

router.post('/', async function (req, res, next) {
    //####################### ZADATAK #######################
    //postupak prijave korisnika

    let user = undefined
    user = await User.fetchByUsername(req.body.user)
    
    console.log(user)
    
    
    if (user && user.checkPassword(req.body.password)) {
        req.session.user = user;
        res.redirect('/')

    } else {
        res.render('login', {
            title: 'Login',
            linkActive: 'login',
            user: req.session.user,
            err: 'User does not exist or incorrect password.'
        })
    }

    //#######################################################

});


module.exports = router;