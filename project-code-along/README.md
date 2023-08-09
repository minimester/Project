# CLI and Node - We Do
We will be creating a text-based "choose your own adventure" game that runs entirely in the terminal using JavaScript and different NPM packages. 

## Let's get started
Luckily, all of the modules are listed as dependencies in our `package.json` file. There is also some starter code in our `game.js` file.  
To begin building our game, let's change directory into our `project-code-along` directory.  

```bash
cd project-code-along
```

From here we can install all the modules that are declared in our `package.json` file.  
To begin installation, run the following command:

```bash
npm install
```

> We could also run the `npm i` shorthand command.  

Once all the modules have been installed, we can begin building our game!  

## Our Application Basics:
Along with some of the other files, our `game.js` file will handle all our application code, and where we will spend a majority of the time.  

### Using Packages
We want to leverage the different packages we have installed to give our game a little more ***personality***.  
To do so, we will need to make sure they are called within our file.  
There are two ways to utilize packages:
```js
//ES Modules
import example from 'example-package';
//CommonJS
const example = require('example-package');
```
For the scope of this application, we will utilize ES module syntax because some of the packages are bundled as ES modules and require so according to their documentation. 

> It's always important to read the documentation regarding the packages you are using. It shows you how to utilize the package accordingly.

<details>
<summary>More Info on ES Modules</summary>

[ES Modules](https://www.freecodecamp.org/news/javascript-es-modules-and-module-bundlers/)

</details>  

It's important that our packages are called first and declared at the top of our file. We are using several and you can see which one's you are using in our `package.json` file. Let's go ahead and call the `chalk` package.
```js
import chalk from 'chalk';
```
We can name the import anything you would like, but for readability, we will name it after the package we are using. Let's go ahead and import the rest.

<details>
<summary>Import Snippet</summary>

```js
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from 'gradient-string'
import { createSpinner } from "nanospinner";
```

</details>

Awesome! For example when we want to use the `inquirer` package we can just call our named import of `inquirer` and just like that, we have access to that package's functionality. 

### Building Our Start Game Function 
In our `startGame` function, we will call more of the packages we imported at the top of the to give our adventure game more life. Let's create a new variable that will be our welcome message when the game is run and call the `chalkAnimation` package.

```js
async function startGame() {
    //welcome message utilizing the chalk animation package
    const welcomeMsg = chalkAnimation.rainbow(`welcome to the choose your adventure game \n`);
};
```
Let's break down what we just wrote.  
- `chalkAnimation` refers to the variable we named and calls the package and all its methods
- `.rainbow()` is a method or function in the `chalkAnimation` package that gives our text a rainbow animation. Within the () we pass in a string and that will be animated!

> Note: When you call the chalkAnimation package and add the . notation, you can select other methods that are different colors etc.

Let's go ahead and finish the rest of this function and use a few more packages.  

> Note: we call our helper function `resolveAnimations` to run the animation after two seconds, then we call our `welcomeMsg` variable with the `.stop()`. Otherwise it will animate the `welcomeMsg` indefinitely.

After we stop the rainbow animation, we use a `console.log()` with `` ` `` backticks so we can use a template literal and use `JavaScript` variables in the `console.log()`. 

```js
console.log(chalk.bgGreenBright('text'));
```  
Very similar to the `chalkAnimation`, we will use our `chalk` variable so we can have access to its methods. That's it! Now our text will have a background of which respected method we call. In the snippet, we enter new lines so it will print on multi-line.

```js
 console.log(`
    ${chalk.bgGreenBright('text')}
    text text . . . 
    ${chalk.bgRed('text')}
    text . ..
    `);
```

`startGame` function finished:

```js
async function startGame() {
    //welcome message utilizing the chalk animation package
    const welcomeMsg = chalkAnimation.rainbow(`welcome to the choose your adventure game \n`);
     //call helper
    await resolveAnimations();
    //stop the animation
    welcomeMsg.stop();
    //prompt for the game
    console.log(`
    ${chalk.bgGreenBright('we shall begin')}
    this adventure lives in your terminal
    if you choose any of the wrong choices, I will ${chalk.bgRed('terminate')}
    if you make it to the end, you will be rewarded
    `);
};
```

Now to use this function. At the bottom of our file, we will invoke this function. Since we made this function `async` we will need to use the `await` keyword before its invocation.

```js
async function main() {
    //invoke our game functions here
    await startGame();
}

main()
```

Let's run it and test it! In our `package.json`, there is a `start` script with `node game.js`. When we call `npm run start` it will run our game. It's the equivalent of running `node game.js`.

## Building the playerInfo Function
Let's get the player info. We will use another package this time that allows us to store a user input. This time we will use the `inquirer` package.

For now, let's store the answers in a variable and await the result of the `inquirer.prompt` method.

```js
async function playerInfo() {
    const answers = await inquirer.prompt()
};
```
The `inquirer.prompt` method returns a promise, hence why we need the `async/await` syntax. It takes in an object with different key value pairs. Let's take a look at the snippet below.

> Why the async prompt? Yesterday, we used `prompt-sync` which could only run synchronously. This library runs asynchronously which and returns to us a promise. In JavaScript, we handle that using `async/await` syntax.

```js
const answers = await inquirer.prompt({
        name: //name used to store the answers to,
        type: //type of questions ex: input, list, etc.,
        message: //the question that the prompt will ask
    });
``` 

Given, that snippet above, we can utilize the `name` key to store the result of what the user inputs.  
The `type` will refer to the question type. In this instance we are asking for the user to enter their name. We will set it with a value of `input`.  
Lastly, the `message` is the question or messge we will ask.  
Our snippet should look like this:

```js
const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'Hello, please enter your name.'
    });
```
Now when our `playerInfo` function is run, it will allow for the user to enter something and we can store the user input's variable.  
One last thing we need to create a global variable for our variable name, since we want to use the player info in other functions, and right now it's scoped to the `playerInfo` function.  

Above the `startGame` function and below the `imports`, we will make our player variable.
```js
let playerName;
```

Now in our `playerInfo` function, we need to update the global `playerName` variable with the result of the prompt.

```js
async function playerInfo() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'Hello, please enter your name.'
    });
    playerName = answers.player_name;
};
```
Call `playerName` outside the prompt, and we will set it equal to the `answers` variable `.` the value of the `player_name`.  
Finally, let's add a function invocation to a function we are going to build in the next section. Add this underneath the `playerName`.
```js
playerName = answers.player_name;
    await pathQuestion()
```

> It's important to note we use the value of the name property as this is how the result is stored from the `inquirer` package.

Finally, let's invoke our `playerInfo` function at the bottom. Since it's `async`, we need to invoke just like the `startGame` function with the `await` keyword. Let's invoke it underneath the `startGame()` function. 
```js
async function main() {
  await startGame();
  await playerInfo();
}
```

## Building the first question function - pathQuestion
In this function we will follow very similar logic to the player info except we will change one of the key, value pairs to make it multiple choice. To do that, we will give it a `list` property, and a `choices` property. 

```js
async function pathQuestion() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: `Welcome ${playerName}, what path will you choose? \n`,
    choices: [
        { name:'left - you hear a breeze echoing down the tunnel', value: 'left' },
        { name: 'right - you hear rocks crumbling in the distance', value: 'right' },
        { name: 'straight - you hear an eerie silence', value: 'straight' }
    ],
    });
}
```
Now when the function is called invoked, we can see it prompt us to choose one of our choices we provided with the arrow keys.  
Let's invoke it at at the end of our `playerInfo()` function.
```js
async function playerInfo() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'Hello, please enter your name.'
    });
    playerName = answers.player_name;
    await pathQuestion()
};
```
Since there are three options, we want two of the choices to lead to other questions, and one to end the game. This will be handled in `pathChoice` function. As you noticed, we pass in the answer the user selects. We will also leverage one the packages we haven't used yet.

```js
async function pathQuestion() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: `Welcome ${playerName}, what path will you choose? \n`,
        choices: [
            { name: 'left - you hear a breeze echoing down the tunnel', value: 'left' },
            { name: 'right - you hear rocks crumbling in the distance', value: 'right' },
            { name: 'straight - you hear an eerie silence', value: 'straight' }
        ]
    });
    //execute the animation and prompt
    await pathChoice(answers.question_1);
};
```

## Building the pathChoice Function
The rest of the logic and implementation of the packages would be very similar to what we have already done. We will just use different operators to control the flow of logic to make it feel more like a game.  
We do need to implement and utilize the `spinner` package in a slightly different way. We will also use some of the different choices from the `inquirer` package Let's keep building!

Let's try and create a loading animation using our `nanospinner` package.  
As you noticed, the `import` for our `createSpinner` has curly brackets around it. This means we are imoprting a specific function named `createSpinnner` from the `nanoSpinner` package. In the documentation for packages, you can find out if there are specific functions you want to use instead of calling the whole package. Let's create it globally as we will call this variable in the other functions, that way the animation will run in between questions.

```js
const spinner = createSpinner('process loading. . .')
```
Here we name a variable called `spinner` and  let's set it equal to the `createSpinner` function. When we call the `spinner` variable, it will create a nice animation of a spinner with the text of `process loading. . .`
We will call the `spinner` variable with a `start()`.
Let's call our `resolveAnimations()` to stop the animation after two seconds.
```js
async function pathChoice(choice) {
    spinner.start();
    await resolveAnimations();
}
```

Let's add some `choice` specific responses and animations to it. Let's use an `if/else` statement to control the logic of our game. We use the `if` checks to check if the answer equals one of the choices, then we call either the `leftQuestion` or `rightQuestion` functions. We haven't built those yet.

```js
async function pathChoice(choice) {
    spinner.start();
    await resolveAnimations();
    if (choice ==='left') {
        spinner.success({ text: `Interesting choice, ${playerName}, continue on`});
        await leftQuestion();
    } else if (choice ==='right') {
        spinner.warn({ text: `Interesting choice, ${playerName}, continue on`});
        await rightQuestion();
    } else {
        spinner.error({ text: chalk.bgRed(`FATAL - terminating process`)});
        process.exit(1)
    }
}
```
> Note: We don't need to invoke it the `pathChoice` function as it's called based on a certain choice.

## Left, Right, and Final Question and Answer logic.
We will implement the rest of the logic in a similar fashion and use the same packages.

### Left Question and Answer Functions

<details>
<summary>Left Question and Answer Snippets</summary>

```js
//left question logic
async function leftQuestion() {
    const answers = await inquirer.prompt({
        name: 'leftQuestion',
        type: 'list',
        message: `You have two choices: \n`,
        choices: [
            'Press the button',
            `Don't press the button`,
        ]
    });
    return handleLeftAnswer(answers.leftQuestion == 'Press the button');
}
//handle user choice
async function handleLeftAnswer(choice) {
    spinner.start();
    await resolveAnimations();
    if(choice) {
        spinner.success({ text: `a secret passage opens, ${playerName}, you made the right choice`});
        await finalQuestion()
    } else {
        spinner.warn({ text: `${playerName}, you should have pressed the button. ${chalk.bgRed(`FATAL - terminating process`)}`});
        process.exit(1)
    }
}
```

</details>

### Right Question and Answer Functions

<details>
<summary>Right Question and Answer Snippets</summary>

```js
async function rightQuestion() {
    const answers = await inquirer.prompt({
        name: 'rightQuestion',
        type: 'list',
        message: `Luckily you make it to the next stage. A screen appears with a question: What is JavaScript? \n`,
        choices: [
            `a good coffee brand`,
            `a programming language`,
            `it's Java but written in a script format`,
        ]
    });
    return handleRightQuestion(answers.rightQuestion == 'a programming language');
}

async function handleRightQuestion(choice) {
    spinner.start();
    await resolveAnimations();
    if (choice) {
        spinner.success({ text: `${playerName}, CORRECT! You have gained access to the final room`});
        await finalQuestion()
    } else {
        spinner.warn({ text: `${playerName} ${chalk.bgRed(`FATAL - INCORRECT CHOICE`)}`});
        process.exit(1)
    }
}
```

</details> 

### Final Question and Answer Functions

<details>
<summary>Final Question and Answer Snippets</summary>

```js
async function finalQuestion() {
    const answers = await inquirer.prompt({
        name: 'finalQuestion',
        type: 'list',
        message: `${chalk.bgGreen('You have made the correct decisions.')} One final question: "When did Node.js come out?"\n`,
        choices: [
            `2005`,
            `2009`,
            `1995`
        ]
    });
    return handleFinalAnswer(answers.finalQuestion == `2009`);
}

async function handleFinalAnswer(choice){
    spinner.start();
    await resolveAnimations();
    if(choice) {
        spinner.success({ text: `Congratulations`});
        winnerText()
    } else {
        spinner.warn({ text: `${chalk.bgRed(`FATAL - terminating process`)}`});
    }
}
```

</details> 

## Winner Text and Ending the Game
That was a lot! Give yourself a pat on the back, it's not easy building out the logic for a text based game.
Finally depending on the user choices for the left, right and final question functions, the user will arrive at the `winnerText()` function!  
We have a lot of stuff in the console, and we want to use `figlet`, the package from yesterday to display a big winning message. Let's clear the console.

```js
async function winnerText() {
    console.clear()
    
}
```
Easy enough! Now let's use the `figlet` package. We also have a `gradient` package. This will apply a nice gradient to the ASCII art and it's easy to implment. In our `console.log`, all we have to do is call the `gradient` package and one of its methods and it will apply it for us.

```js
async function winnerText() {
    console.clear()
    const winMessage = `Congratulations ${playerName}`
    figlet(winMessage,(err, data) => {
        console.log(gradient.retro(data));
    })
}
```
Awesome! Now our game is complete

## Links to Package Documentation
- [Inquirer](https://www.npmjs.com/package/inquirer)
- [Gradient-String](https://www.npmjs.com/package/gradient-string)
- [Chalk](https://www.npmjs.com/package/chalk)
- [Chalk-Animation](https://www.npmjs.com/package/chalk-animation)
- [Figlet](https://www.npmjs.com/package/figlet)
- [Nanospinner](https://www.npmjs.com/package/nanospinner)