let sentences = [];
let currentSentenceIndex = 0;

// Fetch sentences from JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        sentences = data;
        displaySentence(sentences[currentSentenceIndex].incorrect);
    })
    .catch(error => console.error('Error loading JSON:', error));

// Display the current sentence
function displaySentence(sentence) {
    const container = document.getElementById('sentence-container');
    container.innerHTML = '';
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

// Move to the next sentence
document.getElementById('next-button').addEventListener('click', () => {
    currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
    displaySentence(sentences[currentSentenceIndex].incorrect);
    document.getElementById('next-button').style.display = 'none';
});
