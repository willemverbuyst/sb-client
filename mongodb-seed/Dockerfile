FROM mongo

COPY rules.json /rules.json
CMD mongoimport --uri mongodb://myusername:mypassword@mongodb:27017/?authSource=admin --collection stages --drop --file /rules.json --jsonArray