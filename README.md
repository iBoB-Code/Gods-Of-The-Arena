# Gods Of The Arena

The project is divided in 2 different parts : the API and the webapp.
---------------
- First, install all the dependencies by running a simple `make` (it will also trigger the postinstall build for the webapp)
- Then `make run-api` in a tab to launch the API (needs internet because the DB is a distant MongoLab) - http://localhost:3000
- Finally `make run-app` in a new tab to launch the production version of the webapp - http://localhost:8080

Description
---------------
This is a simple demo web app exploring different aspects of a react-redux-node-mongoose stack with real-time data management throught socket.io.
