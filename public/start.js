const userText = document.getElementById('user-text');
const startBtn = document.getElementById('start-btn');
const timer = document.getElementById('timer');
const retryBtn = document.getElementById('retry');
let timeLeft = 60; // function hinzufügen um eine zeit durch button auszuwählen 1
let timerRunning = false;

userText.addEventListener('input', () => {
  if (!timerRunning && userText.value.trim() !== '') {
    timerRunning = true;
    startTimer();
  }
});

retryBtn.addEventListener('click', () => {
  // Clear the text in the textarea
  userText.value = '';
  document.getElementById("user-text").disabled = false;
  
  // Reset the timer
  timeLeft = 60; // function hinzufügen um eine zeit durch button auszuwählen 2end
  timer.innerText = '1:00';

  // Hide the retry button
  retryBtn.style.display = 'none';
  
  // Restart the countdown
  timerRunning = false;
});

function startTimer() {
  const countdown = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    if (timeLeft === 0) {
        document.getElementById("user-text").disabled = true;
      clearInterval(countdown);
      // Handle end of time here
      retryBtn.style.display = 'block';
    }
  }, 1000);
}



//bearbeiten
const myTextarea = document.getElementById('user-text');

myTextarea.addEventListener('focus', () => {
  // Save the current scroll position
  const scrollPosition = window.scrollY;

  // Listen for scroll events
  window.addEventListener('scroll', preventScroll);

  // Prevent the default scroll behavior
  function preventScroll() {
    window.scrollTo(0, scrollPosition);
  }
});

myTextarea.addEventListener('blur', () => {
  // Remove the scroll event listener when the textarea loses focus
  window.removeEventListener('scroll', preventScroll);
});
//bearbeiten ende




fetch('json/german1k.json')
  .then(response => response.json())
  .then(data => {
    const words = data.words;
    const wordParentElement = document.querySelector('.word_parent');
    
// loop to generate 150 random words and append to wordParentElement
for (let i = 0; i < 150; i++) {
  const randomWord = words[Math.floor(Math.random() * words.length)];
  const randomWordDiv = document.createElement('div');
  randomWordDiv.classList.add('word'); // add the "word" class to the div
  
  // build spans around the letters of the word
  const letters = randomWord.split('');
  const letterSpans = letters.map((letter, index) => {
    const span = document.createElement('span');
    span.innerText = letter;
    span.classList.add('letter'); // add the "letter" class to the span
    if (i === 0 && index === 0) {
      span.classList.add('current'); // add the "current" class to the first letter
    }
    return span;
  });

  // add the "current" class to the first word
  if (i === 0) {
    randomWordDiv.classList.add('current');
  }

  // append the spans to the randomWordDiv
  letterSpans.forEach(span => {
    randomWordDiv.appendChild(span);
  });

  // append the randomWordDiv to the wordParentElement
  wordParentElement.appendChild(randomWordDiv);
  wordParentElement.appendChild(document.createTextNode('\u00A0'));
}
  });


















  function formatWord(word) {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
  }

  
  
  function addClass(el,name) {
    el.className += ' '+name;
  }
  function removeClass(el,name) {
    el.className = el.className.replace(name,'');
  }
  
  
  
  
  
  
  document.getElementById('game').addEventListener('keyup', ev => {
    const key = ev.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter?.innerHTML || ' ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
  
    
  
    if (isLetter) {
      if (currentLetter) {
        addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
        removeClass(currentLetter, 'current');
        if (currentLetter.nextElementSibling) {
          addClass(currentLetter.nextElementSibling, 'current');
          // move the cursor to the next letter
          cursor.style.top = currentLetter.nextElementSibling.getBoundingClientRect().top + 2 + 'px';
          cursor.style.left = currentLetter.nextElementSibling.getBoundingClientRect().left + 'px';
        }
      } else {
        const incorrectLetter = document.createElement('span');
        incorrectLetter.innerHTML = key;
        incorrectLetter.className = 'letter incorrect extra';
        currentWord.appendChild(incorrectLetter);
      }
    }
    
  
    if (isSpace) {
      if (expected !== ' ') {
        const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
        lettersToInvalidate.forEach(letter => {
          addClass(letter, 'incorrect');
        });
      }
      removeClass(currentWord, 'current');
      const nextWord = currentWord.nextElementSibling;
      if (nextWord) {
        addClass(nextWord, 'current');
        addClass(nextWord.firstChild, 'current');
      }
      if (currentLetter) {
        removeClass(currentLetter, 'current');
      }











      //cursor
      const nextLetter = document.querySelector('.letter.current');
      const nextWordcursor = document.querySelector('.word.current');
      const cursor = document.getElementById('cursor');
      cursor.style.top = (nextLetter || nextWordcursor).getBoundingClientRect().top + 2 + 'px';
      cursor.style.left = (nextLetter || nextWordcursor).getBoundingClientRect()[nextLetter ? 'left' : 'right'] - 2 + 'px';
     
 
      




       // When the modal is shown, we want a fixed body
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;

        // When the modal is hidden...
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);









    }
  });
