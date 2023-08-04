# Building a CLI Project

## Introduction
You will put everything you learned together and build a command line application that utilizes different NPM packages. These could be packages that were used this past week or ones that you researched and found on your own.

## Ideas
Here are some ideas to get you thinking of what to implement:
- Math based game - guess a random number
- Tic Tac Toe
- Tip Calculator
- ReadMe.Md Generator
- Day Scheduler
- To-Do Tracker

## As a developer I want to. . .
- The application to run in the command line
- Utilize different NPM packages
- Create and utilize functions
- Implement JavaScript data structures (arrays, objects)
- Implement at least one loop (`for`, `while`, etc.)
- The application to start when a function is invoked
- Display the output to the user

## Getting Started
You will want to create your project's `package.json` to install new packages and run your code.

Make sure you are in the `/project` directory and in your terminal, write the following:
```bash
npm init
```
This will ask you to fill out a series of fields. For most of the prompts, you can just hit `enter` and skip through it. I would encourage for this project to fill out `package name`, `description`, and `author`. Everything should eventually look like the following.

```bash
package name: (project) your-project-name
version: (1.0.0) 
description: Description of your project.
entry point: (app.js) 
test command: 
git repository: 
keywords: 
author: Your Name
license: (ISC)
```

This will generate a `package.json` file that will look similar to this:
```bash
{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "Description of your project.",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Your Name",
  "license": "ISC"
}
```
There are a couple of "nice to have" we can add here.

To `scripts`, we can add a `start` script that will run our `app.js` as such:
```bash
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  }
```
This allows us now to simply run `npm start` and our application will run. We could also run `node app.js` to run the app. It is recommended to use `npm start` because its a way of standardizing the way one runs their project.

Another nice to have, we can add the `dependencies` property to our `package.json` as such:

```bash
"dependencies": {}
```

In here, we can add any packages we want to install as we did in the `project-code-along`. Whenever we add any packages to `dependencies`, remember to run the following to have everything installed:

```bash
npm install
```

Whenever we run `npm install`, it will look at the `package.json` and install any of the packages stated in `dependencies`. This will generate a `/node_modules` folder. This is where all the packages installed live. It will also generate a `package-lock.json`. This is where node records the exact versions of the packages that were installed.

By default, the project will be treated as CommonJS, meaning we would need to import in this manner:

```js
const chalk = require('chalk')
```

CommonJS is older and some newer packages (like `chalk`) are not supported by it. So I do recommend using `ES Module` to import your packages as we did in `project-code-along`. To allow this, add the following to `package.json`:

```bash
"type": "module"
```

This will allow you to now import in such manner:

```js
import chalk from 'chalk';
```


The final `package.json` should look like:

```bash
{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "Description of your project.",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
  "author": "Your name",
  "license": "ISC",
  "type": "module",
  "dependencies": {}
}
```

You can write all your code in `app.js` and check your code by running:

```bash
npm start
```

## Links
- [NPM](https://www.npmjs.com/)