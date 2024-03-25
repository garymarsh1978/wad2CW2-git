const pantryDAO = require('../models/pantryModel.js');
const db = new pantryDAO();

db.init();

exports.entries_list = function(req, res) {
    res.send('<h1>Not yet implemented: show a list of food entries.</h1>');
}
   
exports.landing_page = function(req, res) {
        db.getAllEntries()
        .then((list) => {
            res.render('foodEntries', {
            'title': 'Welcome to Scottish Food Pantry Network',
            'foodEntries': list
        });
console.log('promise resolved');
})
.catch((err) => {
console.log('promise rejected', err);
})
}
exports.new_food_entries = function(req, res) {
    res.render('newFoodEntry', {
    'title': 'Welcome to Scottish Food Pantry Network',
    })
    }
    

exports.post_new_food_entry = function(req, res) {
    console.log('processing post-new_entry controller');
    if (!req.body.donator) {
    response.status(400).send("Entries must have an Donator.");
    return;
    }
    if (!req.body.foodType) {
        response.status(400).send("Entries must have a Food Type.");
        return;
        }
    db.addFoodEntry(req.body.donator,  req.body.foodType, req.body.quantity, req.body.harvestDate);
    res.redirect('/');
    }
exports.carrots_entries = function(req, res) {
    res.send('<h1>Processing Carrot\'s Donations, see terminal</h1>');
    db.getCarrotsEntries();
}