# Store Manager

This is a project developed at Trybe's Back-End Module.

Store Manager is an API developed using software architecture (Models, Services and Controllers) to receive HTTP requisitions to manage a simplified store database and then return a response to client.

# Summary
- [Store Manager](#store-manager)
- [Summary](#summary)
- [Technologies and Tools Used](#technologies-and-tools-used)
- [Notes](#notes)
- [Git and Commits](#git-github-and-commit-history)
- [Lint](#lint)
- [Installing and running the app](#installing-and-running-the-app)
- [Documentation](#documentation)

# Technologies and Tools Used
This project used the following technologies and tools:
  * __Node__ | [Javascript Runtime Environment](https://reactjs.org/docs/thinking-in-react.html)
  * __Express__ | [Web Framework for NodeJS](https://redux-toolkit.js.org/introduction/getting-started)
  * __Hapi/Boom__ | [HTTP Error Objects](https://hapi.dev/module/boom/) 
  * __Joi__ | [Data Validation](https://joi.dev/api/?v=17.6.0) 
  * __Mocha__ | [JS Test Framework](https://mui.com/pt/material-ui/getting-started/overview/) 
  * __Sinon__ | [Test Spies, Stubs and Mocks](https://sinonjs.org/releases/v14/) 
  * __Chai__ | [Assertion Test](https://www.chaijs.com/api/) 

# Notes
### Git, GitHub and Commit History
- This project used the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/) with some types from [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Lint
- The project was developed following the Clean Code standards specified by [Trybe's Lint](https://github.com/betrybe/eslint-config-trybe).

### Files
 - The docker-compose.yml, migration.sql and seed.sql were made available by Trybe.


# Installing and running the app

\* To run this app is need docker and docker-compose installed.

### Build docker containers and their network.
```
cd store-manager
docker-compose up -d
```

### Entering the bash terminal from the Node container.
```
docker exec -it store_manager bash
```

### Built and populate database.
```
npm run migration
npm run seed
```

### Run the node server.
```
npm run debug
```

# Documentation

## Products

<details>
 <summary>Get all products.</summary>

```http
GET /products
```

- Response:
  - code: 
  ```http
  200
  ```
  - body:
  ```json
  [
    {
      "id": 1,
      "name": "Martelo de Thor",
    },
    {
      "id": 2,
      "name": "Traje de encolhimento",
    }
    /* ... */
  ]
  ```
  - code: 
  ```http
  404
  ```
  - body:
  ```json
  {
   "statusCode": 404,
   "error": "Not Found",
   "message": "Product not found"
  }
  ```
</details>
 
<details>
 <summary>Get product by ID.</summary>

```http
GET /products/:id
```
- Request:
  - params:
  ```
  id -> Product ID
  ```
- Responses:
  - code: 
  ```http
  200
  ```
  - body:
  ```json
   {
    "id": 1,
    "name": "Martelo de Thor",
   }
  ```
   - code: 
  ```http
  404
  ```
  - body:
  ```json
  {
   "statusCode": 404,
   "error": "Not Found",
   "message": "Product not found"
  }
  ```
</details>

<details>
 <summary>Create a product.</summary>

```http
POST /products
```
- Request:
  - schema:
  ```json
  {
    "name": "string",
    required: true,
    minLength: 5
  }
  ```
  - body:
  ```json
  {
    "name": "ProdutoX"
  }
  ```
- Responses:
  - code: 
  ```http
  201
  ```
  - body:
  ```json
  {
    "id": 1,
    "name": "Martelo do Batman"
  }
  ```
</details>

<details>
 <summary>Update a product.</summary>

```http
PUT /products/:id
```
- Request:
  - params:
  ```
  id -> Product ID
  ```
  - schema:
  ```json
  {
    "name": "string",
    required: true,
    minLength: 5
  }
  ```
  - body:
  ```json
  {
    "name": "Martelo do Batman"
  }
  ```
- Responses:
  - code: 
  ```http
  200
  ```
  - body:
  ```json
  {
    "id": 1,
    "name": "Martelo do Batman"
  }
  ```
  - code: 
  ```http
  404
  ```
  - body:
  ```json
  {
   "statusCode": 404,
   "error": "Not Found",
   "message": "Product not found"
  }
  ```
</details>
...In progress
