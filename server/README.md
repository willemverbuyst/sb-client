# What is this?

A repo with a server and a PostgreSQL database setup, made with Express and Sequelize.

This is a refactored version of a project started/created by [Michelle Pesch](https://github.com/mipes4/sportsbetting_fe).

# Development version

## Set up :electric_plug:

### Genreal

1. Clone the repo
2. Run `npm i` to install the dependencies

### Environment

3. Create a PostgreSQL database
4. Sign up and get an api key from the football api
5. Add a `.env` file at the root level of the project
6. Add the environment variables and update them with your credentials

### Database

7. Update or create seed-files if needed
8. Use the `generate_predictions.sh` bash script to generate dummy predictions if desired
9. Migrate tables and relations with `npx sequelize-cli db:migrate`
10. Import teams by running `node api-football/api-calls.js --importTeams`
11. Import your seeds with `npx sequelize-cli db:seed:all`
12. Use the scripts in the `post-release.sh` and/or `package.json` files to undo/redo/customize your setup.

### Server

13. Start server with `npm run dev`

## Environment variables

NODE_ENV=development or production

PORT=port number

DATABASE_DEV=[Your postgres database (example)](https://www.elephantsql.com/)

API_URL=[The API URL from https://www.api-football.com/](https://www.api-football.com/)

API_KEY=[The API Key from https://www.api-football.com/](https://www.api-football.com/)

LEAGUE_ID=Check documentation football api

ID_FIRST_FIXTURE=Check documentation football api

ID_LAST_FIXTURE=Check documentation football api

UPDATE_INTERVAL=7200000 #2hrs

JWT_SECRET=string

JWT_EXPIRES_IN=time in ms

SALT_ROUNDS=number

EMAIL_USERNAME=email

EMAIL_PASSWORD=password

EMAIL_HOST=e.g. mailtrap

EMAIL_PORT=port number

# Production version

## Set up :electric_plug

1. Create a new project at your host
2. Add a PostgreSQL database
3. Add env variables
4. Update post-release script to migrate tables and seed database
5. Deploy the branch you have for production

## Environment variables

API_URL=[The API URL from https://www.api-football.com/](https://www.api-football.com/)

API_KEY=[The API Key from https://www.api-football.com/](https://www.api-football.com/)

LEAGUE_ID=Check documentation football api

ID_FIRST_FIXTURE=Check documentation football api

ID_LAST_FIXTURE=Check documentation football api

UPDATE_INTERVAL=7200000 #2hrs

JWT_SECRET=string

JWT_EXPIRES_IN=time in ms

SALT_ROUNDS=number

EMAIL_USERNAME=email

EMAIL_PASSWORD=password

EMAIL_HOST=e.g. mailtrap

EMAIL_PORT=port number
