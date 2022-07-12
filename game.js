
var buttonColours =["red", "blue", "green", "yellow"]

var gamePattern = [];
var audio;
var userClickedPattern = [];
var started = false;
var level =0;

// keyboaed press
$(document).keypress(function(){
    if(!started){
        $('#level-title').text('Level '+level);
        //console.log("------"+checkStartedorNot);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function (){
    //var userChosenColour = this.id;
    //same
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);  
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    //console.log(userClickedPattern.length);

});


function nextSequence() {

    userClickedPattern = [];

   level++;
   $('h1').text('Level '+level);

   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   
   gamePattern.push(randomChosenColour);
    // console.log('randomChosenColour push '+randomChosenColour);
    // console.log('Game Pattern pushing: ' + gamePattern);

   $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   
}



//---playing sound
function playSound(name) {
    audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour){

    // ---Adding and removing class after delay
    $("#"+currentColour).addClass('pressed');
    setTimeout(function() {
        $("#"+currentColour).removeClass('pressed');
    }, 100);

}



// checking answer function
function checkAnswer(currentLevel) {
 if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log('success');

   if(userClickedPattern.length === gamePattern.length){
        setTimeout(function() {
         nextSequence();    
        }, 1000);
        console.log('inside inner if');
   }
 }   else{
    //wrong answer
    
    playSound('wrong');

    $('body').addClass('game-over');
    setInterval(function(){
        $('body').removeClass('game-over');
    },500)
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
 }

}

function startOver(){
   level =0;
   gamePattern = [];
   started = false;
}