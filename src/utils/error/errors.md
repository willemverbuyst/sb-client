## USER

### UPDATE USER PROFILE

200 - Your profile hase been udpated.

~~404 - Team with this id not found!~~

~~422 - Details are missing, try again!~~

~~422 - This is not a valid email address!~~
<br><br>

## TEAM

### GET ALL TEAMS

200 - OK

~~500 - No teams found, please try again later.~~
<br><br>

## SCORE

### GET SCORES PLAYER

200 - OK

~~404 - No player found with this id!~~

~~422 - This is not a valid player id!~~
<br><br>

### GET SCORES ROUND

200 - OK

~~422 - This is not a valid round number!~~
<br><br>

### GET SCORES TOTAL TOTO

200 - OK
<br><br>

### GET SCORES TOTO ROUND

200 - OK

~~422 - This is not a valid totoround number!~~
<br><br>

## PREDICTIONS

### GET ALL PREDICTIONS

200 - OK

~~404 - No player found with this id!~~

~~422 - This is not a valid player id!'~~
<br><br>

### POST A PREDICTION

201 - Your prediction has been posted.

~~403 - This fixture is closed for betting!~~

~~404 - No fixture found with this id!~~

~~422 - This is not a valid fixture id!~~

~~422 - Details are missing, try again!~~
<br><br>

### UPDATE A PREDICTION

200 - Your prediction has been updated.

~~403 - This fixture is closed for betting!~~

~~404 - No fixture found with this id!~~

~~422 - This is not a valid fixture id!~~

~~422 - Details are missing, try again!~~
<br><br>

## PLAYER

### DELETE A PLAYER

200 - Player has been removed.

~~422 - This is not a valid player id!'~~

~~404 - No player found with this id!~~
<br><br>

### GET ALL PLAYERS

200 - OK

~~500 - No players found!~~
<br><br>

### SIGNUP PLAYER

201 - OK

~~404 - Team with this id not found!~~

~~422 - Details are missing, try again!~~

~~422 - This is not a valid email address!~~

400 - A user with that username alreay exists, username should be unique!
<br><br>

## FIXTURE

### GET FIXTURE WITH SCORES

200 - OK

~~404 - No fixture found with this id!~~

~~422 - This is not a valid fixture id!~~
<br><br>

## AUTH

### CHANGE PASSWORD

200 - OK

~~422 - Details are missing, try again!~~

422 - The current password is wrong!

422 - Your old and new password cannot be the same!

~~422 - Your new password and confirm password are not the same!~~
<br><br>

### FORGOT PASSWORD

200 - Token sent to email.

~~404 - User with this email address not found!~~

~~500 - There was an error sending the email. Try again later.~~
<br><br>

### LOGIN

200 - Welcome back.

~~401 - No user found with that email address and password!~~

~~422 - Details are missing, try again!~~

~~422 - This is not a valid email address!~~
<br><br>

### PROTECT

401 - You are not logged in!

401 - The user with this token does not exist anymore. Log in and try again!
<br><br>

### RESET PASSWORD

200 - Welcome back.

~~401 - Token is invalid or has expired!~~

~~422 - Your new password and confirm password are not the same!~~
<br><br>

### RESTRICT TO

~~403 - You need to be an administrator for this request!~~
<br><br>

### VALID TOKEN

200 - Welcome back
<br><br>

## ERROR

### JWT ERROR

~~401 - Invalid token, please log in again!~~
<br><br>

### JWT EXPIRED

~~401 - Your token has expired, please log in again!~~
<br><br>
