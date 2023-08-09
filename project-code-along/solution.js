//imports
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from 'gradient-string'
import { createSpinner } from "nanospinner";

//create a variable name
let playerName;
//helper to resolve animations
//ms = 2000 miliseconds, after 2 seconds, the promise will resolve
const resolveAnimations = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));
//spinner animation
const spinner = createSpinner('loading next process');


async function startGame() {
    //welcome msg
    const welcomeMsg = chalkAnimation.rainbow(`welcome to the choose your adventure game \n`);
    //call helper
    await resolveAnimations();
    //stop the animation
    welcomeMsg.stop();

    //about the game
    console.log(`
    ${chalk.bgGreenBright('we shall begin')}
    this adventure lives in your terminal
    if you choose any of the wrong choices, I will ${chalk.bgRed('terminate')}
    if you make it to the end, you will be rewarded
    `);
};

async function playerInfo() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'Hello, please enter your name.'
    });
    playerName = answers.player_name;
    await pathQuestion()
};

async function pathQuestion() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: `Welcome ${playerName}, what path will you choose? \n`,
        choices: [
            { name:'left - you hear a breeze echoing down the tunnel', value: 'left' },
            { name: 'right - you hear rocks crumbling in the distance', value: 'right' },
            { name: 'straight - you hear an eerie silence', value: 'straight' }
        ]
    });
   
    await pathChoice(answers.question_1);
};

async function pathChoice(choice) {
    spinner.start();
    await resolveAnimations();
    if (choice === 'left') {
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

async function handleLeftAnswer(choice) {
    spinner.start();
    await resolveAnimations();
    if(choice) {
        spinner.success({ text: `a secret passage opens, ${playerName}, you made the right choice`});
        await finalQuestion()
    } else {
        spinner.warn({ text: `${playerName}, you should have pressed the button. ${chalk.bgRed(`FATAL - terminating process due to inactivity`)}`});
        process.exit(1)
    }
}

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
    if(choice) {
        spinner.success({ text: `${playerName}, CORRECT! You have gained access to the final room`});
        await finalQuestion()
    } else {
        spinner.warn({ text: `${playerName} ${chalk.bgRed(`FATAL - INCORRECT CHOICE`)}`});
        process.exit(1)
    }
}

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
        spinner.warn({ text: `${chalk.bgRed(`FATAL - terminating process due to inactivity`)}`});
    }
}

async function winnerText() {
    console.clear()
    const winMessage = `Congratulations ${playerName}`
    figlet(winMessage,(err, data) => {
        console.log(gradient.retro(data));
    })
}
async function main() {
    //invoke our game functions here
    await startGame();
    await playerInfo();
}

main()