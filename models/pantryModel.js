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
    /*  this.db.insert({
            donator:'Peter Smith',
            foodType: 'Carrots',
            quantity: '2 kg',
            harvestDate: '2024-03-16',
            depositDate: '2024-03-17',
            pantry:null,
            selectDate: null,
            collectDate:null,
               }); 
               console.log('db entry Peter inserted');
        this.db.insert({  
               donator:'Jimmy Hill',
               foodType: 'Tomatoes',
               quantity: '2 kg',
               harvestDate: '2024-03-06',
               depositDate: '2024-03-07',
               pantry:null,
               selectDate: null,
               collectDate:null,
                  }); 
                  console.log('db entry Jimmy inserted');
        this.db.insert({  
                    donator:'Tom Farmer',
                    foodType: 'Cabbage',
                    quantity: '3 kg',
                    harvestDate: '2024-03-05',
                    depositDate: '2024-03-06',
                    pantry:null,
                    selectDate: null,
                    collectDate:null,
                    });  */    
        //for later debugging
      /* console.log('db entry Tom inserted');
       this.db.insert({  
        donator:'Gerry Rafferty',
        foodType: 'Potatoes',
        quantity: '4 kg',
        harvestDate: '2024-03-10',
        depositDate: '2024-03-11',
        pantry:null,
        selectDate: null,
        collectDate:null,
           });  
         console.log('db entry Gerry inserted');  
            this.db.insert({
                donator:'Ann Budge',
                foodType: 'Apples',
                quantity: '3 kg',
                harvestDate: '2024-03-15',
                depositDate: '2024-03-16',
                pantry:null,
                selectDate: null,
                collectDate:null,
               });  */
        //for later debugging
        //console.log('db entry Ann inserted'); 
        } 
    //a function to return all entries from the database
    // return all entries
  
    // add new food item
    addFoodEntry(donator, foodType, quantity, harvestDate) {
        var foodEntry = {
        donator: donator,
        foodType: foodType,
        quantity: quantity,
        harvestDate: harvestDate,
        depositDate: null,
        pantry:null,
        selectDate: null,
        collectDate:null,
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


// return all available food items, - deposited, not selected by pantry and with 28 days of harvest date
getAllEntriesAvailable() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
        //use the find() function of the database to get the data,
        //error first callback function, err for error, entries for data
         var  date = new Date();
         var day = date.getDate() - 28;
         date.setDate(day); 
         console.log(date);
        const formatDate = date.toISOString().split('T')[0];
        this.db.find({ $and: [{"depositDate": {$ne: null}, "pantry": null, 
                      "harvestDate":{ $gte: formatDate}}]}, function(err, foodEntries) {
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

// return all out of date food thsat id deposited and not selected by pantry 28 days after harvest date
getAllOutOFDateFood() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
        //use the find() function of the database to get the data,
        //error first callback function, err for error, entries for data
         var  date = new Date();
         var day = date.getDate() - 28;
         date.setDate(day); 
         console.log(date);
        const formatDate = date.toISOString().split('T')[0];
        this.db.find({ $and: [{"depositDate": {$ne: null}, "pantry": null, 
        "harvestDate":{ $lt: formatDate}}]}, function(err, foodEntries) {
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
// return all items not deposited within 28 days of harvest date
getAllItemsNotDeposited() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
        //use the find() function of the database to get the data,
        //error first callback function, err for error, entries for data
         var  date = new Date();
         var day = date.getDate() - 28;
         date.setDate(day); 
         console.log(date);
        const formatDate = date.toISOString().split('T')[0];
        this.db.find({ $and: [{"depositDate": null, "pantry": null, 
                      "harvestDate":{ $gte: formatDate}}]}, function(err, foodEntries) {
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
// reurn all items not selected by pantry within 28 days of harvest date but could not be deposited for admin user
getAllAdminItems() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
        //use the find() function of the database to get the data,
        //error first callback function, err for error, entries for data
         var  date = new Date();
         var day = date.getDate() - 28;
         date.setDate(day); 
         console.log(date);
        const formatDate = date.toISOString().split('T')[0];
        this.db.find({ $and: [{ "pantry":null, 
                      "harvestDate":{ $gte: formatDate}}]}, function(err, foodEntries) {
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
// add deposit date for selected items
UpdateDepositedFoodItems(selectedItems) {
    console.log(selectedItems);
    console.log(pantry);
    const todayDate = new Date().toISOString().split('T')[0];
    console.log(todayDate);
    if (selectedItems.constructor === Array){
        var listSize =selectedItems.length;
        console.log("the length of list is" +   listSize);
    }
    else {
        var listSize = 1;
            console.log("the length of list is" +   listSize);
    }
      if (listSize === 1){
      this.db.update(
        { _id: selectedItems},
        {  $set: {"depositDate": todayDate}}, { multi: true, returnUpdatedDocs:true},
        function(err, doc) {
            if (err) {
            console.log('Error updating document',selectedItems);
        } else {
        console.log('document updated in the database', doc);
        }
        }) 
    } 
     else {    
             for (let i=0; i < listSize; i++) {
        console.log(selectedItems[i]);
         this.db.update(
           { _id: selectedItems[i] },
          {  $set: {"depositDate": todayDate}}, { multi: true, returnUpdatedDocs:true},
            function(err, doc) {
              if (err) {
              console.log('Error updating document',selectedItems);
           } else {
           console.log('document updated in the database', doc);
           }
           }) 
     }
    } 
    this.db.persistence.compactDatafile();
    }
// get entries by food type that are available including those not deposited for admin user screen
getEntriesByFoodType(food) {
    var  date = new Date();
    var day = date.getDate() - 28;
    date.setDate(day); 
    console.log(date);
   const formatDate = date.toISOString().split('T')[0];
    return new Promise((resolve, reject) => {
    this.db.find({  $and: [{ "pantry": null, "foodType": food,
    "harvestDate":{ $gte: formatDate}}]}, function(err, foodEntries) {
    if (err) {
    reject(err);
    } else {
    resolve(foodEntries);
    console.log('getEntriesByFoodType returns: ', foodEntries);
    }
    })
    })
    }
    // get entries by food type that are available  for pantry user screen
    getDepositedEntriesByFoodType(food) {
        var  date = new Date();
        var day = date.getDate() - 28;
        date.setDate(day); 
        console.log(date);
       const formatDate = date.toISOString().split('T')[0];
        return new Promise((resolve, reject) => {
        this.db.find({  $and: [{ "pantry": null, "foodType": food,"depositDate":{$ne: null},
        "harvestDate":{ $gte: formatDate}}]}, function(err, foodEntries) {
        if (err) {
        reject(err);
        } else {
        resolve(foodEntries);
        console.log('getEntriesByFoodType returns: ', foodEntries);
        }
        })
        })
        }

        // get Carrot entries
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
    // update items with pantry username and today's date for select date 
UpdateSelectedFoodItems(selectedItems, pantry) {
    console.log(selectedItems);
    console.log(pantry);
    const todayDate = new Date().toISOString().split('T')[0];
    console.log(todayDate);
    if (selectedItems.constructor === Array){
        var listSize =selectedItems.length;
        console.log("the length of list is" +   listSize);
    }
    else {
        var listSize = 1;
            console.log("the length of list is" +   listSize);
    }
      if (listSize === 1){
      this.db.update(
        { _id: selectedItems},
        {  $set: {"selectDate": todayDate, "pantry":pantry}}, { multi: true, returnUpdatedDocs:true},
        function(err, doc) {
            if (err) {
            console.log('Error updating document',selectedItems);
        } else {
        console.log('document updated in the database', doc);
        }
        }) 
    } 
     else {    
             for (let i=0; i < listSize; i++) {
        console.log(selectedItems[i]);
         this.db.update(
           { _id: selectedItems[i] },
          {  $set: {"selectDate": todayDate, "pantry":pantry}}, { multi: true, returnUpdatedDocs:true},
            function(err, doc) {
              if (err) {
              console.log('Error updating document',selectedItems);
           } else {
           console.log('document updated in the database', doc);
           }
           }) 
     }
    } 
    this.db.persistence.compactDatafile();
    }
// get all selected items for collection    
getAllSelectedItems() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //error first callback function, err for error, entries for data
             var  date = new Date();
             var day = date.getDate() - 28;
             date.setDate(day); 
             console.log(date);
            const formatDate = date.toISOString().split('T')[0];
            this.db.find({ $and: [{"depositDate": {$ne: null}, "pantry": {$ne: null}, "collectDate": null,
                          "harvestDate":{ $gte: formatDate}}]}, function(err, foodEntries) {
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
// add collect date as today for processing collection
UpdateCollectedFoodItems(selectedItems) {
        console.log(selectedItems);
        const todayDate = new Date().toISOString().split('T')[0];
        console.log(todayDate);
        if (selectedItems.constructor === Array){
            var listSize =selectedItems.length;
            console.log("the length of list is" +   listSize);
        }
        else {
            var listSize = 1;
                console.log("the length of list is" +   listSize);
        }
          if (listSize === 1){
          this.db.update(
            { _id: selectedItems},
            {  $set: {"collectDate": todayDate}}, { multi: true, returnUpdatedDocs:true},
            function(err, doc) {
                if (err) {
                console.log('Error updating document',selectedItems);
            } else {
            console.log('document updated in the database', doc);
            }
            }) 
        } 
         else {    
                 for (let i=0; i < listSize; i++) {
            console.log(selectedItems[i]);
             this.db.update(
               { _id: selectedItems[i] },
              {  $set: {"collectDate": todayDate}}, { multi: true, returnUpdatedDocs:true},
                function(err, doc) {
                  if (err) {
                  console.log('Error updating document',selectedItems);
               } else {
               console.log('document updated in the database', doc);
               }
               }) 
         }
        } 
        this.db.persistence.compactDatafile();
        }
// add deposit date for selected items
UpdateDepositedFoodItems(selectedItems) {
            console.log(selectedItems);
            const todayDate = new Date().toISOString().split('T')[0];
            console.log(todayDate);
            if (selectedItems.constructor === Array){
                var listSize =selectedItems.length;
                console.log("the length of list is" +   listSize);
            }
            else {
                var listSize = 1;
                    console.log("the length of list is" +   listSize);
            }
              if (listSize === 1){
              this.db.update(
                { _id: selectedItems},
                {  $set: {"depositDate": todayDate}}, { multi: true, returnUpdatedDocs:true},
                function(err, doc) {
                    if (err) {
                    console.log('Error updating document',selectedItems);
                } else {
                console.log('document updated in the database', doc);
                }
                }) 
            } 
             else {    
                     for (let i=0; i < listSize; i++) {
                console.log(selectedItems[i]);
                 this.db.update(
                   { _id: selectedItems[i] },
                  {  $set: {"depositDate": todayDate}}, { multi: true, returnUpdatedDocs:true},
                    function(err, doc) {
                      if (err) {
                      console.log('Error updating document',selectedItems);
                   } else {
                   console.log('document updated in the database', doc);
                   }
                   }) 
             }
            } 
            this.db.persistence.compactDatafile();
            }
// remove out of date food      
DeleteOutOfDateFoodItems(selectedItems) {
                console.log(selectedItems);
                if (selectedItems.constructor === Array){
                    var listSize =selectedItems.length;
                    console.log("the length of list is" +   listSize);
                }
                else {
                    var listSize = 1;
                        console.log("the length of list is" +   listSize);
                }
                  if (listSize === 1){
                    this.db.remove({ _id: selectedItems }, { multi: true },
                         function (err, doc)              
                    {
                        if (err) {
                        console.log('Error deleting document',selectedItems);
                    } else {
                    console.log('document deleted in the database', doc);
                    }
                    }) 
                } 
                 else {    
                         for (let i=0; i < listSize; i++) {
                    console.log(selectedItems[i]);
                    this.db.remove({ _id: selectedItems[i] }, { multi: true },
                    function(err, doc) {
                          if (err) {
                          console.log('Error deleting document',selectedItems);
                       } else {
                       console.log('document deleted from the database', doc);
                       }
                       }) 
                 }
                } 
                this.db.persistence.compactDatafile();
                }
}

//make the module visible outside
module.exports = Pantry; 