let colors = ["pink", "blue", "green", "yellow", "orange", "red"];
let arrChosenLine = [];
let mikum = 0;
let count = 0; 
let currentGuess = []; 

let boardGame = document.querySelectorAll(".oneGess");
let smallCircles = document.querySelectorAll(".small-circle");
let ChosenLine = document.querySelectorAll(".oneChosen");

// פונקציה ליצירת צלילים (Web Audio API)
function playSound(type) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'success') {
        oscillator.frequency.setValueAtTime(580, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);
    } else {
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    }
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
    oscillator.stop(audioCtx.currentTime + 0.2);
}

function mixColors() {
    for (let index = colors.length - 1; index > 0; index--) {
        let random = Math.floor(Math.random() * (index + 1));
        [colors[index], colors[random]] = [colors[random], colors[index]];
    }
}

function computerChoseColor() {
    mixColors();
    for (let i = 0; i < 4; i++) {
        arrChosenLine[i] = colors[i];
    }
    console.log("הקוד הסודי:", arrChosenLine); // לצורכי בדיקה
}

function updateSubmitButton() {
    const submitBtn = document.getElementById("submit-btn");
    if (submitBtn) {
        if (currentGuess.length === 4) {
            submitBtn.classList.add("ready-to-submit");
        } else {
            submitBtn.classList.remove("ready-to-submit");
        }
    }
}

function pressColor(e) {
    if (currentGuess.length >= 4) return;
    let selectedColor = e.style.backgroundColor;
    if (currentGuess.includes(selectedColor)) return;

    boardGame[mikum].style.backgroundColor = selectedColor;
    currentGuess.push(selectedColor);
    mikum++;
    updateSubmitButton();
}

function undoLastMove() {
    if (currentGuess.length === 0) return;
    playSound('click');
    currentGuess.pop();
    mikum--;
    boardGame[mikum].style.backgroundColor = "white"; 
    updateSubmitButton();
}

function submitGuess() {
    if (currentGuess.length < 4) {
        alert("יש למלא 4 צבעים לפני האישור!");
        return;
    }
    playSound('success');

    let line = Math.floor((mikum - 1) / 4);
    let bool = 0;
    let pgiha = 0;

    currentGuess.forEach((c, i) => {
        if (c === arrChosenLine[i]) bool++;
        else if (arrChosenLine.includes(c)) pgiha++;
    });

    for (let i = 0; i < bool; i++) {
        smallCircles[i + line * 4].style.backgroundColor = "black";
    }
    for (let i = bool; i < pgiha + bool; i++) {
        smallCircles[i + line * 4].style.backgroundColor = "white";
    }

    count++;
    document.querySelector("#current-attempt").innerHTML = count;

    if (bool === 4) {
        ChosenLine.forEach((el, i) => {
            el.style.backgroundColor = arrChosenLine[i];
            el.classList.add('revealed'); // להסרת סימן השאלה ב-CSS
        });
        setTimeout(() => showEndGame(true), 1500);
    } else if (count === 12) {
        showEndGame(false);
    }

    currentGuess = [];
    updateSubmitButton();
}

function showEndGame(isWin) {
    const modal = document.getElementById("endGameModal");
    const title = document.getElementById("modalTitle");
    const message = document.getElementById("modalMessage");
    if (isWin) {
        title.innerText = "אלוף!!!";
        message.innerText = " פיצחת את הקוד תוך " + count + " ניסיונות!";
    } else {
        title.innerText = "אופס...";
        message.innerText = "נגמרו הניסיונות, נסה שוב!";
    }
    modal.style.display = "flex";
}

computerChoseColor();