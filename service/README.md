## What is this?

An api that mocks the response you would get from the soccer api. If returns fixtures as if you are just past midst season. This is for development purposes only. _Based on season 2021-2022_

## Teams

Return teams with name and logo

## Fixtures

The timestamps are generated dynamically. The starting point is next Friday.

Fixture 707350 is your first upcoming game. 9 games per weekend, 3 per day.

Returns all 304 fixtures.

## Weekend

| day      | f1    | f2    | f3    |
| -------- | ----- | ----- | ----- |
| Friday   | 16:30 | 20:00 | 21:00 |
| Saturday | 14:30 | 16:00 | 19:00 |
| Sunday   | 10:00 | 13:30 | 16:00 |

http://localhost:8000/docs

## How to use?

> docker-compose up service

[Call endpoints](./service.http):

> /teams

> /fixtures

## Environment

Add a **.env** file at the service level of the project

LEAGUE_ID=id used as param in url to get the fixtures

API_KEY=create a fake api key
