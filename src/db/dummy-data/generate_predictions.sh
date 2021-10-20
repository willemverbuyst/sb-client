#!/bin/bash

# File

dummy_data="dummy_predictions_20.js"
number_of_users=21

# Create a file
touch $dummy_data

# Delete previous data
> $dummy_data

listWithIds=("186f9050-48b9-40c5-a31c-7b988095cce8" "eb156e2e-67e1-47a8-8db9-a2a666b911d1" "3da22538-c0a6-4ba0-b184-c2f0921087f6" "bd70f421-f712-47ef-93e1-186466e8c299" "ff77ba4c-6bac-4497-8484-bf69ec48f6c8" "f23ad6bf-814a-47b0-9bae-d9fd02552b6c" "0905b753-419f-40bf-adb9-4700f9ed1d8e" "b6be1a58-b6d1-4f0e-97c1-ab125e4d1e0a" "33f7967d-779f-4117-a0f0-783b48ef6005" "fbfb6a7d-3646-4449-894b-372cb4b0f7d1" "64773e49-7d00-404a-9ec7-776ced2e02ed" "57c4f51e-f1de-421b-8679-e9f69e2b1695" "7ecc30f0-7a75-4f80-8a38-0a061c65bff7" "b8d42f8a-1dd5-4bc5-9789-4cde0a8f7ad7" "3477316f-48ec-4aa6-a68f-df023623fa72" "df330c54-e81f-4681-a461-b7bc6343b224" "1d94a03d-dea3-4556-9fc3-ec7a8cc0bf5e" "d990db07-8d68-42c1-a3fd-cfd81f547498" "a8248453-a04c-418f-ba9e-11220f2ac223" "072ce297-a628-497f-ad68-766aaaeb9558" "819c538b-0ed1-41db-8425-79c5659633ff")

# Loop over fixtures (306)
# Loop over players (4)
# Generate random scores between 0 and 5
# Write to text-file

echo "const predictions = [" >> $dummy_data

for i in {707179..707484}
do
  for userId in "${listWithIds[@]}"
  do
    echo "{
  pGoalsHomeTeam: $(( ( RANDOM % 5 )  + 0 )),
  pGoalsAwayTeam: $(( ( RANDOM % 5 )  + 0 )),
  userId: '$userId',
  fixtureId: $i,
  createdAt: new Date(),
  updatedAt: new Date(),
}," >> $dummy_data
  done
done

echo "]" >> $dummy_data
echo "module.exports = predictions;" >> $dummy_data