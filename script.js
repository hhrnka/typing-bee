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
let currentParagraph = ""; 

function startTest() {
    clearInterval (timer);
    timeLeft = 60;
    totalTyped = 0;
    correctTyped = 0;
    isRunning = false;
    timerDisplay.textContent = timeLeft;
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100%";

    loadParagraph();
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

const paragraphs = {
    easy: [
        'It was a bright cold day in April, and the clocks were striking thirteen. Winston walked quickly, trying not to be seen. The wind was sharp, cutting through his coat as he moved past the dusty buildings. He looked up at a sign that read BIG BROTHER IS WATCHING YOU.',
'The house stood on a quiet street, tucked behind tall hedges and sleepy trees. Children passed by on their way to school, their shoes crunching leaves on the sidewalk. Inside, the room was still. Books sat on the shelf like quiet friends waiting to be read.',
'The garden was full of blooms, each flower more colorful than the last. Bees moved from petal to petal, humming in the golden sunlight. A young girl in a straw hat sat by the roses, her book open but forgotten. It was a perfect afternoon, the kind you remember.'
    ],

    medium: [
        'The woods were quiet but full of life. Birds called from hidden branches, and the sound of a brook echoed through the trees. As he walked deeper, he noticed how the light danced through the leaves like golden lace. It was a path he had walked many times, but it never failed to surprise him.',
'Elizabeth read the letter again, her heart heavy with a mix of anger and sadness. Could she have been so mistaken in her judgment? The words on the page echoed in her mind, and her pride seemed suddenly foolish. She folded the letter and stared out the window, the sky grey with approaching rain.',
'He stood at the edge of the cliff, wind sweeping through his coat and hair. Below, the waves crashed and curled, wild and endless. He thought of the letter he had never sent, the words he had never said. The sea offered no answers, only motion and sound.'
    ],

    hard: [
        'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness. We had everything before us, we had nothing before us. The tale was not simply about revolution, but about the soul of man struggling to find meaning in chaos.',
'To be, or not to be: that is the question. Whether it is nobler to suffer the slings and arrows of outrageous fortune or to take arms against a sea of troubles. Hamlet, with thoughts heavy and mind weary, stood alone in the quiet, pondering life’s great uncertainty.',
'The moors stretched wide, wild and windswept under a steel sky. Catherine wandered with a restlessness in her spirit that no house or hearth could tame. Her love for Heathcliff was a fire—dark, fierce, and untamed. In the wind’s howl, their names still whispered.'
    ]
}

function loadParagraph() {
    const difficulty = document.getElementById("difficulty").value;
    const selectedSet = paragraphs[difficulty];
    const randomIndex = Math.floor(Math.random() * selectedSet.length);
    const paragraph = selectedSet[randomIndex];
    document.getElementById("display-paragraph").textContent = paragraph;
    document.getElementById("typing-area").value = "";
    document.getElementById("typing-area").placeholder = paragraph;
    currentParagraph = paragraph;
}


function calculateStats() {
    const userInput = typingArea.value;
    totalTyped = userInput.length;

    correctTyped = 0;
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === paragraph[i]) {
            correctTyped++;
        }
    }

    const words = correctTyped / 5;
    const timeElapsed = 60 - timeLeft;
    const wpm = timeElapsed > 0 ? Math.round((words / timeElapsed) * 60) : 0;
    const accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) :100;
    
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = `${accuracy}%`;
}


typingArea.addEventListener("input", () => {
    if (!isRunning) {
        timer = setInterval (updateTimer, 1000);
        isRunning = true;
    }
    calculateStats ();
});

window.onload = startTest;