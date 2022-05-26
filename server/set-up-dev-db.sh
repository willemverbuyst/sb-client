npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
node src/db/api-football/api-calls.js --importTeams
node src/db/api-football/api-calls.js --importFixtures
# npx sequelize-cli db:seed --seed 1-dummy-admin.js
# npx sequelize-cli db:seed --seed 2-dummy-users.js
# npx sequelize-cli db:seed --seed 3-dummy-predictions.js
npx sequelize-cli db:seed:all


