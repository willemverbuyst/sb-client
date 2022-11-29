echo "Welcome to the toto game"

read -p "Do you want to see the demo [y/n]? " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 0
fi

echo "We will create an account for you so you can log in"

read -p "Enter a username: " USERNAME
read -p "Enter a first name: " FIRSTNAME
read -p "Enter a last name: " LASTNAME
read -p "Enter an email address: " EMAIL 
read -p "Enter a password: " PASSWORD 


echo "Update file with demo user"
NEW_FILE="./server/src/db/dummy-data/demoUser.json"
touch $NEW_FILE

echo "{
  \"userName\": \"$USERNAME\",
  \"firstName\": \"$FIRSTNAME\",
  \"lastName\": \"$LASTNAME\",
  \"email\": \"$EMAIL\",
  \"password\": \"$PASSWORD\"
}" > $NEW_FILE

echo "Seeds for database are ready" 


# exit 0