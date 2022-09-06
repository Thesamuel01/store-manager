# Store Manager

This is a project developed at Trybe's Back-End Module.

Store Manager is an API developed using software architecture (Models, Services and Controllers) to receive HTTP requests to manage a store database and then return a response to client.

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
  * __Chai__ | [Asserts](https://www.chaijs.com/api/) 

# Notes
### Git, GitHub and Commit History
- This project used the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/) with some types from [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Lint
- The project was developed following the Clean Code standards specified by [Trybe's Lint](https://github.com/betrybe/eslint-config-trybe).

### Files
 - The docker-compose.yml, migration.sql and seed.sql were made available by Trybe.


# Installing and running the app

## Running without docker

\* __To run this app without docker you need a running MYSQL server.__

### Enter into project directory
```
cd store-manager
```
### Set environment variables

Set your environment variables in .env.example file according to your development environment and then change its name to .env
```
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
PORT=
```

### Install project dependencies
```
npm install
```

### Built and populate database.
```
npm run migration
npm run seed
```

### Run node server.
```
npm start
```

## Running with docker

### Build docker containers and their network.
```
cd store-manager
docker-compose up -d
```

### Entering the bash terminal from the Node container.
```
docker exec -it store_manager bash
```

### Install project dependencies
```
npm install
```

### Built and populate database.
```
npm run migration
npm run seed
```

### Run node server.
```
npm start
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
  ---
    
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
 <summary>Get product by name.</summary>

```http
GET /products/search
```
- Request:
  - query:
  ```
  q -> Product name terms
  ```
- Responses:
  - code: 
  ```http
  200
  ```
  - body:
  ```json
  // GET /products/search?q=Thor
  
  [
    {
      "id": 1,
      "name": "Martelo de Thor",
    }
  ]
  ```
  - body:
  ```json
  // GET /products/search?q=
  
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
  - body:
  </br>*Find anything*
  ```json
  []
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
    "name": "Produto XYZ"
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
    "id": 4,
    "name": "Produto XYZ"
  }
  ```
  
  ---

  - code: 
  ```http
  400
  ```
  - body:
   </br>*Blank name attribute in request body*
  ```json
  {
   "statusCode": 400,
   "error": "Bad Request",
   "message": "\"name\" is required"
  }
  ```
  - body:
    </br>*Name attribute with no minimum length in request body*
  ```json
  {
   "statusCode": 400,
   "error": "Bad Request",
   "message": "\"name\" length must be at least 5 characters long"
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
    "name": "Picareta do Chapolin"
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
    "name": "Picareta do Chapolin"
  }
  ```

  ---

  - code: 
  ```http
  400
  ```
  - body:
   </br>*Blank name attribute in request body*
  ```json
  {
   "statusCode": 400,
   "error": "Bad Request",
   "message": "\"name\" is required"
  }
  ```
  - body:
    </br>*Name attribute with no minimum length in request body*
  ```json
  {
   "statusCode": 400,
   "error": "Bad Request",
   "message": "\"name\" length must be at least 5 characters long"
  }
  ```
  
  ---
 
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
 <summary>Delete a product.</summary>

```http
DELETE /products/:id
```
- Request:
  - params:
  ```
  id -> Product ID
  ```

- Responses:
  - code: 
  ```http
  204
  ```
  
  ---
 
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

## Sales

<details>
 <summary>Get all sales.</summary>

```http
GET /sales
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
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
    /* ... */
  ]
  ```
</details>
 
<details>
 <summary>Get sale by ID.</summary>

```http
GET /sales/:id
```
- Request:
  - params:
  ```
  id -> sale ID
  ```
- Responses:
  - code: 
  ```http
  200
  ```
  - body:
  ```json
  [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
    /* ... */
  ]
  ```
  ---
    
  - code: 
  ```http
  404
  ```
  - body:
  ```json
  {
   "statusCode": 404,
   "error": "Not Found",
   "message": "Sale not found"
  }
  ```
</details>

<details>
 <summary>Create a sale.</summary>

```http
POST /sales
```
- Request:
  - schema:
  ```json
  [
   {
     "productId": "number",
     required: true

     "quantity":"number"
     required: true,
     greaterThanOrEqual: 1
   }
  ]
  ```
  - body:
  ```json
  [
    {
      "productId": 1,
      "quantity":1
    },
    {
      "productId": 2,
      "quantity":5
    }
  ]
  ```
- Responses:
  - code: 
  ```http
  201
  ```
  - body:
  ```json
  {
    "id": 3,
    "itemsSold": [
      {
        "productId": 1,
        "quantity":1
      },
      {
        "productId": 2,
        "quantity":5
      }
    ]
  }
  ```
  
  ---

  - code: 
  ```http
  400
  ```
  - body:
   </br>*Blank productId attribute in request body*
  ```json
  {
   "statusCode": 400,
   "error": "Bad Request",
   "message": "\"productId\" is required"
  }
  ```
  
  - body:
   </br>*Blank quantity attribute in request body*
  ```json
  {
   "statusCode": 400,
   "error": "Bad Request",
   "message": "\"quantity\" is required"
  }
  ```
  
  ---
  
  - code: 
  ```http
  404
  ```
  - body:
   </br>*Product does not found*
  ```json
  {
   "statusCode": 400,
   "error": "Bad Request",
   "message": "Product not found"
  }
  ```
  
  ---
  
  - code: 
  ```http
  422
  ```
  - body:
  ```json
  {
   "statusCode": 422,
   "error": "Unprocessable Entity",
   "message": "\"quantity\" must be greater than or equal to 1"
  }
  ```
</details>

<details>
 <summary>Update a product.</summary>

```http
PUT /sales/:id
```
- Request:
  - params:
  ```
  id -> Sale ID
  ```
  - schema:
  ```json
  [
   {
     "productId": "number",
     required: true,

     "quantity":"number"
     required: true,
     greaterThanOrEqual: 1
   }
  ]
  ```
  - body:
  ```json
  [
    {
      "productId": 1,
      "quantity":10
    },
    {
      "productId": 2,
      "quantity":50
    }
  ]
  ```
- Responses:
  - code: 
  ```http
  200
  ```
  - body:
  ```json
  {
   "saleId": 1,
   "itemsUpdated": [
     {
       "productId": 1,
       "quantity":10
     },
     {
       "productId": 2,
       "quantity":50
     }
   ]
  }
  ```
  
  ---

  - code: 
  ```http
  400
  ```
  - body:
   </br>*Blank productId attribute in request body*
  ```json
  {
   "statusCode": 400,
   "error": "Bad Request",
   "message": "\"productId\" is required"
  }
  ```
  
  - body:
   </br>*Blank quantity attribute in request body*
  ```json
  {
   "statusCode": 400,
   "error": "Bad Request",
   "message": "\"quantity\" is required"
  }
  ```
  
  ---
 
  - code: 
  ```http
  404
  ```
  - body:
  ```json
  {
   "statusCode": 404,
   "error": "Not Found",
   "message": "Sale not found"
  }
  ```
 
  - code: 
  ```http
  422
  ```
  - body:
  ```json
  {
   "statusCode": 422,
   "error": "Unprocessable Entity",
   "message": "\"quantity\" must be greater than or equal to 1"
  }
  ```
</details>

<details>
 <summary>Delete a sale.</summary>

```http
DELETE /sales/:id
```
- Request:
  - params:
  ```
  id -> sale ID
  ```

- Responses:
  - code: 
  ```http
  204
  ```
  
  ---
 
  - code: 
  ```http
  404
  ```
  - body:
  ```json
  {
   "statusCode": 404,
   "error": "Not Found",
   "message": "Sale not found"
  }
  ```
</details>
