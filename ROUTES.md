# Auth

### /login

- [x] `POST` Log in with email and password

### /me

- [x] `GET` If there is a valid token, return user info

### /me/password

- [x] `PATCH` User can change password

### /me/profile

- [x] `PATCH` User can change the details of her/his profile

### /signup

- [x] `POST` Only the admin can sign up a new member

&nbsp;

# Users

### /users

- [x] `GET` An overview of all current users for the admin

### /users/:id

- [x] `GET` An overview of a user (public profile) and her/his past predictions and scores

&nbsp;

# Teams

### /teams

- [x] `GET` An overview of the teams for the the select box (ui), so a user can pick her/his favorite team.

### ~~/teams/:id~~

~~`GET` One team~~

&nbsp;

# Rounds

### /rounds/current

- [x] `GET` Get the fictures of the current round including the predictions and scores of the logged-in user

### /rounds/all

- [x] `GET` Get all the fictures (past, current, future) including the predictions and scores of the logged-in user

&nbsp;

# Scores

### /scores/games/:id

- [ ] `GET` An overview of the score per game for all users

### /scores/matches/:id

- [ ] `GET` An overview of the score per match for all users

### /scores/toto

- [ ] `GET` An overview of total score of all games for all users
