
//utilities
//generate random word for game
function genRandoWord(genWordsArr){
    return genWordsArr[Math.floor(Math.random() * (genWordsArr.length - 1))];
};
// //take that word and count the number of letters then generate that number of spaces
function makeSpaces(randoWord){
    var numSpaces = randoWord.length;
    var spaceHtml = [];
    for(var i = 0; i<numSpaces; i++){
        spaceHtml.push("_ ");
    }
    var result = spaceHtml.join("");
    return result;
};
//array of random words
var genWords = ["apple", "broccoli", "carrot", "corn", "banana", "strawberry", "orange", "spinach",
    "asparagus", "mushroom", "watermelon", "pineapple", "cabbage", "tomato", "avocado",
    "peach", "kiwi", "mango", "cauliflower", "celery"
];
//letter match, function that takes user letter, finds the index of the letter in the word and
//change that space to a letter. if not (index of = -1) take away num guesses


// push button to start the game! space bar
var wins = 0;
var loss = 0;
var numGuesses = 20;
var randomWord = genRandoWord(genWords);

//start game setup everything
document.onkeyup = function(event){
    var keyPressed = event.key;
    if(keyPressed === " "){
        document.getElementById("wordSpaces").innerHTML = makeSpaces(randomWord);
        document.getElementById("numWins").innerHTML = "Wins: " + wins + " Loss: " + loss;
        document.getElementById("numGuessRem").innerHTML = "Number of Guesses Remaining: " + 20;
    }
}
//guess letters
document.onkeydown = function(event){
    
}
console.log(makeSpaces(randomWord));
console.log(randomWord);

