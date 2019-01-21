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

Now you can open [http://localhost:8080](http://localhost:8080) in your browser.

### Helpful Commands

- `make db-migrate`     apply database migration
- `make db-rollback`    rollback database migration
- `make db-reset`       rollback and migrate
- `make db-seed`        seed database
- `make test`           run tests
- `make test-coverage`  run tests and report coverage
