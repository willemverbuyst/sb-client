GET [user] score fixture all users /scores/fixtures/:fixture_id

GET [user] score totoround all users /scores/totorounds/:totoround_id

GET [user] score round all users /scores/rounds/:round_id

GET [user] score totaltoto all users /scores/totaltoto

GET [user] score all fixtures specific user /scores/user/:user_id/fixtures

GET [user] score all totorounds specific user /scores/user/:user_id/totorounds

GET [user] score all rounds specific user /scores/user/:user_id/rounds

GET [user] score specifi fixture specific user /scores/user/:user_id/fixtures/fixture_id

GET [user] score specifi totoround specific user /scores/user/:user_id/totorounds/:totoround_id

GET [user] score specifi round specific user /scores/user/:user_id/rounds/:round_id

POST [user] login (profile + program) /users/login

POST [admin] signup /users/signup

POST [user] forgot password /users/forgotpassword

POST [user] reset password /users/resetpassword

GET [user] all users /users

GET [admin] specific user profile /users/:user_id

PATCH [user] user profile /users/:user_id

DELETE [admin] specific user /users/:user_id

GET [user] all teams /teams

GET [user] all predictions [logged in user] /predictions

POST [user] specific prediction [logged in user] /predictions/:prediction_id

PATCH [user] specific prediction [logged in user] /predictions/:prediction_id

GET [user] all predictions specific user /predictions/users/:user_id
