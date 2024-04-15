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
  const username = req.username
    res.render("user/login",{
         username :username,
  });
};
exports.handle_login = function (req, res){
  const username = req.username
        res.render('foodEntries', {
          title: "Welcome to the Scottish Pantry Network",
          user: 'user',
          username: username,
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
  res.render('home', {
    title: 'Welcome to Scottish Food Pantry Network',
});
};
exports.entries_list = function(req, res) {
    db.getAllEntriesAvailable()
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
exports.contacts_list = function(req, res) {
  contactdb.getAllContactEntries()
  .then((list) => {
      res.render('ContactEntries', {
      title: 'Display of Contact Messages',
      contactEntries: list,
      user: "user", 
  });
console.log('promise resolved');
})
.catch((err) => {
console.log('promise rejected', err);
})
}
exports.pantry_entries_list = function(req, res) {
  const username = req.username
  db.getAllEntriesAvailable()
  .then((list) => {
      res.render('pantryFoodEntries', {
      title: 'All Available Deposited Food',
      foodEntries: list,
      user:"user",
      username : username,
  });
console.log('promise resolved');
})
.catch((err) => {
console.log('promise rejected', err);
})
}
exports.all_entries_list = function(req, res) {
  db.getAllAdminItems()
    .then((list) => {
      res.render('foodEntriesAdmin', {
      title: 'All Food Items including those not deposited yet',
      foodEntries: list,
      user:"user",
  });
console.log('promise resolved');
})
.catch((err) => {
console.log('promise rejected', err);
})
}
exports.show_food_type_entries = function(req, res) {
  const username = req.username
    console.log('filtering by Food Type', req.params.foodType);
    let food = req.params.foodType;
    db.getEntriesByFoodType(food).then(
    (foodEntries) => {
    res.render('foodEntries', {
    title: 'Welcome to Scottish Food Pantry Network',
    user: "user",
    foodEntries: foodEntries,
    username: username,
});
}).catch((err) => {
console.log('error handling Food Types', err);
});
}
exports.show_deposited_food_type_entries = function(req, res) {
  const username = req.username
    console.log('filtering by Food Type', req.params.foodType);
    let food = req.params.foodType;
    db.getDepositedEntriesByFoodType(food).then(
    (foodEntries) => {
    res.render('foodEntries', {
    title: 'Welcome to Scottish Food Pantry Network',
    user: "user",
    foodEntries: foodEntries,
    username: username,
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
  const username = req.username
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
    res.render("addedFoodEntry",
    {
      title: 'Thanks for your donation ',
      user: "user",
      username:username,
    });
  };
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
    db.getAllEntriesAvailable()
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
  const username = req.username
      userDAO.getAllUsers()
      .then((list) => {
         res.render("admin", {
           title: 'Admin dashboard',
           user:"user",
           users: list,
           username : username,
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
  const username = req.username;
        db.getAllEntriesAvailable()
        .then((list) => {
           res.render("pantry", {
             title: 'Pantry dashboard',
             user:"user",
             foodEntries: list,
             username :username,
           });
         
         })
         .catch((err) => {
           console.log("promise rejected", err);
         });
       };
exports.select_food = function (req, res){
  const username = req.username;
  db.getAllEntriesAvailable()
        .then((list) => {
           res.render("foodSelection", {
             title: 'Pantry Food Selection Form',
             user: "user",
             foodEntries: list,
             username :username,
           });
         })
         .catch((err) => {
           console.log("promise rejected", err);
         });
       };
 exports.post_selected_food = function (req, res) {
         const username = req.username
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
      
        db.UpdateSelectedFoodItems(selectedItems,pantry);
        res.render("foodItemAdded",{
        username: username});
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
              const selectedItems = req.body.selectedItems;
              const username = req.username;
              if (!req.body.selectedItems) {
                response.status(400).send("At least one item must be selected.");
                return;
                }
                if (!req.body.pantry) {
                    response.status(400).send("Pantry name must be entered");
                    return;
                    }
            
              db.UpdateCollectedFoodItems(selectedItems);
              res.render("foodItemCollected",
              {
                title: 'Food Item Collected',
                user: "user",
                username:username,
              });
             };
exports.deposit_food = function (req, res){
  const username = req.username;
              db.getAllItemsNotDeposited()
                    .then((list) => {
                       res.render("foodDeposit", {
                         title: 'Pantry Food Deposit Form',
                         user: "user",
                         foodEntries: list,
                         username :username,
                       });
                     })
                     .catch((err) => {
                       console.log("promise rejected", err);
                     });
                   };
exports.post_deposited_food = function (req, res) {
                    const username = req.username;
                    const selectedItems = req.body.selectedItems;
                    if (!req.body.selectedItems) {
                      response.status(400).send("At least one item must be selected.");
                      return;
                      }
                  console.log(selectedItems);               
db.UpdateDepositedFoodItems(selectedItems);
res.render("foodItemDeposited",
{
  title: 'Food Item Deposit',
  user: "user",
  username: username,
});
};
exports.remove_food = function (req, res){
  db.getAllOutOFDateFood()
        .then((list) => {
           res.render("outOfDateFood", {
             title: 'Out of date Food Form',
             user: "user",
             foodEntries: list,
           });
         })
         .catch((err) => {
           console.log("promise rejected", err);
         });
       };
exports.post_removed_food = function (req, res) {
        const selectedItems = req.body.selectedItems;
        if (!req.body.selectedItems) {
          response.status(400).send("At least one item must be selected.");
          return;
          }
      console.log(selectedItems);               
db.DeleteOutOfDateFoodItems(selectedItems);
res.render("foodItemRemoved",
{
  title: 'Food Item Removed',
  user: "user",
});
};
exports.show_delete_users = function (req, res) {
  userDAO.getAllUsers()
  .then((list) => {
     res.render("deleteUser", {
       title: 'Delete User Form',
       user:"user",
       users: list,
     });
   
   })
   .catch((err) => {
     console.log("promise rejected", err);
   });
 };
exports.post_deleted_user = function (req, res) {
  const selectedUsers = req.body.selectedUsers;
  if (!req.body.selectedUsers) {
    response.status(400).send("At least one item must be selected.");
    return;
    }
console.log(selectedUsers);               
userDAO.deleteUsers(selectedUsers);
res.render("userDeleted",
{
  title: 'User Deleted',
  user: "user",
});
};