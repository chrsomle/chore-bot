const bot = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const space = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
const beach = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const closed = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

let botLocation = -1;
let chances = 3;
let streaks = 0;
let highest = 0;
let img = [bot, space, beach];
let status = document.querySelector('.start-row');
let currStreak = document.querySelector('.curr-streak');
let highStreak = document.querySelector('.high-streak');

let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');


function winGame() {
    streaks++;
    highest = highest > streaks ? highest : streaks;
    doorImage1.onclick = closed;
    doorImage2.onclick = closed;
    doorImage3.onclick = closed;
    status.innerHTML = 'You Won!';
    status.style.backgroundColor = 'hsl(90, 90%, 50%)';
    status.style.color = 'seashell';
    status.style.cursor = 'pointer';
    status.onclick = startGame;
}

let doors = [0, 0, 0];

function check() {
    for (let j = 0; j < 3; j++) {
        if (doors[botLocation] === 1) {
            return chances > 1 ? true : false;
        }
        return false;
    }
}

function randomDoor() {
    let rand = Math.floor(Math.random() * 3);
    botLocation = rand;
    for (let i = 0; i < rand; i++) img.unshift(img.pop());
}

function startGame() {
    currStreak.innerHTML = `Current Streak: ${streaks}`;
    highStreak.innerHTML = `Highest Streak: ${highest}`;
    doors = [0, 0, 0]
    status.innerHTML = 'Good Luck!';
    status.style.backgroundColor = 'seashell';
    status.style.color = 'black';
    status.style.cursor = 'default';
    doorImage1.src = closed;
    doorImage2.src = closed;
    doorImage3.src = closed;
    chances = 3;
    img = [bot, space, beach];
    randomDoor();
    console.log(botLocation);

    doorImage1.onclick = () => {
        doorImage1.src = img[0];
        doors[0] = 1;
        if (!check()) chances > 1 ? chances-- : winGame();
        else gameOver();
    }
    doorImage2.onclick = () => {
        doorImage2.src = img[1];
        doors[1] = 1;
        if (!check()) chances > 1 ? chances-- : winGame();
        else gameOver();
    }
    doorImage3.onclick = () => {
        doorImage3.src = img[2];
        doors[2] = 1;
        if (!check()) chances > 1 ? chances-- : winGame();
        else gameOver();
    }
}

function gameOver() {
    streaks = 0;
    doorImage1.onclick = closed;
    doorImage2.onclick = closed;
    doorImage3.onclick = closed;
    setTimeout(function () {
        status.innerHTML = 'Reset Game?';
    }, 2000);
    status.innerHTML = 'Game Over!';
    status.style.backgroundColor = 'hsl(0, 90%, 50%)';
    status.style.color = 'seashell';
    status.style.cursor = 'pointer';
    status.onclick = startGame;
}

startGame();