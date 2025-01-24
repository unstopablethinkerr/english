let sentences = [];
let usedIndexes = new Set();

// Fetch sentences from JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        sentences = data;
        displayRandomSentence();
    })
    .catch(error => console.error('Error loading JSON:', error));

// Display a random sentence
function displayRandomSentence() {
    const container = document.getElementById('sentence-container');
    container.innerHTML = '';

    if (usedIndexes.size === sentences.length) {
        // Reset if all sentences are used
        usedIndexes.clear();
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * sentences.length);
    } while (usedIndexes.has(randomIndex));

    usedIndexes.add(randomIndex);
    currentSentenceIndex = randomIndex;

    const sentence = sentences[randomIndex].incorrect;
    const words = sentence.split(' ');
    words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        wordSpan.addEventListener('click', () => handleWordClick(word, index));
        container.appendChild(wordSpan);
    });
}

// Handle word click
function handleWordClick(word, index) {
    const correctSentence = sentences[currentSentenceIndex].correct;
    const correctWords = correctSentence.split(' ');

    if (correctWords[index] !== word) {
        // Word is incorrect
        const spans = document.querySelectorAll('#sentence-container span');
        spans[index].classList.add('incorrect');
        setTimeout(() => {
            spans[index].textContent = correctWords[index];
            spans[index].classList.remove('incorrect');
            spans[index].classList.add('correct');
            spans[index].style.transform = 'translateY(-20px)';
            setTimeout(() => {
                spans[index].style.transform = 'translateY(0)';
                document.getElementById('next-button').style.display = 'block';
            }, 300);
        }, 500);
    } else {
        // Word is correct
        alert('This word is correct.');
    }
}

// Move to the next random sentence
document.getElementById('next-button').addEventListener('click', () => {
    displayRandomSentence();
    document.getElementById('next-button').style.display = 'none';
});
