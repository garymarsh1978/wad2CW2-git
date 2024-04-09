const pantryDAO = require('../models/pantryModel.js');
const contactDAO = require('../models/contactModel.js');
const userDAO = require("../models/userModel.js");


const db = new pantryDAO({ filename: 'pantry.db', autoload: true }); 
// to set database up in virtual memory use const db = new pantryDAO();
db.init();
const contactdb = new contactDAO({ filename: 'contacts.db', autoload: true }); 
// to set database up in virtual memory use const db = new contactDAO();
contactdb.init();
exports.show_login = function (req, res) {
    res.render("user/login");
  };
  
exports.handle_login = function (req, res){
        res.render('foodEntries', {
          title: "Welcome to the Scottish Pantry Network",
          user: 'user',
});
      };
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
            title: 'Welcome to Scottish Food Pantry Network',
            foodEntries: list,
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
        title: 'Welcome to Scottish Food Pantry Network',
        foodEntries: list,
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
    title: 'Welcome to Scottish Food Pantry Network',
    user: "user",
    foodEntries: foodEntries,
});
}).catch((err) => {
console.log('error handling Food Types', err);
});
}
    
exports.show_new_food_entries = function(req, res) {
    res.render('newFoodEntry', {
    title: 'Donate a food item',
    user : 'user',
    });
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
    res.redirect("/addedFoodEntry")
  }
exports.show_added_food_entry = function(req,res) {
  res.render("addedFoodEntry", {
    title: 'Thank you for your Donation',
    user:"user",
  });
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
exports.show_register_page = function (req, res) {
        res.render("user/register");
        };
exports.post_new_user = function (req, res) {
        const user = req.body.username;
        const password = req.body.pass;
        const role = req.body.role;
          
        if (!user || !password) {
            res.send(401, "no user or no password");
            return;
        }
        userDAO.lookup(user, function (err, u) {
            if (u) {
            res.send(401, "User exists:", user);
            return;
            }
            userDAO.create(user, password,role);
            res.redirect("/login");
            });
          };
          

exports.loggedIn_landing = function (req, res) {
    db.getAllEntries()
    .then((list) => {
        res.render('foodEntries', {
        title: 'Welcome!',
        foodEntries: list,
        user: 'user',
    });
console.log('promise resolved');
})
.catch((err) => {
console.log('promise rejected', err);
})
}
          
exports.logout = function (req, res) {
    res.clearCookie("jwt").status(200).redirect("/");
};
          
exports.carrots_entries = function(req, res) {
    res.send('<h1>Processing Carrot\'s Donations, see terminal</h1>');
    db.getCarrotsEntries()
}
    exports.show_admin = function (req, res) {
      userDAO.getAllUsers()
      .then((list) => {
         res.render("admin", {
           title: 'Admin dashboard',
           user:"user",
           users: list,
         });
       
       })
       .catch((err) => {
         console.log("promise rejected", err);
       });
     };
    exports.admin_add_new_user=function(req, res){
      res.render('addUser',{ user:"admin"})
    }
    exports.admin_post_new_user = function (req, res) {
      const user = req.body.username;
      const password = req.body.pass;
      const role = req.body.role;
    
      if (!user || !password) {
        res.send(401, "no user or no password");
        return;
      }
      userDAO.lookup(user, function (err, u) {
        if (u) {
          res.send(401, "User exists:", user);
          return;
        }
        userDAO.create(user, password,role);
      });
      res.render("userAdded")
     };
    
      exports.show_pantry = function (req, res) {
        db.getAllEntries()
        .then((list) => {
           res.render("pantry", {
             title: 'Pantry dashboard',
             user:"user",
             foodEntries: list,
           });
         
         })
         .catch((err) => {
           console.log("promise rejected", err);
         });
       };
exports.select_food = function (req, res){
  db.getAllEntriesAvailable()
        .then((list) => {
           res.render("foodSelection", {
             title: 'Pantry Food Selection Form',
             user: "user",
             foodEntries: list,
           });
         })
         .catch((err) => {
           console.log("promise rejected", err);
         });
       };
 exports.post_selected_food = function (req, res) {
        const pantry = req.body.pantry;
        const selectedItems = req.body.selectedItems
        if (!req.body.selectedItems) {
          response.status(400).send("At least one item must be selected.");
          return;
          }
          if (!req.body.pantry) {
              response.status(400).send("Pantry name must be entered");
              return;
              }
      
        db.UpdateCollectedFoodItems(selectedItems);
        res.render("foodItemAdded");
       };
exports.collect_food = function (req, res){
        db.getAllSelectedItems()
              .then((list) => {
                 res.render("foodCollection", {
                   title: 'Pantry Food Collection Form',
                   user: "user",
                   foodEntries: list,
                 });
               })
               .catch((err) => {
                 console.log("promise rejected", err);
               });
             };
exports.post_collected_food = function (req, res) {
              const pantry = req.body.pantry;
              const selectedItems = req.body.selectedItems
              if (!req.body.selectedItems) {
                response.status(400).send("At least one item must be selected.");
                return;
                }
                if (!req.body.pantry) {
                    response.status(400).send("Pantry name must be entered");
                    return;
                    }
            
              db.UpdateCollectedFoodItems(selectedItems);
              res.render("foodItemCollected");
             };
            
  