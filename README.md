## What is this?

This is a refactor/extension of/on a project started/created by fellow student [Michelle Pesch](https://github.com/mipes4/sportsbetting_fe) at Codaisseur.

---

## Setup

```mermaid
flowchart LR
  A[seed]
  B[(postgres database)]
  C[nodejs-server]
  D(((react-client)))
  E[puppeteer e2e]
  F[api with python]
  G[postman tests]
  H[micro-service with go]
  I[(mongo database)]
  J[seed with docker]
  subgraph docker
  B
  F
  J
  I
  J-->I
  I<-->H
  end
  B<-->C
  F<-->C
  A-->C
  D<-->C
  E-->D
  H-->D
  G-->C
```

---

## Quick start

Start database and mock soccer api

> docker-compose up --build

Seed database

> cd server && bash set-up-dev-db.sh

Run server

> cd server && npm run dev

Run client

> cd client && npm start

Run go-sevice for rules

> cd go-service && go run main.go

Todo: implement mongodb
