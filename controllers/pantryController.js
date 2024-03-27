const pantryDAO = require('../models/pantryModel.js');
const contactDAO = require('../models/contactModel.js');

const db = new pantryDAO({ filename: 'pantry.db', autoload: true }); 
// to set database up in virtual memory use const db = new pantryDAO();
db.init();
const contactdb = new contactDAO({ filename: 'contacts.db', autoload: true }); 
// to set database up in virtual memory use const db = new contactDAO();
contactdb.init();
exports.entries_list = function(req, res) {
    res.send('<h1>Not yet implemented: show a list of food entries.</h1>');
}

exports.contact_page = function(req, res) {
    
        res.render('contactUsEntry', {
        'title': 'Contact Us',       
})
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
exports.entries_list = function(req, res) {
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
exports.show_food_type_entries = function(req, res) {
    console.log('filtering by Food Type', req.params.foodType);
    let food = req.params.foodType;
    db.getEntriesByFoodType(food).then(
    (foodEntries) => {
    res.render('foodEntries', {
    'title': 'Welcome to Scottish Food Pantry Network',
    'foodEntries': foodEntries
});
}).catch((err) => {
console.log('error handling Food Types', err);
});
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
    if (!req.body.harvestDate) {
        response.status(400).send("Entries must have a Harvest Date.");
        return;
            }
    db.addFoodEntry(req.body.donator,  req.body.foodType, req.body.quantity, req.body.harvestDate);
    res.redirect('/');
    }
exports.post_contact_entry = function(req, res) {
        console.log('processing post-new_entry controller');
        if (!req.body.firstName) {
        response.status(400).send("Entries must have an First Name.");
        return;
        }
        if (!req.body.lastName) {
            response.status(400).send("Entries must have Last Name.");
            return;
            }
        if (!req.body.interest) {
            response.status(400).send("Entries must have an interest.");
            return;
                }
        if (!req.body.email) {
            response.status(400).send("Entries must have an email address.");
            return;
            }
            if (!req.body.message) {
                response.status(400).send("Entries must have a message.");
                return;
                }
        contactdb.addContactEntry(req.body.firstName,  req.body.lastName, req.body.email, req.body.interest, req.body.message.trim());
        res.redirect('/');
        }
exports.carrots_entries = function(req, res) {
    res.send('<h1>Processing Carrot\'s Donations, see terminal</h1>');
    db.getCarrotsEntries();
}