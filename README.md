# Express Template

## Overview

The purpose of this repository is to provide an example outline for a Node.js, Express-based API to be run in a Docker container. It includes a suggested repository structure, linting configurations, a local test Postgres instance to be run on a Docker container, startup scripts, etc.

The basic "Todo" API implemented is very contrived, but the idea is that the structuring of this API and configuration could be extended to an actual use case.

Additionally, no tests have been included in this repo for brevities sake, though if they were I'd use the Jest library and include a /tests folder.

## Repository Structure

In the Express ecosystem, there are a huge variety of ways to structure a REST API. The pattern in this repo is derived from a couple standards, including drawing inspiration from MVC. Below is the outline of a simple, yet extensible way for us to structure an API:

### Routes

This is where we will include routes, which will be used to chain REST endpoints to controllers. Routes are intended to be devoid of any logic, and can be thought of simply as a link in the chain. Most of the time, we want to have 1 route mapping to 1 controller, though there are cases when a 1:many relationship is desirable.

As far as file organization goes, for our purposes we can simply group all of our routes in a singular `index.js` file since they are so lightweight and we intend a "microservices" approach. If we wanted to be more modular, we could split routes out in to separate files and combine/export them via the `index.js` file under /routes.

### Controllers

Controllers can be thought of as orchestrators as they link our routes to our services (where business logic lives). They should not include any business logic, and should simply call methods exposed by our services and then decide what to do with the response. Validation can be done here. Furthermore, this is where Express related logic ends, IE we don't pass the `req` or `res` objects any further down the chain.

Like the routes folder, we can choose to break out our controllers in to separate files and then combine/export them out of index.js under /controllers.

### Services

Services is where basically all of our business logic lives. External API calls, calls to database models, and our algorithmic code lives here. A service should return only what the controller needs to return to the client.

The same file structuring pattern proposed above is used in /services.

### Models

This is where our database connection as well as database models (assuming we're using a relational data store) are placed. If we're interacting with a relational data store, we should be using an ORM. The ORM used in this repository will be discussed later in the `Libraries` section.

The same file structuring pattern proposed above is used in /models.

### Utils

Utils contains any helper functions that are used across the repository. However, these functions are generally devoid of any business logic. An example would be a function that converts feet to meters.

### Config

Config is where we place any configuration files that may change based on environment and need to be used in the setup of the server.

### Scripts

This contains utility/setup scripts related to the repo. At the moment, it contains two scripts related to building and running the Dockerfile located in the root of the repo.

### DB

DB is simply used for local testing. It includes a `docker-compose.yml` that can be used to spin up a Postgres database locally on port 5432. There are some scripts (not good ones, mind you) included in here related to setting up the database.

### All other files

The entry point for the server is `app.js` where we set up some middlewares and set the server to listen on port 8080. The specific middlewares used will be discussed in the `Libraries` section. Furthermore, there is also a Dockerfile that is used to containerize the application. Finally, the remainder of the files are related to linting configuration, NPM-related files, git configurations, and NVM configurations.

## Getting Started

These instructions detail the template dependencies, initial installation, and steps for running locally.

### Prerequisites

The dependencies for this template include Node (ideally using NVM) and Docker.

#### Node

The service is implemented in Node, and the version defined in the .nvmrc is the latest version of LTS 10.x (Dubnium). The installer can be found here: https://nodejs.org/en/download/. It is also suggested that you install NVM, with instructions found in the github here: https://github.com/nvm-sh/nvm. NVM is used to manage the version of node currently running on your machine. Read the docs if you're unsure.

#### Docker

The service is intended to be run on a Docker container, and if you want to deploy it to a Docker container locally you'll need Docker. https://docs.docker.com/install/.

### Installing

Upon cloning the repository, the first step that needs to be taken (assuming you've got Node/NPM installed) is to run `npm install` in the root of the repository. This will install all of the production and development JavaScript dependencies.

### Running Locally

Once you've installed, you should be able to run the server locally on `localhost:8080`. A `package.json` script is provided for your convience using nodemon. Run `npm run dev` to start the server running locally.

In order for the server to access the database, we'll also need to start up our Postgres container. Assuming the Docker Daemon is running, navigate to db/local/ and run `docker-compose up --build`. This should get a clean Postgres instance running locally. From there, run `sh create-database.sh` to create a logic database in Postgres, then run `node initialize.js` and `node seed.js` in that order. There should now be a table called `Todos` with three entries in the `database_development` Postgres database. I know the configuration here is ugly as heck, but bear with it. This was done quick and dirty.

You should now be able to hit endpoints on the API and receive responses.

### Linting/Formatting

Since JavaScript is an interpreted, dynamically-typed language linting and formatting standards are super important. There are two scripts included in the `package.json` file to help with this. The two commands are `npm run lint` and `npm run format`. For this template, we are using the Airbnb JavaScript style guide, which is fairly strict and opinionated.

If you have VS-Code, I recommended you download the ESLint and Prettier extensions and configure them in user settings. They will allow you to lint and format as you write your code, rather than having to use the above scripts.

NOTE: Before any code is checked in to source control, always make sure to run the above two commands to ensure consistency and style. Javascript is a lawless wasteland otherwise.

## Libraries

Below is a quick overview of the notable libraries and middlewares used in this Repo. Express has a bunch, and we can pick and choose as well as integrate them super easily. I know security was a concern raised, but if we offload most of that to API Gateway we should be good to go and not need to include an authentication middleware in our application code.

### Body-Parser

An Express middleware used to parse incoming request bodies to make them nice and friendly for your handlers. https://www.npmjs.com/package/body-parser.

### Bunyan

An application logging library, easy to configure and a great alternative to spamming console.log. https://www.npmjs.com/package/bunyan.

### CORS

An Express middleware used to enable CORS. Not sure if we'll need this one or not. https://www.npmjs.com/package/cors.

### Express

A popular Node.js server framework. https://www.npmjs.com/package/express.

### Helmet

An Express middleware used for security, mostly around setting HTTP headers. May not be necessary with API Gateway. https://www.npmjs.com/package/helmet.

### Lodash

General utility, basically the swiss army knife of NPM. https://www.npmjs.com/package/lodash.

### Validator

A utility we can use to validate and sanitize client requests, params, query strings, etc. https://www.npmjs.com/package/validator.

### ESLint

A JavaScript linter that's been adopted as the defacto standard. Highly configurable. https://www.npmjs.com/package/eslint.

### Prettier

A JavaScript formatter that's also a standard. Also highly configurable. https://www.npmjs.com/package/prettier.

### Nodemon

Helps with locally development, automatically restarts your server when you change application code. https://www.npmjs.com/package/nodemon.

### Sequelize

The ORM we should use if we're working with a relational datastore. Supports MySQL, Postgres, MariaDB, SQL Server etc. https://www.npmjs.com/package/sequelize.

### PG

A Postgres driver/client for Node.js, needed with Sequelize I believe. https://www.npmjs.com/package/pg.
