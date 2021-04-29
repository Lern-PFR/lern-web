# Tells to make these commands do not need any file
.PHONY: help init build start start-verbose test clean destroy stop restart logs ps run lint

# Add support for make targets arguments
SUPPORTED_COMMANDS := run logs
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
  COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  COMMAND_ARGS := $(subst :,\:,$(COMMAND_ARGS))
  $(eval $(COMMAND_ARGS):;@:)
endif

help: ## Display this message
	@echo "Usage: make <target>"
	@egrep '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

init: ## Initialize configuration and build the project
	# Destroy existing services
	@docker-compose down -v
	# Build docker images
	@docker-compose build
	# Install dependencies outside of Docker, for linting purposes
	@yarn install
	@echo
	@echo You\'re good to go! You can start the project with \`make start\`

build: ## Build docker images
	@docker-compose build

start: ## Run the project with hot reloading
	@docker-compose up -d

start-verbose:
	@docker-compose up

test: ## Run the tests
	@docker-compose run --rm app yarn test -u

clean: ## Remove docker containers
	@docker-compose down --remove-orphans

destroy: ## Remove docker containers, volumes AND images
	@docker-compose down --remove-orphans -v --rmi local

stop: ## Stop docker containers
	@docker-compose stop

restart: stop start ## Restart docker containers

logs: ## Display the last 100 lines from given service output and attach to its output
	@if [ "$(COMMAND_ARGS)" = "" ]; then\
		echo "Usage: make $@ <service_name>";\
	else\
		docker-compose logs --tail=100 -f $(COMMAND_ARGS);\
	fi

ps: ## Show services state
	@docker-compose ps

run: ## Run a command inside project container
	@docker-compose run --rm app $(COMMAND_ARGS)

lint: ## Run eslint inside project container
	@docker-compose run --rm app yarn run eslint
