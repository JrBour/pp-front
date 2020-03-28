start:
	@docker-compose up

stop:
	@docker-compose down

build:
	@yarn build

install:
	@yarn install --non-interactive