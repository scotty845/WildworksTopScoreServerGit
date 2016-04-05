// using express framework
// using mysql for node
var http = require( 'http' );
var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();

//create conection to mygame_db mysql DB
//set mysql connection parameters
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mysqlpass',
  database : 'mygame_db'
});

//connect to mysql DB
connection.connect();

var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');

var session=require('express-session');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(cookieParser());

app.use(session({secret: 'wildworks', resave: true,
    saveUninitialized: true}));	
	
app.use(express.static(path.join(__dirname, 'app')));	
	
	
//set up a variable sess to store session variable info
var sess;


//
//app.post /Logout destroy the express-session server data 
//known user username/uname and email/email and userid/uid
//
app.get('/Logout', function(req, res){

//on user logout destroy session data
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.redirect('/Scores');
  }

});

});
 //
//app.get /Logout destroy express-session data
//
	



 //
//app.post /Login check if known user exist a username and email combo exist and set session(sess) 
//known user username/uname and email/email and userid/uid
//
app.post('/Login', function(req, res){
console.log(req.body);
//var userName=req.body.Username;
//var password=req.body.password;
var userName=req.body.ValidUserName;
var userEmail=req.body.ValidEmailName;
var stat=0;

console.log(userName);
console.log(userEmail);


//build a query string to validate known user / user exists from
//my_users_table
var query="SELECT * FROM myusers_table where uname ='"+userName+"' and email ='"+userEmail+"'";

console.log(query);

 connection.query(query, function(err, rows){
if(err) 
{
console.log('Error');

}
console.log(rows.length);
 stat=rows.length; 
if(stat==0) //no known user exists
{

res.end('done');

}
else{
// User is a known user 
// get session variable sess
// set variables to be used sess.knownuserUserName,sess.knownuserUserId
sess = req.session;
sess.knownuser = true;
sess.knownuserUserName = rows[0].uname;
sess.knownuserUserEmail = rows[0].email;
sess.knownuserUserUid = rows[0].uid;
console.log('User is a known user')
console.log('the knownuser from the DB is.' + rows[0].uname);
console.log('the knownuser from the DB is.' + rows[0].email);
console.log('the knownuser from the DB is.' + rows[0].uid);
res.end('done');
}
  });


});

//
//app.post /Login
//





    //
	//app.get /Scores get top 10 scores and users top score in top ten
	//

app.get('/Scores', function(req, res){
	console.log('Getting Top Ten Game Scores');
	
	// set a variable adminPriv to true on initial data request 
	// this will allow top ten scores to be seen but not added/edited
	var adminPriv = false;
	sess = req.session;
	if (sess.knownuser){
		adminPriv = true;
	}
	else{
		adminPriv = false;
		
	}
	
	//build query string to obtain top ten scoresArray
	//with users highest score only
	
	var data_query2="SELECT myusers_table.uid,myusers_table.uname,myusers_table.email, myscores_table.entry_by, myscores_table.score_id, MAX(myscores_table.score) as topScore FROM myscores_table INNER JOIN myusers_table ON myusers_table.uid=myscores_table.uid GROUP BY myscores_table.uid ORDER BY topScore DESC LIMIT 10"
	
	
	//use your mysql connection to run data_query2 
	connection.query(data_query2, function(err, rows){
	if(err)
	{ //if error display in shell console 
	console.log('Error');
	console.log(err);
	
	}
	
	//no errors so create json object to send to client browser
	// loop thru rows returned from mysql query to create a specific json object for top scorers
	var scoresArray = [];
	var topscoreData;
    for (var i = 0;i < rows.length; i++) {
    scoresArray.push({name: rows[i].uname, score:rows[i].topScore});
	}

	var topscoreData=scoresArray;
	
	
	var returnMessage="WildWorks Top Ten Game Server Sending Top Ten Scores By User";
	
	// send json to /Scores with message, mytopscores(raw data) and created data from looping thru arrays
    res.json('/Scores', {'message': returnMessage,mytopscores:rows,data:topscoreData, admin:adminPriv, sessionData:sess,sessKnownUser:sess.knownuser  });
	
	});
	
    //
	//app.get /Scores get top 10 scores and users top score in top ten
	//
	
	
	
	
	
	
	
	
	//
	//app.post /addScore insert scores
	//
	
app.post('/addScore', function(req, res){
// display in shell console data from form post from the client browser
console.log(req.body); 
console.log('req.params is..' +JSON.stringify(req.params))
// set varaiables to form posted data from the client browser
var addedUserName = req.body.addedUserName;
var addedUserEmail = req.body.addedUserEmail;
var addedUserScore = req.body.addedUserScore;
var entrybyUserId = req.body.entrybyUserId;




// querry mysql with a callback
//query mysql my_users table to determine if the posted user for the new score exists already 
//if they do not create one first and then insert form data for new score
//else if user already exists do not create a new user just insert form data for new score
connection.query("SELECT * FROM  myusers_table WHERE uname = '"+addedUserName+"' ", function (error, results, fields) {
if (results.length <= 0) {
   console.log(error);
   console.log('no such user exists');
   console.log('we will create a new user first and then insert score');
    
   //if new user does not exist insert into my_users table table and get new id on callback for inserting into myscores_table
connection.query('insert into  myusers_table (uname, email) values ("' + addedUserName + '", "' + addedUserEmail + '")',function(err, info) {
	console.log(JSON.stringify(info) );
    console.log(info.insertId);
	var addedUserId = info.insertId;

// build an insert_query string to place data into myscores_table
var insert_query="insert into myscores_table values(0,"+addedUserScore+",NOW(),"+entrybyUserId+", "+addedUserId+")";

//insert the new score into the myscores_table 
connection.query(insert_query, function(err, rows){
if(err)
{
	console.log(err)
}
else
{
  console.log('just inserted into the scores table..' + JSON.stringify(rows) );
  
  // create return message and send json to client browser
  // send message, data(raw data rows from mysql), and insertId
  var returnMessage="Created New User and Added There Score"
  res.json( {'message': returnMessage,data:rows,insertId:rows.insertId  });
}


 });
	

	
	});


}
//else this user already exists so just insert there new score
else {
    console.log('This User Already Exists!');
	console.log('We do not need to create a new user first we will just insert score');
    console.log(results);
	console.log(results[0].uid)
	var existingUserId = results[0].uid;
	
	// build an insert_query string to place data into myscores_table
var insert_query="insert into myscores_table values(0,"+addedUserScore+",NOW(),"+entrybyUserId+", "+existingUserId+")";

//insert the new score into the myscores_table 
connection.query(insert_query, function(err, rows){
if(err)
{
	console.log(err)
}
else
{
  console.log('just inserted into the scores table..' + JSON.stringify(rows) );
  
 
 // create return message and send json to client browser
  // send message, data(raw data rows from mysql), and insertId
  var returnMessage="User Exists Already Added There Score"
  res.json( {'message': returnMessage,data:rows,insertId:rows.insertId}); 
 
 
}
 });
	

		

	
	
}


	
	});


});
	
	//
	//app.post insert a new score
	// 
	
	
	
	
//
// app.put /updateScore  
//

app.put( '/updateScore/:scoreId/:scoreAmount', function( req, res, next ) {
	
	
//display in shell console update request 
//display in shell console the param from the form put scoreId to be edited
console.log('just did a $http.post(/updateScore, score'); 
console.log("Received updateScore  request...");
console.log('the id for the score to be updated is ...' + req.params.scoreId);

	

//set variables equal to the requested params
var scoreId = req.params.scoreId;
var scoreAmount = req.params.scoreAmount;

// query string update_query 
// update_query update myscores_table where equal to sent scoreId
var update_query='UPDATE myscores_table SET score = "'+ scoreAmount +'" WHERE score_id = "'+scoreId+'"'


connection.query(update_query, function(err, rows){
if(err)
{ 
//if there was an error display in shell console
	console.log(err)
    
}
else
{
 
 
 var returnMessage="The User Score Was Just Updated"
 
 //send json with a returnMessage,data(raw mysql data rows), updateId
  res.json( {'message': returnMessage,data:rows,updateId:scoreId  });
 
}
 });	
	
	
    

} );
//
// app.put /updateScore  
//
	
	
	
	
});


app.listen(3000);
console.log("game server running on port 3000");
