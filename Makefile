ORG = webapp
NAME = webapp
SHA1 = $(shell git log -1 --pretty=oneline | cut -c-10)
BRANCH = $(shell git branch -a --contains $(SHA1) | egrep '(remotes/|\*)' | egrep -v "(HEAD|detached)" | head -1 | sed -e "s/\* //" -e "s/.*\///")
VERSION = $(BRANCH)-$(SHA1)

all: clean install

install:
	cd api; yarn install; cd ../webapp; yarn install;

clean:
	cd api; rm -rf node_modules; cd ../webapp; rm -rf node_modules;

run-api:
	cd api; yarn start;

run-app:
	cd webapp; yarn start;
