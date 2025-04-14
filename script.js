const typingArea = document.getElementById("typing-area");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");


const paragraph = "Typing fast helps you work more efficiently. Practice every day!";

let timer;
let timeLeft = 60;
let totalTyped = 0;
let correctTyped = 0;
let isRunning = false;

function startTest() {
    clearInterval (timer);
    timeLeft = 60;
    totalTyped = 0;
    correctTyped = 0;
    isRunning = false;
    timerDisplay.textContent = timeLeft;
    wpmDisplay.textContent = "100%";
    typingArea.value = "";
    typingArea.disabled = false;
    typingArea.focus ();
}

function updateTimer () {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
    } else {
        clearInterval (timer);
        typingArea.disabled= true;
    }
}

function calculateStats() {
    const userInput = typingArea.value;
    totalTyped = userInput.length;

    correctTyped = 0;
    for (let i = 0; i < userInput.lenght; i++) {
        if (userInput[i] === paragraph[i]) {
            correctTyped++;
        }
    }

    const words = correctTyped / 5;
    const timeElapsed = 60 - timeLeft;
    const wpm = timeElapsed > 0 ? Math.round((words / timeElapsed.Elapsed) * 60) : 0;
    const accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) :100;
    
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = '${accuracy}%';
}


typingArea.addEventListener("input", () => {
    if (!isRunning) {
        timer = setInterval (updateTimer, 1000);
        isRunning = true;
    }
    calculateStats ();
});

window.onload = startTest;