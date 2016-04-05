
Wildworks Top Score Server
Description
gets top 10 scores listing players max scores
known existing users can login and 
1)add new scores 
2)edit existing scores

Technologies:
Back End Server
Node.js 
Express
Node mysql

Front End Display and Test
Angular
Tested On:
Mozilla Firefox 44.0.2 
Google Chrome	49.0.2623.87 (Official Build) m (32-bit)

Database
mysql

To Utilize:
Set Up mysql databse with tables and data:
Run mygame_db.sql in DB folder in mysql to create a mysql database mygame_db database, with two tables 1)myscores_table with sample data and 2)myusers_table with sample data

Has project dependicies in node_modules folder

From shell console change to directory with highscoreserver.js

Run node highscoreserver to start server 

Browse to localhost:3000 on your web browser
Tested On:
Mozilla Firefox 44.0.2 
Google Chrome	49.0.2623.87 (Official Build) m (32-bit)
Can View Top Ten Scores works with api
app.get('/Scores'


To Add and Edit Scores Login As Known User Admin
with username and email 
Can use:
Username: Paul Milham (case sensitive)
Email:    pmilham@wildworks.com (case sensitive) 
can also use other known users listed in myusers_table
Login works with api 
app.post('/Login'


To Add click on Add Score Button
Add Existing User Scores
Add New User Scores
Add Scores works with api
app.post('/addScore'

To Edit Score click on score itself and hit enter when done
or click on edit link next to score and hit save when don 
Edit Scores works with api 
app.put( '/updateScore/:scoreId/:scoreAmount'

When Finished Add/Edit If Desired can logoff if wanted
Logoff works with api 
app.get('/Logout'




