Create Account

Creates new account and adds it to database

URL

http://go-easy.herokuapp.com/createaccount   

Method:

POST

URL Params

None

Required: 

Data Params

Username = [String];
hash = [String];

Success Response:

Code: 200 
Content: "success"

Error Response:

Code: 404 NOT FOUND 
Content: { error : "User already exists" }

// ---------------------- //

Login

Input fields for username and password

URL

http://go-easy.herokuapp.com/login

Method:

GET

URL Params

None

Required: 

Data Params

Username = [String];
Hash = [String];

Success Response:

Code: 200 
Content: "success"

Error Response:

Code: 404 NOT FOUND 
Content: { error : "User already exists" }

// ---------------------- //

Task

Shows all the task with title, date and description

URL

http://go-easy.herokuapp.com/task/:username:

Method:

GET

URL Params

None

Required: 

Data Params

Task= [String];

Success Response:

Code: 200 
Content: "success"

// ---------------------- //

Create Task

Creates a task with title, date and description

URL

http://go-easy.herokuapp.com/createtask

Method:

POST

URL Params

None

Required: 

Data Params

Task ID = [Integer];
Title= [String];
Date = [String];


Success Response:

Code: 200 
Content: "success"

// ---------------------- //

Modify Task

Modifies Task, delete, change title and description etc.

URL

http://go-easy.herokuapp.com/modifytask

Method:

POST

URL Params

None

Required: 

Data Params

Task ID = [Integer];
Title= [String];
Date = [String];

Success Response:

Code: 200 
Content: "success"

// ---------------------- //

Delete Task

Makes it possible to delete task

URL

http://go-easy.herokuapp.com/deletetask

Method:

DELETE

URL Params

None

Required: 

Data Params

Task ID = [Integer];
Token = [Integer];

Success Response:

Code: 200 
Content: "success"




