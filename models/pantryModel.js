const nedb = require('gray-nedb');

class Pantry{
    constructor(dbFilePath) {
        if (dbFilePath) {
          this.db = new nedb({ filename: dbFilePath.filename, autoload: true });
          //console.log( "Here" + dbFilePath.filename);
        } else {
          this.db = new nedb();
        }
      } 
    
    init() {
       /* this.db.insert({
            donator:'Peter Smith',
            foodType: 'Carrots',
            quantity: '2 kg',
            harvestDate: '2024-03-16',
            depositDate: '2024-03-17'
        });
        //for later debugging
        console.log('db entry Peter inserted');
            this.db.insert({
                donator:'Ann Budge',
                foodType: 'Apples',
                quantity: '3 kg',
                harvestDate: '2024-03-15',
                depositDate: '2024-03-16'
        });
        //for later debugging
        console.log('db entry Ann inserted'); */
        } 
    //a function to return all entries from the database
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
            this.db.find({}, function(err, foodEntries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise & return the data
                } else {
                    resolve(foodEntries);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', foodEntries);
                }
            })
        })
    }
    addFoodEntry(donator, foodType, quantity, harvestDate) {
        var foodEntry = {
        donator: donator,
        foodType: foodType,
        quantity: quantity,
        harvestDate: harvestDate,
        depositDate: null
        }      
console.log('entry created', foodEntry);
this.db.insert(foodEntry, function(err, doc) {
if (err) {
console.log('Error inserting document', donator);
} else {
console.log('document inserted into the database', doc);
}
}) 
}
    getCarrotsEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //find(foodType:'Carrots) retrieves the data,
            //with error first callback function, err=error, entries=data
            this.db.find({ foodType: 'Carrots' }, function(err, foodEntries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                //if no error resolve the promise and return the data
                } else {
                    resolve(foodEntries);
                    //to see what the returned data looks like
                    console.log('getCarrotsEntries() returns: ', foodEntries);
                 }
            })
        })
    }

         
}

//make the module visible outside
module.exports = Pantry; 