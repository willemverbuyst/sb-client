import json


def get_fixtures_from_json():
    with open('data/fixtures.json') as json_file:
        fixtures = json.load(json_file)
        return fixtures
