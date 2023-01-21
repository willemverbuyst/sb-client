# What is this?

An server and a postgreSQL database setup, made with Express and Sequelize.

# Set up :electric_plug:

## Environment

1. Add a **.env** file at the server level of the project

2. Add the environment variables and update them with your credentials

3. Football api: you have two options

- Sign up and get an api key from the football api
- Run the service in this repo (this service mocks a football api response for teams and fixtures)
  > docker-compose up service

4. Create a PostgreSQL database

- cloud based
- with docker
  > docker-compose up totodb

## Development data

> **Note**
> set your environment to development in the dotenv

5. Update or create seed-files if needed
6. Use the bash scripts in server/src/db/dummy-data to generate dummy predictions if desired
   > generate_predictions.sh
7. Migrate tables and relations with
   > npx sequelize-cli db:migrate
8. Import teams by running
   > node api-football/api-calls.js --importTeams
9. Import your seeds with
   > npx sequelize-cli db:seed:all
10. Use the other scripts in server folder to undo/redo/customize your setup
    > bash set-up-dev-db.sh

## Server

11. Start server with
    > npm run dev

## Environment variables

NODE_ENV=development or production

PORT=port number

DATABASE_DEV=your postgres database

POSTGRES_USER=user

POSTGRES_PASSWORD=password

POSTGRES_DB=name of database

API_URL=https://www.api-football.com/ or local mock service

API_KEY=the API Key from https://www.api-football.com/ or generate a key for the mock service

LEAGUE_ID=check documentation football api or the mocked one

ID_FIRST_FIXTURE=check documentation football api or the mocked one

ID_LAST_FIXTURE=check documentation football api or the mocked one

UPDATE_INTERVAL=7200000 #2hrs

JWT_SECRET=string

JWT_EXPIRES_IN=time in ms

SALT_ROUNDS=number

EMAIL_USERNAME=email

EMAIL_PASSWORD=password

EMAIL_HOST=e.g. mailtrap

EMAIL_PORT=port number
