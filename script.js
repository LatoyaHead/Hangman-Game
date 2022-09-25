//Initial References
const player1Btn = document.getElementById('player1Btn')
const player2Btn = document.getElementById('player2Btn')
const letterContainer = document.getElementById('letter-container')
const optionsContainer = document.getElementById('options-container')
const userInputSection = document.getElementById('user-input-section')
const newGameContainer = document.getElementById('new-game-container')
const newGameButton = document.getElementById('new-game-button')
// const canvas = document.getElementById('canvas')
const hangmanHead= document.querySelector('.head')
const hangmanBody= document.querySelector('.body')
const hangmanRightArm= document.querySelector('.right-arm')
const hangmanLeftArm= document.querySelector('.left-arm')
const hangmanRightLeg= document.querySelector('.right-leg')
const hangmanLeftLeg= document.querySelector('.left-leg')
const hangmanHead1= document.querySelector('.head1')
const hangmanBody1= document.querySelector('.body1')
const hangmanRightArm1= document.querySelector('.right-arm1')
const hangmanLeftArm1= document.querySelector('.left-arm1')
const hangmanRightLeg1= document.querySelector('.right-leg1')
const hangmanLeftLeg1= document.querySelector('.left-leg1')
const resultText = document.getElementById('result-text')
const container2 = document.querySelector('.container2')
const letterContainer2 = document.getElementById('letter-container2')
const optionsContainer2 = document.getElementById('options-container2')
const userInputSection2 = document.getElementById('user-input-section2')
const category =document.querySelector('.category')

player1Btn.addEventListener('click', function(){
  if(player2Btn.classList.contains('mode2')){
    player2Btn.classList.remove('mode2')
  }
  player1Btn.classList.add('active')
})
player2Btn.addEventListener('click', function(){
  if(player1Btn.classList.contains('active')){
    player1Btn.classList.remove('active')
  }
  player2Btn.classList.add('mode2')
})


//Options value for buttons
let options = {
  Fruits: ["Apple", "Oranges", "Bananas", "Watermelon", "Pineapple", "Grapes"],
  Vegetables: ["Broccoli", "Carrot", "Avocado", "Cabbage", "Celery", "Corn", "Zucchini", "Radish", "Cauliflower", "Turnip", "Tomato"],
  Animals: ["Cat", "Dog", "Fish", "Wolf", "Rabbit", "Snake", "Deer", "Lion", "Turtle"]
}

//Count
let winCount = 0
let winCount2 = 0
let count = 0
let count2 = 0
let chosenWord = ""
let displayLettersCount = 0

//Display option buttons
const displayOptions = (shouldRunAgain) => {
  if(shouldRunAgain && displayLettersCount === 0) return //if this is TRUE leave the function
  player2Btn.disabled = false
  player1Btn.disabled = false
  optionsContainer.style.display = 'block'
  let headers = document.querySelectorAll('h3')
  headers.forEach(elemH => elemH.style.display='block')
  optionsContainer.innerHTML += `<h3>Select A Category</h3>`;
  let buttonCon = document.createElement("div");
  buttonCon.classList.add('center')
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};
const removeHangman = () => { //Built this function to remove hangman body parts
  hangmanHead.style.display = 'none'
  hangmanHead1.style.display = 'none'
  hangmanBody.style.display = 'none'
  hangmanBody1.style.display = 'none'
  hangmanRightArm.style.display = 'none'
  hangmanRightArm1.style.display = 'none'
  hangmanLeftArm.style.display = 'none'
  hangmanLeftArm1.style.display = 'none'
  hangmanLeftLeg.style.display = 'none'
  hangmanLeftLeg1.style.display = 'none'
  hangmanRightLeg.style.display = 'none'
  hangmanRightLeg1.style.display = 'none'
} 

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  let letterButtons1 = document.querySelectorAll(".letters1");
  let headers = document.querySelectorAll('h2')
  displayLettersCount = 0;

  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  letterButtons1.forEach((button) => {
    button.disabled = true;
  })
  container2.style.display = 'none'

  headers.forEach((header) => {
    header.style.display = 'block'
  })

 removeHangman()
  newGameContainer.classList.remove("hide");
};

const displayLetters = (letterElement, userInputElement, optionValue, spanClass) => {
  letterElement.classList.remove("hide");
  userInputElement.innerText = "";
  let optionArray = options[optionValue];
  if(displayLettersCount === 0){
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  }
  chosenWord = chosenWord.toUpperCase();
  let displayItem = chosenWord.replace(/./g, `<span class="${spanClass}">_</span>`) //regex pattern /./g replacing the dot
  userInputElement.innerHTML = displayItem;
  displayLettersCount++
}

//Word Generator
const generateWord = (optionValue) => {
  if(player2Btn.classList.contains('mode2')){ //displays letters for player 2 container
    container2.style.display = 'block'
    displayLetters(letterContainer2, userInputSection2, optionValue, 'dashes2') 
    category.textContent = `CATEGORY: ${optionValue}`
    category.style.display ='block'               
  }
  let optionsButtons = document.querySelectorAll(".options");
  let headers = document.querySelectorAll('h3')
  headers.forEach(elemH => elemH.style.display='none')
  //If optionValue matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue.toLowerCase()) {
      button.classList.add("active");
      optionsContainer.classList.add('active')
      const buttonDivs = document.querySelector('.center')
      buttonDivs.classList.add('active')
    }
    button.disabled = true;
  });

  displayLetters(letterContainer, userInputSection, optionValue, 'dashes') //displays letters for Player 1 container
};
const correctAnswer = (charArray, dashes, button, event) => {
  charArray.forEach((char, index) => {
    //if character in array is same as clicked button
    if (char === button.innerText) {
      //replace dash with letter
      dashes[index].innerText = char;
      //increment counter
      if (event.target.className === 'letters1'){
        winCount2 += 1;
        //if winCount equals word length
        if (winCount2 == charArray.length) {
          resultText.innerHTML = `<h2 class='win-msg'>Player 2 Wins!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          //block all buttons
          blocker();
        }
      }else{
        winCount += 1;
      //if winCount equals word length
      if (winCount == charArray.length) {
        resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
        //block all buttons
        blocker();
      }
      }
      
    }
  });
}

const wrongAnswer = (event, chosenWord) => {
  if(event.target.className === 'letters1'){
    count2 += 1
    drawMan(count2, event);
    //Count==6 because head,body,left arm, right arm,left leg,right leg
  if (count2 == 6) {
    resultText.innerHTML = `<h2 class='lose-msg'>Player 2 Lost!!</h2><p>The word was <span>${chosenWord}</span></p>`;
    blocker();
  }
  }else{
    count += 1
    drawMan(count, event);
    //Count==6 because head,body,left arm, right arm,left leg,right leg
  if (count == 6) {
    resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
    blocker();
  }
  }
}


const createLetters = (letterContainer, buttonClass, spanClasses) => {
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add(buttonClass);
    //[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", (e) => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName(spanClasses);
      //if array contains clicked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        correctAnswer(charArray, dashes, button, e)       
      } else {
        //lose count
        wrongAnswer(e, chosenWord)
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }
}
//Initial Function (Called when page loads/user presses new game)
const initializer = (userInputSection, optionsContainer, letterContainer, shouldRunAgain, buttonClass, spanClasses) => {
  winCount = 0;
  winCount2 = 0;
  count = 0;
  count2 = 0;

  //Initially erase all content and hide letters and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
 createLetters(letterContainer, buttonClass, spanClasses)

  displayOptions(shouldRunAgain);
};

const drawForSecondContainer = (event, bodyPart) => {
  if(event.target.className === 'letters1'){
    bodyPart.style.display = 'block'
    return true
  } 
  return false
}

//Canvas
const buildHangman = (event) => {
  const head = () => {
    if(drawForSecondContainer(event, hangmanHead1)) return 
    hangmanHead.style.display = 'block'
  };

  const body = () => {
    if(drawForSecondContainer(event, hangmanBody1)) return 
   hangmanBody.style.display = 'block'
  };

  const leftArm = () => {
    if(drawForSecondContainer(event, hangmanLeftArm1)) return 
    hangmanLeftArm.style.display = 'block'
  };

  const rightArm = () => {
    if(drawForSecondContainer(event, hangmanRightArm1)) return 
    hangmanRightArm.style.display = 'block'
  };

  const leftLeg = () => {
    if(drawForSecondContainer(event, hangmanLeftLeg1)) return 
    hangmanLeftLeg.style.display = 'block'
  };

  const rightLeg = () => {
    if(drawForSecondContainer(event, hangmanRightLeg1)) return 
    hangmanRightLeg.style.display = 'block'
  };

  return { head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count, event) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = buildHangman(event);
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click",() => {
  initializer(userInputSection, optionsContainer, letterContainer, false, 'letters', 'dashes')
  initializer(userInputSection2, optionsContainer2, letterContainer2, true, 'letters1', 'dashes2')
});
window.onload = initializer(userInputSection, optionsContainer, letterContainer, false, 'letters', 'dashes');
window.onload = initializer(userInputSection2, optionsContainer2, letterContainer2, true, 'letters1', 'dashes2')

