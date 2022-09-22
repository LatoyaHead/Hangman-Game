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
const resultText = document.getElementById('result-text')


player1Btn.addEventListener('click', function(){
  let player1 = document.getElementById('player1Btn')
  player1.classList.add('active')
})
player2Btn.addEventListener('click', function(){
  let player2 = document.getElementById('player2Btn')
  player2.classList.add('active')
})

//Options value for buttons
let options = {
  Fruits: ["Apple", "Oranges", "Bananas", "Watermelon", "Pineapple", "Grapes"],
  Vegetables: ["Broccoli", "Carrot", "Avocado", "Cabbage", "Celery", "Corn", "Zucchini", "Radish", "Cauliflower", "Turnip", "Tomato"],
  Animals: ["Cat", "Dog", "Fish", "Wolf", "Rabbit", "Snake", "Deer", "Lion", "Turtle"]
}

//Count
let winCount = 0
let count = 0
let chosenWord = ""

//Display option buttons
const displayOptions = () => {
  player2Btn.disabled = false
  player1Btn.disabled = false
  optionsContainer.innerHTML += `<h3>Select A Category</h3>`;
  let buttonCon = document.createElement("div");
  buttonCon.classList.add('center')
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");

  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });

  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
  console.log(optionValue);
  let optionsButtons = document.querySelectorAll(".options");
  let h = document.querySelectorAll('h3')
  h.forEach(elemH => elemH.style.display='none')
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

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letters and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clicked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word length
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  let { initialDrawing } = buildHangman();
  //initialDrawing would draw the frame
  initialDrawing();
};

//Canvas
const buildHangman = () => {
  // let context = canvas.getContext("2d");
  // context.beginPath();
  // context.strokeStyle = "#000";
  // context.lineWidth = 2;

  // //For drawing lines
  // const drawLine = (fromX, fromY, toX, toY) => {
  //   context.moveTo(fromX, fromY);
  //   context.lineTo(toX, toY);
  //   context.stroke();
  // };

  const head = () => {
    // context.beginPath();
    // context.arc(70, 30, 10, 0, Math.PI * 2, true);
    // context.stroke();
    
    hangmanHead.style.display = 'block'
  };

  const body = () => {
   hangmanBody.style.display = 'block'
  };

  const leftArm = () => {
    hangmanLeftArm.style.display = 'block'
  };

  const rightArm = () => {
    hangmanRightArm.style.display = 'block'
  };

  const leftLeg = () => {
    hangmanLeftLeg.style.display = 'block'
  };

  const rightLeg = () => {
    hangmanRightLeg.style.display = 'block'
  };

  //initial frame
  const initialDrawing = () => {
    // //clear canvas
    // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // //bottom line
    // drawLine(10, 130, 130, 130);
    // //left line
    // drawLine(10, 10, 10, 131);
    // //top line
    // drawLine(10, 10, 70, 10);
    // //small top line
    // drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = buildHangman();
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
newGameButton.addEventListener("click", initializer);
window.onload = initializer;


