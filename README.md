## Installation

```bash
$ yarn
```

## Getting redis
```bash
$ docker pull redis
```

## Starting redis server
```bash
$ docker run -d -p 6379:6379 redis
```

## Create .env file
- create a file called .env in the app root path, and copy env.example content to it;
- the empty variables must be filled with client_id and client_secret from https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token
  - `AUTH_CLIENT_ID=client_id passed to you`
  - `AUTH_CLIENT_SECRET=client_secret passed to you`

## Running the app

### 1. Start application
  ```bash
  # development
  $ yarn start

  # watch mode
  $ yarn start:dev

  # production mode
  $ yarn start:prod
  ```
### 2. Open swagger
  [Go to Swagger @ http://localhost:3000/api](http://localhost:3000/api)

### 3. Getting the token
  - Point to [Login endpoint: http://localhost:3000/auth/login](http://localhost:3000/auth/login)
    - username (your email)
    - password (your email base64) => to generate password go to [https://www.base64encode.org/](https://www.base64encode.org/) write preivous username in the first textbox and click **encode**. The password will be generated in the second textbox. Copy it and use as your password.
  - use the *access_token* returned in the login endpoint to make requests to the api


## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ npm test:e2e

# test coverage
$ npm test:cov
```
