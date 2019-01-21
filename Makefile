# Change this so that it matches your container name / id
CONTAINER_NAME ?= reality_backend

log = @echo "[make] $(1)"

exec = docker exec -it $(CONTAINER_NAME) sh -c $(1)

infra:
	$(call log, "Starting docker containers")
	docker-compose up -d

node_modules:
	$(call log, "Installing dependencies")
	rm -rf node_modules
	yarn cache clean --force
	yarn install

build:
	$(call log, "Building")
	yarn build

watch:
	$(call log, "Starting dev server")
	yarn dev

db-migrate:
	$(call log, "Database migration")
	yarn db:migrate

db-rollback:
	$(call log, "Database rollback")
	yarn db:rollback

db-reset: db-rollback db-migrate

db-seed:
	$(call log, "Database seed")
	yarn db:seed

test:
	$(call log, "Running tests")
	NODE_ENV=test yarn db:rollback
	NODE_ENV=test yarn db:migrate
	NODE_ENV=test yarn test

test-coverage:
	$(call log, "Running tests")
	NODE_ENV=test yarn db:rollback
	NODE_ENV=test yarn db:migrate
	NODE_ENV=test yarn test:coverage

rules := \
	node_modules \
	build \
	dev \
	db-migrate \
	db-rollback \
	db-reset \
	db-seed \
	test \
	node_modules \
	test-coverage \

.PHONY: $(rules)
