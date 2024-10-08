# DEV-TASKS-API
`Status: v2 started`

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
- **Build**
  - Command: `npm run build` or `yarn build`
  - Description: Compiles the NestJS application into the `dist` folder.

- **Format**
  - Command: `npm run format` or `yarn format`
  - Description: Formats the TypeScript files in the `src` and `test` directories using Prettier.

- **Start**
  - Command: `npm run start` or `yarn start`
  - Description: Starts the application in production mode.

- **Start:dev**
  - Command: `npm run start:dev` or `yarn start:dev`
  - Description: Starts the application in development mode with automatic reload on changes.

- **Start:debug**
  - Command: `npm run start:debug` or `yarn start:debug`
  - Description: Starts the application in debug mode, allowing for debugging.

- **Start:prod**
  - Command: `npm run start:prod` or `yarn start:prod`
  - Description: Starts the compiled application in production mode.

- **Lint**
  - Command: `npm run lint` or `yarn lint`
  - Description: Lints the TypeScript files in the `src`, `apps`, `libs`, and `test` directories and automatically fixes issues.

- **Test**
  - Command: `npm run test` or `yarn test`
  - Description: Runs the unit tests using Jest.

- **Test:watch**
  - Command: `npm run test:watch` or `yarn test:watch`
  - Description: Runs the unit tests in watch mode, re-running tests on file changes.

- **Test:cov**
  - Command: `npm run test:cov` or `yarn test:cov`
  - Description: Runs the unit tests and generates a coverage report.

- **Test:debug**
  - Command: `npm run test:debug` or `yarn test:debug`
  - Description: Runs the unit tests in debug mode, allowing for debugging during test execution.

- **Test:e2e**
  - Command: `npm run test:e2e` or `yarn test:e2e`
  - Description: Runs end-to-end tests using the Jest configuration specified in `./test/jest-e2e.json`.
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

#### 3.1 Tasks
##### a CreateTask
- **Request:**

```http
POST /task HTTP/1.1
Host: localhost:5002
Content-Type: application/json
Authorization: Bearer ****
Content-Length: 
```
- **Body:**
```json
{
  "taskType": "dev",
  "taskTitle": "Create API",
  "dateStart": "2024-10-08T12:00:00Z",
  "note": "Implement the new feature X",
  "owner_id": "653a0626fc13ae1d7b000006",
  "manager_id": "653a0626fc13ae1d7b000008"
}
```

- **Response:**

```json
{
  "taskCode": "DEV001",
  "taskType": "dev",
  "taskTitle": "Create API",
  "dateCreated": "2024-10-08T12:00:00Z",
  "dateStart": "2024-10-08T12:00:00Z",
  "dateEnd": null,
  "status": "backlog",
  "owner_id": {
    "user_id": "653a0626fc13ae1d7b000006",
    "user_name": "John Doe",
    "email": "john.doe@example.com"
  },
  "manager_id": {
    "user_id": "653a0626fc13ae1d7b000008",
    "user_name": "Jane Smith",
    "email": "jane.smith@example.com"
  }
}
```
##### b GetTaskList

- **Request:**

```http
GET /task HTTP/1.1
Host: localhost:5002
Authorization: Bearer ****
```
- **Response:**

```json
[
  {
    "taskCode": "DEV001",
    "taskType": "dev",
    "taskTitle": "Create API",
    "dateCreated": "2024-10-08T12:00:00Z",
    "dateStart": "2024-10-08T12:00:00Z",
    "dateEnd": null,
    "status": "backlog",
    "owner_id": {
      "user_id": "653a0626fc13ae1d7b000006",
      "user_name": "John Doe",
      "email": "john.doe@example.com"
    },
    "manager_id": {
      "user_id": "653a0626fc13ae1d7b000008",
      "user_name": "Jane Smith",
      "email": "jane.smith@example.com"
    }
  },
  ...
]
```

##### c GetTaskByCode
```http
GET /task/taskCode?=:DEV001 HTTP/1.1
Host: localhost:5002
Authorization: Bearer ****
```
- **Response:**
```json
{
  "taskCode": "DEV001",
  "taskType": "dev",
  "taskTitle": "Create API",
  "dateCreated": "2024-10-08T12:00:00Z",
  "dateStart": "2024-10-08T12:00:00Z",
  "dateEnd": null,
  "status": "backlog",
  "owner_id": {
    "user_id": "653a0626fc13ae1d7b000006",
    "user_name": "John Doe",
    "email": "john.doe@example.com"
  },
  "manager_id": {
    "user_id": "653a0626fc13ae1d7b000008",
    "user_name": "Jane Smith",
    "email": "jane.smith@example.com"
  }
}
```

##### d GetTaskByOwner
```http
GET /task/user/653a0626fc13ae1d7b000006 HTTP/1.1
Host: localhost:5002
Authorization: Bearer ****
```
- **Response:**
```json
[
  {
    "taskCode": "DEV001",
    "taskType": "dev",
    "taskTitle": "Create API",
    "dateCreated": "2024-10-08T12:00:00Z",
    "dateStart": "2024-10-08T12:00:00Z",
    "dateEnd": null,
    "status": "backlog",
    "owner_id": {
      "user_id": "653a0626fc13ae1d7b000006",
      "user_name": "John Doe",
      "email": "john.doe@example.com"
    },
    "manager_id": {
      "user_id": "653a0626fc13ae1d7b000008",
      "user_name": "Jane Smith",
      "email": "jane.smith@example.com"
    }
  },
  ...
]
```

##### e UpdateTaskByStatus
- **Request:**

```http
PUT /task/taskCode?=:DEV001 HTTP/1.1
Host: localhost:5002
Content-Type: application/json
Authorization: Bearer ****
Content-Length: 
```
- **Body:**
```json
{
  "status": "doing"
}

```

- **Response:**

```json
{
  "taskCode": "DEV001",
  "taskType": "dev",
  "taskTitle": "Create API",
  "dateCreated": "2024-10-08T12:00:00Z",
  "dateStart": "2024-10-09T12:00:00Z",
  "dateEnd": "2024-10-15T12:00:00Z",
  "status": "doing",
  "owner_id": {
    "user_id": "653a0626fc13ae1d7b000006",
    "user_name": "John Doe",
    "email": "john.doe@example.com"
  },
  "manager_id": {
    "user_id": "653a0626fc13ae1d7b000008",
    "user_name": "Jane Smith",
    "email": "jane.smith@example.com"
  }
}
```

##### f UpdateTaskOwner
- **Request:**

```http
PUT /task/taskCode?=:DEV001 HTTP/1.1
Host: localhost:5002
Content-Type: application/json
Authorization: Bearer ****
Content-Length: 
```
- **Body:**
```json
{
  "owner_id": "653a0626fc13ae1d7b000006"
}
```

- **Response:**

```json
{
  "taskCode": "DEV001",
  "taskType": "dev",
  "taskTitle": "Create API",
  "dateCreated": "2024-10-08T12:00:00Z",
  "dateStart": "2024-10-09T12:00:00Z",
  "dateEnd": null,
  "status": "backlog",
  "owner_id": {
    "user_id": "653a0626fc13ae1d7b000006",
    "user_name": "John Doe",
    "email": "john.doe@example.com"
  },
  "manager_id": {
    "user_id": "653a0626fc13ae1d7b000008",
    "user_name": "Jane Smith",
    "email": "jane.smith@example.com"
  }
}
```

##### g UpdateTaskOwner
- **Request:**

```http
PUT /task/taskCode?=:DEV001 HTTP/1.1
Host: localhost:5002
Content-Type: application/json
Authorization: Bearer ****
Content-Length: 
```
- **Body:**
```json
{
  "manager_id": "653a0626fc13ae1d7b000006"
}
```

- **Response:**

```json
{
  "taskCode": "DEV001",
  "taskType": "dev",
  "taskTitle": "Create API",
  "dateCreated": "2024-10-08T12:00:00Z",
  "dateStart": "2024-10-09T12:00:00Z",
  "dateEnd": null,
  "status": "backlog",
  "owner_id": {
    "user_id": "653a0626fc13ae1d7b000006",
    "user_name": "John Doe",
    "email": "john.doe@example.com"
  },
  "manager_id": {
    "user_id": "653a0626fc13ae1d7b000008",
    "user_name": "Jane Smith",
    "email": "jane.smith@example.com"
  }
}
```
##### h DeleteTask
```http
DELETE /task/taskCode?=:DEV001 HTTP/1.1
Host: localhost:5002
Authorization: Bearer ****
```
- **Response:**
```json
{
  "message": "Task with code DEV001 was successfully deleted."
}

```
##### Obs.:
###### Data Structure

- Task Schema

| Field       | Type     | Required | Description                                           |
|-------------|----------|----------|-------------------------------------------------------|
| `taskCode`  | `string` | Yes      | Unique code for the task                             |
| `taskType`  | `string` | Yes      | Type of the task (`dev`, `arch`, etc.)                |
| `taskTitle` | `string` | Yes      | Title of the task                                    |
| `dateStart` | `Date`   | No       | Start date of the task                               |
| `dateEnd`   | `Date`   | No       | End date of the task                                 |
| `status`    | `string` | Yes      | Status of the task                                   |
| `owner_id`  | `UserEntity` | Yes   | User responsible for the task                        |
| `manager_id`| `UserEntity` | No    | User managing the task                               |

- UserEntity Schema

| Field       | Type     | Required | Description                                           |
|-------------|----------|----------|-------------------------------------------------------|
| `user_id`   | `string` | Yes      | Unique identifier for the user                       |
| `user_name` | `string` | Yes      | Name of the user                                     |
| `email`     | `string` | Yes      | Email of the user                                    |
