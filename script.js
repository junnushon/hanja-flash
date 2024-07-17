let characters = [];
let currentChar = {};
let currentScript = '8';
let recentCharacters = [];
let correctAnswers = 0;
let incorrectAnswers = 0;
let totalFlashcards = 0;
let studyMode = false; // 학습 모드 여부
let studyInterval; // 학습 모드 인터벌

function loadCharacters(script) {
    const scriptFile = `data/${script}.json`;
    console.log(scriptFile);
    fetch(scriptFile)
        .then(response => response.json())
        .then(data => {
            characters = data.map(char => ({
                ...char,
                showCount: 0,
                wrongCount: 0
            }));
            totalFlashcards = characters.length;
            resetCounts();
            getRandomCharacter();
        });
}

function resetCounts() {
    characters.forEach(char => {
        char.showCount = 0;
        char.wrongCount = 0;
    });
    recentCharacters = [];
    correctAnswers = 0;
    incorrectAnswers = 0;
    updateProgressBar();
}

function updateProgressBar() {
    const progressBarCorrect = document.getElementById('progress-bar-correct');
    const progressBarIncorrect = document.getElementById('progress-bar-incorrect');

    const totalAnswered = correctAnswers + incorrectAnswers;
    const totalPercentage = (totalAnswered / totalFlashcards) * 100;
    const correctPercentage = (correctAnswers / totalFlashcards) * 100;
    const incorrectPercentage = (incorrectAnswers / totalFlashcards) * 100;

    progressBarCorrect.style.width = `${correctPercentage}%`;
    progressBarIncorrect.style.width = `${incorrectPercentage}%`;
    progressBarIncorrect.style.left = `${correctPercentage}%`;

    // Update overall progress bar width
    document.getElementById('progress-bar').style.width = `${totalPercentage}%`;
}

function getRandomCharacter() {
    const filteredCharacters = characters;
    const minShowCount = Math.min(...filteredCharacters.map(char => char.showCount));
    const leastShownCharacters = filteredCharacters.filter(char => char.showCount === minShowCount && !recentCharacters.includes(char));

    let selectedCharacter;

    if (leastShownCharacters.length > 0) {
        const randomIndex = Math.floor(Math.random() * leastShownCharacters.length);
        selectedCharacter = leastShownCharacters[randomIndex];
    } else {
        const otherCharacters = filteredCharacters.filter(char => !recentCharacters.includes(char));
        const randomIndex = Math.floor(Math.random() * otherCharacters.length);
        selectedCharacter = otherCharacters[randomIndex];
    }

    selectedCharacter.showCount++;
    recentCharacters.push(selectedCharacter);
    if (recentCharacters.length > 10) {
        recentCharacters.shift();
    }

    currentChar = selectedCharacter;
    document.getElementById('flash-card').innerText = currentChar.character;
    document.getElementById('result').innerText = '';
    if (!studyMode) {
        document.getElementById('answer').value = '';
        document.getElementById('next-char').style.display = 'none';
        document.getElementById('check-answer').style.display = 'inline';
        document.getElementById('answer').focus();
    }
}

function startStudyMode() {
    studyMode = true;
    document.getElementById('answer-container').innerHTML = '<input type="text" id="dummy-input" disabled style="opacity: 0; height: 1px;">'; // 빈 인풋 필드 유지
    document.getElementById('check-answer').style.display = 'none'; // 체크 버튼 숨김
    document.getElementById('next-char').style.display = 'none'; // 다음 버튼 숨김

    getRandomCharacter(); // 첫 글자 표시
    showCharacterInfo(); // 첫 글자의 뜻과 음 표시

    studyInterval = setInterval(() => {
        getRandomCharacter();
        showCharacterInfo();
    }, 2000); // 2초 간격으로 다음 글자
}

function stopStudyMode() {
    studyMode = false;
    clearInterval(studyInterval); // 인터벌 정지
    document.getElementById('answer-container').innerHTML = '<input type="text" id="answer" placeholder="Pronunciation">'; // 인풋 박스 복원
    document.getElementById('check-answer').style.display = 'inline'; // 체크 버튼 복원
    document.getElementById('next-char').style.display = 'none'; // 다음 버튼 숨김
    document.getElementById('result').innerText = ''; // 결과 초기화
}

function showCharacterInfo() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = `${currentChar.meaning} ${currentChar.korean}`;
    resultDiv.style.color = 'black';
}

document.getElementById('script-select-1').addEventListener('change', (event) => {
    currentScript = event.target.value;
    loadCharacters(currentScript);
});

document.getElementById('script-select-2').addEventListener('change', (event) => {
    const mode = event.target.value;
    if (mode === 'learn') {
        startStudyMode();
    } else {
        stopStudyMode();
    }
});

document.getElementById('check-answer').addEventListener('click', () => {
    const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    if (userAnswer === currentChar.korean || userAnswer === currentChar.korean2 || userAnswer === currentChar.korean3) {
        resultDiv.innerText = `Correct! ${currentChar.meaning} ${currentChar.korean}`;
        resultDiv.style.color = 'green';
        correctAnswers++;
    } else {
        resultDiv.innerText = `Incorrect. The correct answer is ${currentChar.meaning} ${currentChar.korean}`;
        resultDiv.style.color = 'red';
        currentChar.wrongCount++;
        incorrectAnswers++;
    }
    document.getElementById('next-char').style.display = 'inline';
    document.getElementById('check-answer').style.display = 'none';
    document.getElementById('next-char').focus();
    updateProgressBar();
});

document.getElementById('next-char').addEventListener('click', () => {
    getRandomCharacter();
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const userAnswer = document.getElementById('answer').value.trim();
        if (userAnswer !== '') {
            if (document.getElementById('check-answer').style.display !== 'none') {
                document.getElementById('check-answer').click();
            } else {
                document.getElementById('next-char').click();
            }
        } else {
            document.getElementById('answer').focus();
        }
    }
});

window.onload = () => loadCharacters(currentScript);
