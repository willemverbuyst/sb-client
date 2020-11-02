## Set up :electric_plug:

### General

In config/constants.js and config/config.js the process.env variablesthere are listed. Please replace the values with your own keys in a `.env` file.

1. DATABASE_DEV=[Your postgres database (example)](https://www.elephantsql.com/)
2. JWT_SECRET=Your secret
3. API_URL=[The API URL from https://www.api-football.com/](https://www.api-football.com/)
4. API_KEY=[The API Key from https://www.api-football.com/](https://www.api-football.com/)

### Create database

1. Migrate tables and relations
2. Start server and use getTeams() to fetch the teams for the favteam table
3. Once fetched comment out getTeams to prevent refetching.
4. Seed the tables with seeders.
