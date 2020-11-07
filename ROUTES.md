# Auth

### /login

- [x] `POST` Login with email and password

### /me

- [x] `GET` If there is a valid token, return user info

### /me/password

- [x] `PATCH` User can change password

### /me/profile

- [x] `PATCH` User can change the details of her/his profile

### /signup

- [x] `POST` Only the admin can signup a new member

&nbsp;

# Users

### /users

- [x] `GET` An overview of all current users for the admin

### /users/:id

- [x] `GET` An overview of a user and his past predictions and scores

&nbsp;

# Teams

### /teams

- [x] `GET` An overview of teams for the the select box, so a user can pick her/his favorite team.

### ~~/teams/:id~~

~~`GET` One team~~

&nbsp;

# Fixtures

### /fixtures/

- [ ] `GET` Get all fictures including the predictions and scores of the logged in user

### /fixtures/round/:id

- [ ] `GET` Get the fictures including the predictions and scores of the logged in user for a particular round

&nbsp;

# Scores

### /scores/games/:id

- [ ] `GET` An overview of the score per game for all users

### /scores/matches/:id

- [ ] `GET` An overview of the score per match for all users

### /scores/toto

- [ ] `GET` An overview of total score of all games for all users
