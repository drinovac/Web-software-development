const express = require('express');
const db = require('../db');
const router = express.Router();
const cart = require('../models/CartModel')
const cartSanitizer = require('./helpers/cart-sanitizer');

// Ulančavanje funkcija međuopreme
router.get('/', cartSanitizer, function (req, res, next) {
    //####################### ZADATAK #######################
    // prikaz košarice uz pomoć cart.ejs


    try {
        res.render('cart', {
            title: 'Cart',
            cart: req.session.cart,
            linkActive: 'cart',
            user: req.session.user,
            err:undefined
        })
        
    } catch (err) {
        console.log(err);
    }

    //#######################################################
});


router.get('/add/:id', async function (req, res, next) {
    //####################### ZADATAK #######################
    //dodavanje jednog artikla u košaricu

    await cart.addItemToCart(req.session.cart, req.params.id, 1)
    res.end()


    //#######################################################


});

router.get('/remove/:id', async function (req, res, next) {
    //####################### ZADATAK #######################
    //brisanje jednog artikla iz košarice

    await cart.removeItemFromCart(req.session.cart, req.params.id, 1)
    res.end()

    //#######################################################


});

module.exports = router;