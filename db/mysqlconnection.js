var mysql = require('mysql2');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Abhiyanshi@2913',
  database: 'mydb'

})
con.connect(function (error) {
  if (error) throw error;
  console.log('connected');
  // con.query("CREATE DATABASE mydb",function(error,result){
  //     if(error) throw error;
  //     console.log('Database created');
  // });
  // var sql= "CREATE TABLE testing (name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), address VARCHAR(255), number INT(255))";
  //  if(error)throw error;
  //  console.log("Table Created");
  // var sql = "INSERT INTO demo (name, address) VALUES ('Company Inc', 'xyz')";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  // });
  //   var sql = "INSERT INTO demo (name, address) VALUES ?";
  //   var values = [
  //     ['Peter', 'Lowstreet 4'],
  //     ['Amy', 'Apple st 652'],
  //     ['Hannah', 'Mountain 21'],
  //     ['Michael', 'Valley 345'],
  //     ['Sandy', 'Ocean blvd 2'],
  //     ['Betty', 'Green Grass 1'],
  //     ['Richard', 'Sky st 331'],
  //     ['Susan', 'One way 98'],
  //     ['Vicky', 'Yellow Garden 2'],
  //     ['Ben', 'Park Lane 38'],
  //     ['William', 'Central st 954'],
  //     ['Chuck', 'Main Road 989'],
  //     ['Viola', 'Sideway 1633']
  //   ];
  //   con.query(sql, [values], function (err, result) {
  //     if (error) throw error;
  //     console.log("Number of records inserted");
  //   });
  // });

  // con.connect(function(err) {
  //   if (err) throw err;
  //   con.query("SELECT * FROM demo", function (err, result, fields) {
  //     if (err) throw err;
  //     console.log(result);
  //   });
  // });


  //New Table
  // var sql = "CREATE TABLE newtable(name varchar(255), email varchar(255), roll int(255), address varchar(2555))";
  // con.query(sql,function(error,result){
  // if (error) throw error;
  // console.log('Table Created');

  //Inserting Values
  // var sql = "INSERT INTO newtable(name,email,roll,address) VALUES ?";
  // var values = [['abhijit', 'abhi@12', 12, '12ka4gali4'],
  //  ['rakesh', 'rak@12', 13, '61ka4gali6'], 
  //  ['akash', 'raka@124', 14, '32ka64'],
  // ['Ansh','ami@72',15,'7ka4gali4']];
  // con.query(sql,[values],function(error,result){
  //   if(error)throw error;
  //   console.log("Number of records inserted: " + result.affectedRows);
  // });

  //Select all Data
  // con.connect(function (error) {
  //   if (error) throw err;
  //   con.query("SELECT * FROM newtable", function (error, result, fields) {
  //     if (error) throw error;
  //     console.log(result);
  //   });
  // });

  //Selecting Certain Rows
  // con.connect(function (error) {
  //   if (error) throw err;
  //   con.query("SELECT name,address FROM newtable", function (error, result, fields) {
  //     if (error) throw error;
  //     console.log(result);
  //   });
  // });

  //Order By
  // con.connect(function (error) {
  //     if (error) throw err;
  //     con.query("SELECT name,address FROM newtable where name='abhijit'", function (error, result, fields) {
  //       if (error) throw error;
  //       console.log(result);
  //     });
  //   });

//Deleting Table
  // con.connect(function(err) {
  //   if (err) throw err;
  //   var sql = "DROP TABLE newtable";
  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //     console.log("Table deleted");
  //   });
  // });
  con.connect(function(error){
    if(error)throw error;
    
  })
});
