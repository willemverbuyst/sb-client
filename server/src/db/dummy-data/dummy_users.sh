#!/bin/bash

# Author: Willem Verbuyst
# Date Created: 2022-01-17
# Date Modified: 2022-01-17

# Description
# Generates a JavaScript file with a dummy admin from csv
# Generates a JavaScript file with dummy users from csv

# Usage
# bash dummy_users.sh


CSV_WITH_USERS="./dummy_users.csv"
CSV_WITH_UUIDS="./dummy_uuids.csv"
NEW_FILE_ADMIN="./dummy_admin.js"
NEW_FILE_USERS="./dummy_users.js"
ARRAY_WITH_USERS=() 

touch $NEW_FILE_ADMIN
touch $NEW_FILE_USERS

readarray -t ARRAY_WITH_UUIDS < $CSV_WITH_UUIDS

INDEX=1
while IFS="|" read -r COLUMN_1 COLUMN_2 COLUMN_3 COLUMN_4
do  
  ARRAY_WITH_USERS+=("{
  id: '${ARRAY_WITH_UUIDS[INDEX]}',
  userName: '$COLUMN_1', 
  firstName: '$COLUMN_2',
  lastName: '$COLUMN_3',
  email: '${COLUMN_2,,}@${COLUMN_3,,}.com',
  password: bcrypt.hashSync('${COLUMN_2,,}123', SALT_ROUNDS),
  phoneNumber: '0612345678',
  admin: $COLUMN_4,
  totaalToto: true,
  teamId: 1118,
  createdAt: new Date(),
  updatedAt: new Date(),
  }")
  let INDEX++
done < <(tail -n +2 $CSV_WITH_USERS)

# Admin
echo "const bcrypt = require('bcrypt');" > $NEW_FILE_ADMIN
echo "const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);" >> $NEW_FILE_ADMIN
echo "const admin = [" >> $NEW_FILE_ADMIN
echo ${ARRAY_WITH_USERS[0]} >> $NEW_FILE_ADMIN
echo "];" >> $NEW_FILE_ADMIN
echo "module.exports = admin;" >> $NEW_FILE_ADMIN

# users
echo "const bcrypt = require('bcrypt');" > $NEW_FILE_USERS
echo "const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);" >> $NEW_FILE_USERS
echo "const users = [" >> $NEW_FILE_USERS
for record in "${ARRAY_WITH_USERS[@]:1}"
do
    echo "$record", >> $NEW_FILE_USERS
done
echo "];" >> $NEW_FILE_USERS
echo "module.exports = users;" >> $NEW_FILE_USERS

exit 0