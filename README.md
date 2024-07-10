# DEV-TASKS-API
`Status: v1 completed`

------------
## Glossary
1.  Instructions
2. About me
3. Documentation

### 1. Instructions
- Clone the repository : 
`git clone https://github.com/luisfelix-93/dev-tasks-server`
- Access the directory :
`cd /dev-task-server`
- Install the dependencies:
`npm istall`

####  1.1 Configure
- Configure the environment variables in the `.env` file:
`MONGODB_URI={VALUE}`

#### 1.2 Use
- Run the server:
`npm start`
- Access the application at:
`htpp://localhost:5002/`

#### 1.3 Contribution
- Fork the project
- Create a new branch: 
`git checkout -b my-contribution`
- Make your changes and commit:
`git commit -m 'My contribution'`
- Submit your changes:
`git push origin my-contribution`
- Open a Pull-Request

#### 1.4 Test
- This project uses the jest lib for testing.
`npm run test`

### 2. About me
This API is being developed for the dev-task-repo project. `https://github.com/luisfelix-93/dev-task`
It consists of being almost a monolith responsible for managing users and tasks in the system.

### 3. Documentation
This API uses a login microsservice to provides the Bearer Token authorization. Check it on:
`https://github.com/luisfelix-93/dev-login-server/`

#### 3.1 Users
- This section refers to user endpoints
##### a) Createuser
###### Observation
-  The user can registrate only 1 email 

 - **Request:**
``` --http
    POST /user HTTP/1.1
    Host: localhost:5002
    Content-Type: application/json
    Authorization: Bearer ****
    Content-Length: 146
    {
        "userName" : "string",
        "fullName" : "string",
        "email" : "string",
        "password" : "string"
    }
```
 - **Response:**
- status 200
```json
{
	"message" : "User successfully created",
	"data": {
		 "userName" : "string",
        "fullName" : "string",
        "email" : "string",
        "password" : "string"
	}
}
```
- status 409
```json
{
	"message": "User already registrated!",
	"data" : null
}
```
- status 500
```json
{
	"message": "An internal error occurred",
	data: "status 500, An internal error occurred, {error}"
}
```

##### b) GetUser

- **Request:**
```http
GET /user HTTP/1.1
Host: localhost:5002
Authorization: Bearer ****
```
- **Response**
```json
{
	"message" : "Users successfully found"
	"data": {
		[
			 "userName" : "string",
        	"fullName" : "string",
      		"email" : "string",
        	"password" : "string"
		]
	}
}
```
##### c) GetUserByID

- **Request**:
```http
GET /user/{user_id} HTTP/1.1
Host: localhost:5002
Authorization: Bearer ****
```
- Response:
```json
{
	"message" : "Users successfully found"
	"data": {
		[
			 "userName" : "string",
        	"fullName" : "string",
      		"email" : "string",
        	"password" : "string"
		]
	}
}
```
#### 3.2 Tasks
##### a) CreateTask
- **Request:**

```http
POST /user/{user_id}/task HTTP/1.1
Host: localhost:5002
Content-Type: application/json
Authorization: Bearer ****
Content-Length: 94

{
    "taskType": string,
    "dateStart" : dateTime,
    "note" : string
}
```

- **Response:**

```json
{
    "message": "Task succefully created",
    "data": {
        "taskCode": string,
        "taskType": string,
        "dateStart": dateTime,
        "dateEnd": null,
        "note": string,
        "userId": string,
        "_id": objectId,
        "__v": 0
    }
}
```
##### b) UpdateTask

- **Request:**

```http
PUT /task/?taskCode={task_code} HTTP/1.1
Host: localhost:5002
Content-Type: application/json
Authorization: Bearer ****
Content-Length: 35

{
    "status" : string
}
```
- **Response:**

```json
{
    "message": "Task updated to {status}",
    "updatedTask": {
        "_id": objectId,
        "taskCode": string,
        "taskType": string,
        "dateStart": dateTime,
        "dateEnd": dateTime,
        "note": string,
        "userId": string,
        "__v": 0,
        "status": string
    }
}
```