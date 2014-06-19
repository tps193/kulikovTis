/**
 * Created by e.eremeev on 17/06/2014.
 */

ObjectsProvider = function(host, port) {
//    this.db= new Db('node-mongo-employee', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
//    this.db.open(function(){});
};

ObjectsProvider.prototype.getCollection= function(callback) {
    this.db.collection('employees', function(error, employee_collection) {
        if( error ) callback(error);
        else callback(null, employee_collection);
    });
};

//find all objects
ObjectsProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, employee_collection) {
        if( error ) callback(error)
        else {
            employee_collection.find().toArray(function(error, results) {
                if( error ) callback(error)
                else callback(null, results)
            });
        }
    });
};


//save new employee
ObjectsProvider.prototype.save = function(employees, callback) {
    this.getCollection(function(error, employee_collection) {
        if( error ) callback(error)
        else {
            if( typeof(employees.length)=="undefined")
                employees = [employees];

            for( var i =0;i< employees.length;i++ ) {
                employee = employees[i];
                employee.created_at = new Date();
            }

            employee_collection.insert(employees, function() {
                callback(null, employees);
            });
        }
    });
};

exports.ObjectsProvider = ObjectsProvider;