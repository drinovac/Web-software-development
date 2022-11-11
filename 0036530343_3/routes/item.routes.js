// potrebno napisati
var express = require('express')
var router = express.Router()
var db = require("../db/index")
var { body, validationResult } = require('express-validator')

router.get('/:id([0-9]+)', async function(req, res, next) {

    let id = parseInt(req.params.id);

    var item = (await db.query("select * from inventory where id = $1", [id])).rows[0]

    if (!item) res.status(404).send("The item you asked for does not exist!")

    else {
        var category = (await db.query("select * from categories where id = $1", [item.categoryid])).rows[0]


        res.render('item', {
            title: item.name,
            linkActive: 'order',
            item: item,
            category: category,
            index: id
        }) 
    }

})


module.exports = router