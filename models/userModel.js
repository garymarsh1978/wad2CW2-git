const Datastore = require('gray-nedb');
const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserDAO {
  constructor(dbFilePath) {
    if (dbFilePath) {
      //embedded
      this.db = new Datastore({
        filename: dbFilePath.filename,
        autoload: true,
      });
    } else {
      //in memory
      this.db = new Datastore();
    }
  }
  // for the demo the password is the bcrypt of the user name
  init() {
    // this.db.insert({
    //     user: 'Peter',
    //     password:
    //     '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C',
    //     role:"normalUser"
    // });
    // this.db.insert({
    //     user: 'Ann',
    //     password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S',
    //     role:"admin"
    // });
    return this;
  }
  create(username, password, role) {
    const that = this;
    bcrypt.hash(password, saltRounds).then(function (hash) {
      var entry = {
        user: username,
        password: hash,
        role: role,
      };
      that.db.insert(entry, function (err) {
        if (err) {
          console.log("Can't insert user: ", username);
        }
      });
    });
  }
  lookup(user, cb) {
    this.db.find({ user: user }, function (err, entries) {
      if (err) {
        return cb(null, null);
      } else {
        if (entries.length == 0) {
          return cb(null, null);
        }
        return cb(null, entries[0]);
      }
    });
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
    this.db.find({}, function (err, users) {
      if (err) {
        reject (err) ;
      } else {
        resolve(users);
        console.log("function getAllUsers() returns: ", users);
        
      }
    });
    });
  }
deleteUsers(selectedUsers) {
    console.log(selectedUsers);
    if (selectedUsers.constructor === Array){
        var listSize =selectedUsers.length;
        console.log("the length of list is" +   listSize);
    }
    else {
        var listSize = 1;
            console.log("the length of list is" +   listSize);
    }
      if (listSize === 1){
        this.db.remove({ _id: selectedUsers },
             function (err, doc)              
        {
            if (err) {
            console.log('Error deleting user document',selectedUsers);
        } else {
        console.log('document deleted user in the database', doc);
        }
        }) 
    } 
     else {    
             for (let i=0; i < listSize; i++) {
        console.log(selectedUsers[i]);
        this.db.remove({ _id: selectedUsers[i] }, { multi: true },
        function(err, doc) {
              if (err) {
              console.log('Error deleting document',selectedUsers);
           } else {
           console.log('document deleted from the database', doc);
           }
           }) 
     }
    } 
    this.db.persistence.compactDatafile();
    }
 
}

const dao = new UserDAO({ filename: "users.db", autoload: true });
dao.init();

module.exports = dao;