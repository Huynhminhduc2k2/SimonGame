// 10. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

// 5. At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

// 3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ['red', 'blue', 'green', 'yellow'];

//. 13. Create a new variable called level and start at level 0.
var level = 0;

var isStart = false;
$(document).keypress(function () {
  if (!isStart) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    isStart = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text('Game Over, Press Any Key to Restart');

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  isStart = false;
}

function nextSequence() {
  // 14. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  // 15. Inside nextSequence(), update the h1 with this change in the value of level.
  $('#level-title').text('Level ' + level);

  // 2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.round(Math.random() * 3);

  //   4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  //   6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  //   7. Use jQuery to select the button with the same id as the randomChosenColour
  $('#' + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  //   // 8. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  //   var audio = new Audio('./sounds/' + randomChosenColour + '.mp3');
  //   audio.play();

  playSound(randomChosenColour);
}

//   9. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
//   Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
$('.btn').click(function () {
  var userChosenColour = this.id;

  //  11. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  //   var audioUserPattern = new Audio('./sounds/' + userChosenColour + '.mp3');
  //   audioUserPattern.play();
  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// 12. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
  var audio = new Audio('./sounds/' + name + '.mp3');
  audio.play();
}

// 13. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');

  setTimeout(function () {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}
