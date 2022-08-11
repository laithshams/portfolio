$("#level-title").text("Press A Key to Start");

var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequance() {
  //generate random number
  var n = Math.random();
  var n = n * 4;
  var randomNumber = Math.floor(n);
  //choose colour based on generated number and add it to the game pattern
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //animate selected colour for the user
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //play selected colour sound
  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").click(function() {
  //detect what button user has clicked
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  //play button colour sound
  playSound(userChosenColour);

  checkAns(userClickedPattern.length - 1);
});

function playSound(sound) {
  //play sound
  var audio = new Audio("sounds/" + sound + ".mp3")
  audio.play();
}

function animatePress(currentColour) {
  //animate pressed button
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {

  if(!started) {

    started = true;
    $("#level-title").text("Level " + level);
    nextSequance();
  }
});

function checkAns(currentLevel) {

  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (gamePattern.length == currentLevel + 1) {
      setTimeout(function () {
        nextSequance();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    started = false;
    $("#level-title").text("Game Over, Press Any Key to Restart");
  }
}
