[![CircleCI](https://circleci.com/gh/developer239/node-typescript-api.svg?style=svg)](https://circleci.com/gh/developer239/node-typescript-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/5ec1c93577d041551baf/maintainability)](https://codeclimate.com/github/developer239/node-typescript-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5ec1c93577d041551baf/test_coverage)](https://codeclimate.com/github/developer239/node-typescript-api/test_coverage)
[![Greenkeeper badge](https://badges.greenkeeper.io/developer239/node-typescript-api.svg?token=76d75cc9efd4f1141c5df424f2a8d016654313d2766e2704b0985a28a794002b&ts=1548104970009)](https://greenkeeper.io/)

# Node Typescript API

Demo application [is running here](https://node-typescript-api.herokuapp.com/) (it might take a while before the free server wakes up)

📘 API is documented [here](https://node-typescript-api.herokuapp.com/docs).

## Development

System Dependencies:

1. `brew install node`
2. `brew install yarn`
3. `brew install make`
3. `brew install docker`
4. `brew install docker-compose`

Run docker database:

1. `make infra`
2. `make db-migrate`
3. `make db-seed`

Run node server:

1. `make node_modules`
2. `make watch`

Define `env` variables:

1. `cp .env.development.template .env.development`
2. If you want to have password reset working then you must set `EMAIL_TOKEN` variable. You can find more information on [sendgrid.com](https://sendgrid.com/)

Now you can open [http://localhost:8080](http://localhost:8080) in your browser.

### Helpful Commands

- `make db-migrate`     apply database migration
- `make db-rollback`    rollback database migration
- `make db-reset`       rollback and migrate
- `make db-seed`        seed database
- `make test`           run tests
- `make test-coverage`  run tests and report coverage
