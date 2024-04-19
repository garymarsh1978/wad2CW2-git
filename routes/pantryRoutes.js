const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const {
    newFoodInputValidator, contactInputValidator,
  } = require('../validators/validator');
const controller = require('../controllers/pantryController.js');
const auth =require('../auth/auth.js');
router.get('/login', controller.show_login);
router.post('/login', auth.login, controller.handle_login);
router.get('/', controller.landing_page);
router.get('/addedFoodEntry', auth.verify, controller.show_added_food_entry);
router.get('/newfood',auth.verify, controller.show_new_food_entries);
router.post('/newfood', auth.verify, newFoodInputValidator, controller.post_new_food_entry);
router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);
router.get('/loggedIn',auth.verify, controller.loggedIn_landing);
router.get('/pantry', auth.verifyPantry,controller.pantry_entries_list);
router.get('/pantry/:foodType', auth.verifyPantry,controller.show_deposited_food_type_entries);
router.get('/adminfood', auth.verifyAdmin,controller.all_entries_list);
router.get('/pantryDash', auth.verifyAdminPantry,controller.show_pantry);
router.get('/select',auth.verifyPantry,controller.select_food);
router.post('/select',auth.verifyPantry,controller.post_selected_food);
router.get('/collect',auth.verifyAdmin,controller.collect_food);
router.post('/collect',auth.verifyAdmin,controller.post_collected_food);
router.get('/deposit',auth.verifyAdmin,controller.deposit_food);
router.post('/deposit',auth.verifyAdmin,controller.post_deposited_food);
router.get('/remove',auth.verifyAdmin,controller.remove_food);
router.post('/remove',auth.verifyAdmin,controller.post_removed_food);
router.get('/deleteUser',auth.verifyAdmin,controller.show_delete_users);
router.post('/deleteUser',auth.verifyAdmin,controller.post_deleted_user);
router.get('/Carrots', controller.carrots_entries);
router.get('/contact', controller.contact_page);
router.post('/contact',contactInputValidator, controller.post_contact_entry);
    
router.get('/messages', auth.verifyAdmin, controller.contacts_list)
router.get('/adminfood/:foodType',auth.verifyAdmin,controller.show_food_type_entries);
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



// router.use(function(err, req, res, next) {
//     res.status(500);
//     res.type('text/plain');
//     res.send('Internal Server Error.');
// })
module.exports = router;