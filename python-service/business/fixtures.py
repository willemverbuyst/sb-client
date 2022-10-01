import json

from business.time_functions import create_timestamps


def get_fixtures_from_json():
    with open('data/fixtures.json') as json_file:
        fixtures = json.load(json_file)
        updated_fixtures = create_timestamps(fixtures)
        return updated_fixtures
