#!/bin/bash

# File

dummy_data="dummy_predictions_20.js"
number_of_users=21

# Create a file
touch $dummy_data

# Delete previous data
> $dummy_data

# Loop over fixtures (306)
# Loop over players (4)
# Generate random scores between 0 and 5
# Write to text-file

echo "const predictions = [" >> $dummy_data

for i in {707179..707484}
do
  for ((u=1; u <= $number_of_users; u++))
  do
    echo "{
  pGoalsHomeTeam: $(( ( RANDOM % 5 )  + 0 )),
  pGoalsAwayTeam: $(( ( RANDOM % 5 )  + 0 )),
  userId: $u,
  fixtureId: $i,
  createdAt: new Date(),
  updatedAt: new Date(),
}," >> $dummy_data
  done
done

echo "]" >> $dummy_data
echo "module.exports = predictions;" >> $dummy_data