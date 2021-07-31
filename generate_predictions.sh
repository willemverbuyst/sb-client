#!/bin/bash

# Create a file
touch dummy_predictions.js

# Delete previous data
> dummy_predictions.js

# Loop over fixtures (306)
# Loop over players (4)
# Generate random scores between 0 and 5
# Write to text-file

echo "const predictions = [" >> dummy_predictions.js

for i in {573164..573469}
do
  for u in {1..31}
  do
    echo "{
  pGoalsHomeTeam: $(( ( RANDOM % 5 )  + 0 )),
  pGoalsAwayTeam: $(( ( RANDOM % 5 )  + 0 )),
  userId: $u,
  fixtureId: $i,
  createdAt: new Date(),
  updatedAt: new Date(),
}," >> dummy_predictions.js
  done
done

echo "]" >> dummy_predictions.js
echo "module.exports = predictions;" >> dummy_predictions.js