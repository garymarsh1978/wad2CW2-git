const pantryDAO = require('../models/pantryModel.js');
const db = new pantryDAO();

db.init();

exports.entries_list = function(req, res) {
    res.send('<h1>Not yet implemented: show a list of food entries.</h1>');
    db.getAllEntries();
}
exports.landing_page = function(req, res) {
    res.send('<h1>Welcome to the Pantry application.</h1>');
}
exports.new_food_entry = function(req, res) {
    res.send('<h1>Not yet implemented: show a new  food entry page.</h1>');
}
exports.carrots_entries = function(req, res) {
    res.send('<h1>Processing Carrot\'s Donations, see terminal</h1>');
    db.getCarrotsEntries();
}