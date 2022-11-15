#!/bin/bash

# Author: Willem Verbuyst
# Date Created: 2022-01-16
# Date Modified: 2022-05-27

# Description
# Generates a json file with dummy predictions
# uuid for user from csv
# predictions for fixtures 707179 to 707484

# Usage
# bash dummy_predictions.sh

CSV_WITH_UUIDS="./dummy_uuids.csv"
NEW_FILE="./dummy_predictions.json"
touch $NEW_FILE

# readarray -t ARRAY_WITH_UUIDS < $CSV_WITH_UUIDS
IFS=$'\n' read -d '' -r -a ARRAY_WITH_UUIDS < $CSV_WITH_UUIDS

TIMESTAMP=$(date +"%Y-%m-%dT%H:%M:%SZ")

echo "[" > $NEW_FILE

for i in {707179..707484}
do
  for userId in "${ARRAY_WITH_UUIDS[@]:1}"
  do
    echo "{
  \"pGoalsHomeTeam\": $(( ( RANDOM % 5 )  + 0 )),
  \"pGoalsAwayTeam\": $(( ( RANDOM % 5 )  + 0 )),
  \"userId\": \"$userId\",
  \"fixtureId\": $i,
  \"createdAt\": \"$TIMESTAMP\",
  \"updatedAt\": \"$TIMESTAMP\"
}," >> $NEW_FILE
  done
done

# Remove last comma
# truncate -s-2 $NEW_FILE
sed -i '' '$s/,$//' $NEW_FILE

echo "]" >> $NEW_FILE


exit 0