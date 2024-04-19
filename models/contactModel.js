const nedb = require('gray-nedb');
class Contact{
    constructor(dbFilePath) {
      if (dbFilePath) {
        //embedded
        this.contactdb = new nedb({ filename: dbFilePath.filename, autoload: true });
    
      } else {
        //in memory
        this.contactdb = new nedb();
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

    // return all contact requests
    getAllContactEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.contactdb.find({}, function(err, contactEntries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise & return the data
                } else {
                    resolve(contactEntries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', contactEntries);
                }
            })
        })
    }
    // ad ne contact message entry
    addContactEntry(firstName, lastName, email, interest, message) {
        var contactEntry = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        interest: interest,
        message: message,
        receivedDate: new Date().toISOString().split('T')[0],
        repliedDate: null
        }      
console.log('contact  created', contactEntry);
this.contactdb.insert(contactEntry, function(err, doc) {
if (err) {
console.log('Error inserting document', lastName);
} else {
console.log('document inserted into the database', doc);
}
}) 
} 
   
  }
  
  //make the module visible outside
module.exports = Contact; 