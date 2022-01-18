var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var blue = new Audio('sounds/blue.mp3');
var green = new Audio('sounds/green.mp3');
var red = new Audio('sounds/red.mp3');
var yellow = new Audio('sounds/yellow.mp3');
var wrong = new Audio('sounds/wrong.mp3');
var userClickedPattern = [];
var level = 0;
var started = false;
var userResponse = false;
var userClicks = 0;
// --------------------------------functions--------------------------
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    level++;
    $('h1').text('level ' + level);
}

function playSound(name) {
    switch (name) {
        case 'blue':
            blue.play();
            break;
        case 'green':
            green.play();
            break;
        case 'red':
            red.play();
            break;
        case 'yellow':
            yellow.play();
            break;
    }
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(a, b) {
    if ((Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]))) {
        setTimeout(function() {
            continueGame();
        }, 1000);
    } else {
        wrong.play();
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        });
        $('h1').text('Game Over, Press Any Key To Restart');
        startOver();
    }
}

function userSequence(evt) {
    var userChosenColor = evt;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userResponse = true;
    userClicks++;
    userResponse = true;
    if (userClicks === level) {
        checkAnswer(gamePattern, userClickedPattern);
    }
}

function continueGame() {
    nextSequence();
    userClickedPattern = [];
    userClicks = 0;
}

function startOver() {
    level = 0;
    userClicks = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

// ---------------------logic---------------------------------------
$(document).keydown(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});

$('.btn').click(function(event) {
    userSequence(event.target.id);
});