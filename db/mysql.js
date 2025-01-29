var mysql = require('mysql2');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abhiyanshi@2913',
    database: 'mydb'

})


// //Creating Table
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });

//Inserting data
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "INSERT INTO customers (name, address) VALUES ?";
//     var values = [
//       ['John', 'Highway 71'],
//       ['Peter', 'Lowstreet 4'],
//       ['Amy', 'Apple st 652'],
//       ['Hannah', 'Mountain 21'],
//       ['Michael', 'Valley 345'],
//       ['Sandy', 'Ocean blvd 2'],
//       ['Betty', 'Green Grass 1'],
//       ['Richard', 'Sky st 331'],
//       ['Susan', 'One way 98'],
//       ['Vicky', 'Yellow Garden 2'],
//       ['Ben', 'Park Lane 38'],
//       ['William', 'Central st 954'],
//       ['Chuck', 'Main Road 989'],
//       ['Viola', 'Sideway 1633']
//     ];
//     con.query(sql, [values], function (err, result) {
//       if (err) throw err;
//       console.log("Number of records inserted: " + result.affectedRows);
//     });
//   });

//Alter Table
// con.connect(function(error) {
//     if (error) throw error;
//     console.log("Connected!");
//     var sql = "ALTER TABLE customers ADD COLUMN id int (255) Primary Key";
//     con.query(sql, function (error, result) {
//       if (error) throw error;
//       console.log("Table Altered");
//     });
//   });

//Delete Multiple Rows
// con.connect(function(err) {
//     if (err) throw err;
//     var sql = "DELETE FROM customers WHERE name = 'John'";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Number of records deleted: " + result.affectedRows);
//     });
//   });

//Update
// con.connect(function(err) {
//     if (err) throw err;
//     var sql = "UPDATE customers SET address = 'Canyon 123' WHERE address = 'Valley 345'";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });
//   });

//Drop table
// con.connect(function(err) {
//     if (err) throw err;
//     var sql = "DROP TABLE customers";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table deleted");
//     });
//   });

//Create Second Table
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//      var sql = "CREATE TABLE newtable(name varchar(255), email varchar(255), roll int(255), address varchar(2555))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });

//Insert Data
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "INSERT INTO newtable(name,email,roll,address) VALUES ?";
//     var values = [['abhijit', 'abhi@12', 12, '12ka4gali4'],
//    ['rakesh', 'rak@12', 13, '61ka4gali6'], 
//    ['akash', 'raka@124', 14, '32ka64'],
//   ['Ansh','ami@72',15,'7ka4gali4']];
//     con.query(sql, [values], function (err, result) {
//       if (err) throw err;
//       console.log("Number of records inserted: " + result.affectedRows);
//     });
//   });

//Joins
// con.connect(function(err) {
//     if (err) throw err;
//     var sql = "SELECT customers.name as angrez,newtable.name as desi FROM newtable JOIN customers ON newtable.roll = customers.id";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });
