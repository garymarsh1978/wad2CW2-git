const express = require('express');
const router = express.Router();
const controller = require('../controllers/pantryController.js');
const auth =require('../auth/auth.js')
router.get('/login', controller.show_login);
router.post('/login', auth.login, controller.handle_login);
router.get('/', controller.landing_page);
router.get('/newfood',auth.verify,controller.show_new_food_entries);
router.post('/newfood', auth.verify, controller.post_new_food_entry);
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get('/loggedIn',auth.verify, controller.loggedIn_landing);
router.get('/pantry', auth.verifyAdminPantry,controller.entries_list);
router.get('/pantryDash', auth.verifyAdminPantry,controller.show_pantry);
router.get('/select',controller.select_food);
router.post('/select',controller.post_selected_food);
router.get('/Carrots', controller.carrots_entries);
router.get('/contact', controller.contact_page);
router.post('/contact', controller.post_contact_entry);
router.get('/pantry/:foodType',auth.verifyAdminPantry,controller.show_food_type_entries);
router.get('/about', function(req, res) {
    res.redirect('/about.html');
})
router.get('/admin',auth.verifyAdmin,controller.show_admin);
router.get('/adminPostNewUser',auth.verifyAdmin, controller.admin_add_new_user);
router.post('/adminPostNewUser',auth.verifyAdmin, controller.admin_post_new_user);
router.get('/logout', controller.logout);
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