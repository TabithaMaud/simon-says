const openBtn = document.querySelector('#openHowToPlay');
const howToPage = document.querySelector('#howToPage');
const close = document.querySelector('#close');

const gameboard = document.querySelector('.gameboard');
const boxes = document.querySelectorAll('.box');

const startBtn = document.querySelector('.startBtn');
const resetBtn = document.querySelector('.resetBtn');

const levelTracker = document.querySelector('.levelTracker');
const highScoreTracker = document.querySelector('.highScore');
let highScore = 0;
const score = document.querySelector('.score');
let currentScore = 0;
const message = document.querySelector('h2');
let level = 1;

let computerArray = [];
let playerChoice = [];

let colorChoices = ['red', 'blue', 'green', 'yellow'];
let newColor;

let gameVolume = document.querySelector('i');

gameVolume.addEventListener('click', muteGame);

function muteMe(sound) {
	if (sound.muted === false) {
		gameVolume.setAttribute('class', 'fa fa-volume-off');
		sound.muted = true;
		sound.pause();
	} else {
		sound.muted = false;
		gameVolume.setAttribute('class', 'fa fa-volume-up');
	}
}

function muteGame() {
	document.querySelectorAll('audio').forEach((sound) => muteMe(sound));
}

startBtn.addEventListener('click', startGame);

function startGame() {
	levelTracker.innerText = `${level}`;
	startBtn.style.display = 'none';
	setTimeout(addRandomColor, 1000);
}

function addRandomColor() {
	newColor = colorChoices[Math.floor(Math.random() * 4)];
	computerArray.push(newColor);
	displayExistingColors();
}

function displayExistingColors() {
	message.innerHTML = '';
	for (let i = 0; i < computerArray.length; i++) {
		setTimeout(function () {
			if (computerArray[i] === 'red') {
				boxes[0].style.backgroundColor = 'red';
				sound1.play();
				setTimeout(function () {
					boxes[0].style.background = '';
				}, 750);
			}
			if (computerArray[i] === 'blue') {
				boxes[1].style.backgroundColor = 'blue';
				sound2.play();
				setTimeout(function () {
					boxes[1].style.background = '';
				}, 750);
			}
			if (computerArray[i] === 'green') {
				boxes[2].style.backgroundColor = 'green';
				sound3.play();
				setTimeout(function () {
					boxes[2].style.background = '';
				}, 750);
			}
			if (computerArray[i] === 'yellow') {
				boxes[3].style.backgroundColor = 'yellow';
				sound4.play();
				setTimeout(function () {
					boxes[3].style.background = '';
				}, 750);
			}
		}, i * 1250);
	}
	gameboard.addEventListener('click', handlePlayerClick);
}

function handlePlayerClick(e) {
	e.preventDefault();
	if (e.target.classList.contains('box')) {
		if (playerChoice.length <= computerArray.length) {
			let color = e.target.dataset.color;
			e.target.style.backgroundColor = color;
			playerChoice.push(color);
			if (color === 'red') {
				sound1.play();
			}
			if (color === 'blue') {
				sound2.play();
			}
			if (color === 'green') {
				sound3.play();
			}
			if (color === 'yellow') {
				sound4.play();
			}
			setTimeout(function () {
				e.target.style.backgroundColor = '';
			}, 500);
			compareChoice();
		}
	}
}

function compareChoice() {
	let length = playerChoice.length;
	let newComputerArray = computerArray.slice(0, length);
	for (let i = 0; i < newComputerArray.length; i++) {
		// if (newComputerArray[i] === playerChoice[i]) {
		// 	console.log('SUCCESS');
		// } else
		if (newComputerArray[i] !== playerChoice[i]) {
			message.innerText = 'GAME OVER';
			gameboard.removeEventListener('click', handlePlayerClick, false);
			if (currentScore > highScore) {
				highScore = currentScore;
				highScoreTracker.innerText = currentScore;
				message.innerText = 'Game Over: HIGH SCORE!!!!';
			}
			return;
		}
	}
	currentScore++;
	score.innerText = `${currentScore}`;
	if (playerChoice.length === computerArray.length) {
		message.innerText = 'Success!!!';
		level++;
		levelTracker.innerText = `${level}`;
		playerChoice = [];
		setTimeout(addRandomColor, 2000);
	}
}

resetBtn.addEventListener('click', resetGame);

function resetGame() {
	computerArray = [];
	playerChoice = [];
	level = 1;
	startBtn.style.display = 'inline-block';
	levelTracker.innerHTML = '';
	message.innerHTML = '';
	score.innerText = '0';
	currentScore = 0;
	levelTracker.innerText = `${level}`;
	gameboard.removeEventListener('click', handlePlayerClick, false);
}

openBtn.addEventListener('click', openHowTo);

function openHowTo() {
	howToPage.style.display = 'block';
}

function closeHowTo() {
	howToPage.style.display = 'none';
}

close.addEventListener('click', closeHowTo);
