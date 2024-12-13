IMAGE_NAME=uniqued
PORT=80

help: ## show help message
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\033[36m\033[0m\n"} /^[$$()% 0-9a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: build
build:	## build docker image
	docker build -t ${IMAGE_NAME} .

.PHONY: start
start:	## start docker containers
	docker run -p ${PORT}:80 -d ${IMAGE_NAME}

.PHONY: watch
watch: ## find docker container with name 'uniqued' and show trailing logs
	@docker logs -f $(shell docker ps -qf publish=${PORT})