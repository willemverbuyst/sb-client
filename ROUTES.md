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

### /scores/fixtures/:id

- [x] `GET` An overview of the scores for a specific match for all users

### /scores/games/:id

- [x] `GET` An overview of the score per game for all users

### /scores/all

- [x] `GET` An overview of total scores for all users

&nbsp;

# Prediction

### /predictions/:id

- [x] `POST` Post a prediction for a fixture
