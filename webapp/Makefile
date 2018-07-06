ORG = webapp
NAME = webapp
SHA1 = $(shell git log -1 --pretty=oneline | cut -c-10)
BRANCH = $(shell git branch -a --contains $(SHA1) | egrep '(remotes/|\*)' | egrep -v "(HEAD|detached)" | head -1 | sed -e "s/\* //" -e "s/.*\///")
VERSION = $(BRANCH)-$(SHA1)

all: install prod

install:
	yarn

dev:
	yarn dev

prod:
	yarn start

build:
	yarn build

d-build: build
	docker build --rm -t $(ORG)/$(NAME):${VERSION} .

d-build-push: d-build
	docker tag  $(ORG)/$(NAME):${VERSION} $(ORG)/$(NAME):latest
	docker push $(ORG)/$(NAME)

d-start:
	docker run $(ORG)/$(NAME):${VERSION}
