const express = require('express');
const router = express.Router();
const controller = require('../controllers/pantryController.js');
router.get('/', controller.landing_page);
router.get('/pantry', controller.entries_list);
router.get('/newfood', controller.new_food_entries);
router.post('/newfood', controller.post_new_food_entry);
router.get('/Carrots', controller.carrots_entries);
router.get('/contact', controller.contact_page);
router.post('/contact', controller.post_contact_entry);
router.get('/pantry/:foodType', controller.show_food_type_entries);
router.get('/about', function(req, res) {
    res.redirect('/about.html');
})

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})
module.exports = router;