## What is this?

This is a refactor/extension of/on a project started/created by fellow student [Michelle Pesch](https://github.com/mipes4/sportsbetting_fe) at Codaisseur.

---

## Setup

```mermaid
flowchart LR
  A[seed]
  B[(data)]
  C[server]
  D(((client)))
  E[e2e]
  F[service]
  G[Postman]
  A-->B
  C<-->B
  D<-->C
  E-->D
  F-->B
  G-->C
```

---

## Quick start

Start database and service

> docker-compose up --build

Seed database

> cd server && bash set-up-dev-db.sh

Run server

> cd server && npm run dev

Run client

> cd client && npm start
