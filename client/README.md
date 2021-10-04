                        Make a Heroku Account

# Sign up [https://www.heroku.com/]

# Install Heroku cli [https://devcenter.heroku.com/articles/heroku-cli]

                        Create the Express App

$ mkdir _your-project-name_
$ cd project-name
$ npm init -y

# Create a file (index.js)

# Open _package.json_ and add a scripts

                        Set Up Heroku

$ git init
$ echo node_modules > .gitignore
$ git add .
$ git commit -m "Initial commit"
$ heroku create [app-name]
$ git push heroku master

                        Create the React App

$ npm i -g create-react-app
$ create-react-app client

# Add in _client/package.json_ ("proxy": "http://localhost:5000")

                        Deploying to Heroku

# "scripts": {"heroku-postbuild": "cd client && npm install && npm run build"}

$ git add .
$ git commit -m "Ready for awesome"
$ git push heroku master

                        ******************

# source [https://daveceddia.com/deploy-react-express-app-heroku/]
