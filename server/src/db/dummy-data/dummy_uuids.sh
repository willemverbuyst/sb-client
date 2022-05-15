#!/bin/bash

# Author: Willem Verbuyst
# Date Created: 2022-01-17
# Date Modified: 2022-01-17

# Description
# Generates a csv file with uuids

# Usage
# bash dummy_uuids.sh


NEW_FILE="./dummy_uuids.csv"
touch $NEW_FILE

echo "UUID" > $NEW_FILE

# Create list with uuids
for i in {1..20}
do
  LIST_WITH_IDS[i]=$(cat /proc/sys/kernel/random/uuid)
done

for uuid in "${LIST_WITH_IDS[@]}"
do
  echo "$uuid" >> $NEW_FILE
done

exit 0