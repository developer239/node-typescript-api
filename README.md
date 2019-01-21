[![CircleCI](https://circleci.com/gh/developer239/node-typescript-api.svg?style=svg)](https://circleci.com/gh/developer239/node-typescript-api)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5ec1c93577d041551baf/test_coverage)](https://codeclimate.com/github/developer239/node-typescript-api/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/5ec1c93577d041551baf/maintainability)](https://codeclimate.com/github/developer239/node-typescript-api/maintainability) [![Greenkeeper badge](https://badges.greenkeeper.io/developer239/node-typescript-api.svg)](https://greenkeeper.io/)

# Node Typescript API

Example backend API.

Demo application [is running here](https://node-typescript-api.herokuapp.com/) (it might take a while before the free server wakes up)

## Development

System Dependencies:

1. `brew install node`
2. `brew install yarn`
3. `brew install docker`
4. `brew install docker-compose`

Run docker database:

1. `docker-compose up`
2. `make db-migrate`
3. `make db-seed`

Run node server:

1. `make node_modules`
2. `make dev`


Now you can open [http://localhost:8080](http://localhost:8080) in your browser.

### Helpful Commands

- `make db-migrate`     apply database migration
- `make db-rollback`    rollback database migration
- `make db-reset`       rollback and migrate
- `make db-seed`        seed database
- `make test`           run tests
- `make test-coverage`  run tests and report coverage
