# What is this?

A repo with a server and database access, made with Express and Sequelize.

This is a continuation of a project started/created by [Michelle Pesch](https://github.com/mipes4/sportsbetting_fe).

The goal was to move a big part of the calculation/filter logic to the back-end and reduce the amount of data being transferred. For this a I created a new back-end repo.

## Set up :electric_plug:

### General

In config/constants.js and config/config.js the process.env variables are listed. Please replace the values with your own keys in a `.env` file.

1. DATABASE_DEV=[Your postgres database (example)](https://www.elephantsql.com/)
2. JWT_SECRET=Your secret
3. API_URL=[The API URL from https://www.api-football.com/](https://www.api-football.com/)
4. API_KEY=[The API Key from https://www.api-football.com/](https://www.api-football.com/)

### Get runnning

1. Clone Repo
2. `npm i` to install dependencies.
3. Create a postgresql database.
4. Get an api key from api-football.
5. Update process.env variables with your credentials.
6. Migrate tables and relations. `npx sequelize-cli db:migrate`
7. Uncomment line 18/19/23/24 in index.js and start server with `npm run dev`. This to fetch the teams for the favteam table and all the fixtures.
8. Once fetched comment out these lines to prevent refetching during development. Shut down the server.
9. Seed the tables with seeders. `npx sequelize-cli db:seed:all`
10. Start server. `npm run dev`
