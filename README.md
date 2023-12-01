
# youNode_task


## Description

[Requierment Doc]() for the task of YouNode

## Project structure
```
rootDir
  /src
    /microservices
      /api
      /user-service
      /purchase-history-service
      /message-service
  docker-compose.yml
```
Here :
1. `api` is the api gateay for microservices
2. `user-service` is the microservice for userService
3. `purchase-history-service` is the microservice for purchaseHistoryService
4. `message-service` is the microservice for messageService

Each Microservice has a `Dockerfile` 

`docker-compose.yml` is the docker-compose.yml file. Docker-compse consists of PostgresSQL and RabbitMQ.

it will better to create db for each service
maintain the env.example.

To run each service idepndently, go to each directory for microservices and run:

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```
## Dependency 
1. prep of .env
2. prep of db:  create individual db for each service
3. run migration on user service
```bash
# generate migration
npm run migration:generate ./migrations/<nameOFMigration>

# run migration
npm run migration:run
```
4. seed for user and product
```bash
# in user service directory 
npm run seed

# in purchase-history-service directory
npm run seed
```

## Order of execution for micro services

1. user-service
2. purchase-history-service
3. message-service
4. api

## apit.HTTP
the api.http has the publicly exposed api endpoints. After running all services and seeding run the api.http :: `populatePurchaseHistory` for the seeding of purchase history.

## Milesotnes that are done
  ### User service
    * user service intro as micro service with TCP commuication between Purchase history service , Message service,  api gateway.
    * DTOs are defined with interface typed for the response to the api gateway.
    * Unit test for user service get userById
    * Faker js implemnted to populate as much as user as possible
    * Migration and seed for user
    * User List provied between each microservices for further implimantation of bussines logic 
    * user list is a cursor based pagination list 
    * deep delete implemnted for delete user we will be able to delete all the purchase history for that user.
    * established endpoints for communicating between users
    * login based access_token generation is also done
    * user list api gate way is scured with auth guard with JWT token but not for other micorsercices as they are hidden from the consumer
    * Errors are properly handled by nest expction and custom build interfaces 

  ### Purchase history service
    * created product entity for purchase history, 
    * seeders for products genereated by faker
    * cursor based pagination for Products 
    * purchase history service  TCP commuication between user service,  message service,  api gateway implemented
    * purchase hisrotry population with chunk strategy with user and products pre generated data. Also scalable for large data input to db with chunk starategy.
    * product DTOs are build.


  ### Message service
    * message service configured with RabitMQ
    * created batch service for meeting the scalabilty and performance requirement. 
    * message queue is genegrate with RabbitMQ and consumed 
    * Scheduler impletemnted for generating user message based on purhcase history 
    * scheduler for starting the message service at 8Am everyday implemtned

  ### Api gateway
    * api gateway for microservices
    * api gateway implemtned with JWT token for auth 
    * getting proper response from each microservice
    * also triggering events for purchase history population

  ### Dockeriztion 
    * each microservice is dockerized
    * docker-compose.yml is also equiped with db and rabbitmq 

## Milestones that are not been done
  * conpresensive api end points are not build
  * conpresnessive unit testes are not written
  * conpresnessive integration testes are not written
  * for all cases Dtos are not implemnted

## Conclusion 
I have tried to meet all the requirement for each microservices that are must be need to be done. I and i have left out the redundent tasks  for this time bounded project.