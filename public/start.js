const gameTime = 60 * 1000;
window.timer = null;
window.gameStart = null




fetch('json/german1k.json')
  .then(response => response.json())
  .then(data => {
    const words = data.words;
    const wordParentElement = document.getElementById('words');
    
// loop to generate 200 random words and append to wordParentElement
for (let i = 0; i < 200; i++) {
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
;
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
  2
 
  
  
  
  // game beginning
    
    document.getElementById('game').addEventListener('keyup', ev => {
    const key = ev.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter?.innerHTML || ' ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    const isBackspace = key === "Backspace";
    const isFirstLetter = currentLetter === currentWord.firstChild;

   // timer 
    if (!window.timer && isLetter || " ") {
      window.timer = setInterval(() => {
        if (!window.gameStart) {
          window.gameStart = (new Date()).getTime();
        }
        const currentTime = (new Date()).getTime();
        const msPassed = currentTime - window.gameStart;
        const sPassed = Math.round(msPassed / 1000);
        const sLeft = Math.round((gameTime / 1000) - sPassed);
        if (sLeft <= 10){
         clock = document.querySelector(".clock")
         clock.style.color = "rgba(203, 70, 53, 0.804)"
        }
        if (sLeft <= -1) {
          gameOver();
          return;
        }
        document.getElementById('timer').innerHTML = sLeft + 's';
      }, 1000);
    }
  

  
    if (isBackspace){
      if(currentLetter && isFirstLetter){
        removeClass(currentWord, 'current');
        addClass(currentWord.previousSibling, 'current')
        removeClass(currentLetter, 'current')
        addClass(currentWord.previousSibling.lastChild, 'current')
        removeClass(currentWord.previousSibling.lastChild, 'incorrect')
        removeClass(currentWord.previousSibling.lastChild, 'correct')
      }
      if (currentLetter && !isFirstLetter){
        removeClass(currentLetter, 'current')
        addClass(currentLetter.previousSibling, 'current');
        removeClass(currentLetter.previousSibling, 'incorrect')
        removeClass(currentLetter.previousSibling, 'correct')
      }
      if(!currentLetter){
        addClass(currentWord.lastChild, 'current')
        removeClass(currentWord.lastChild, 'incorrect')
        removeClass(currentWord.lastChild, 'correct')
      }
    }

    if (isLetter) {
      if (currentLetter) {
        addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
        removeClass(currentLetter, 'current');
        if (currentLetter.nextSibling) {
          addClass(currentLetter.nextSibling, 'current');
        }
      } 
    }
    
  //space beginning
    if (isSpace) {
      if (expected !== ' ') {
        const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
        lettersToInvalidate.forEach(letter => {
          addClass(letter, 'incorrect');
        });
      }
      removeClass(currentWord, 'current');
      const nextWord = currentWord.nextSibling;
      if (nextWord) {
        addClass(nextWord, 'current');
        addClass(nextWord.firstChild, 'current');
      }
      if (currentLetter) {
        removeClass(currentLetter, 'current');
      }}
// space end 


      //cursor
      const nextLetter = document.querySelector('.letter.current');
      const nextWord = document.querySelector('.word.current');
      const cursor = document.getElementById('cursor');
      cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 2 + 'px';
      if(!nextLetter){
       cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] - 8 + 'px';

      }else{
      cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px';
      }
     




                // 190 var parameter zum einstellen des line wechsel 
          // move lines / words
  if (currentWord.getBoundingClientRect().top > 190) { 
    const words = document.querySelector('.word_parent');
    const margin = parseInt(words.style.marginTop || '0px');
     words.style.marginTop = (margin - 33) + 'px';
  }
  
   // glaub ich muss words auf eine klasse reduzieren und word parents entfernen wegen css undso

});
  // game end









  

 
  const game = document.getElementById("game");

  game.addEventListener("keydown", function(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
  });
                                              



       // When the modal is shown, we want a fixed body
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;

        // When the modal is hidden...
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);





