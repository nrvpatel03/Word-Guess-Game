
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
//letter match, function that takes user letter, finds all indexes of the letter in the word
function letterMatch(userKey,randomWord){
    var indexes = [];
    for (var i = 0; i<randomWord.length; i++){
        if(randomWord[i] === userKey){
            indexes.push(i);
        }
    }
    return indexes;
}
function replaceChar(userKey,indexes,wordSpace){
    var splitArr = wordSpace.split(" ");
    for(var i = 0; i<indexes.length; i++){
        splitArr.splice(indexes[i],1,userKey);
    }
    return splitArr.join(" ");
}

// push button to start the game! space bar
var wins = 0;
var numGuesses = 20;
var randomWord = "";
var lettersGuessed = "";

//start game setup everything
document.onkeyup = function(event){
    var keyPressed = event.key;
    if(keyPressed === " "){
        randomWord=genRandoWord(genWords);
        document.getElementById("wordSpaces").innerHTML = makeSpaces(randomWord);
        document.getElementById("numWins").innerHTML = "Wins: " + wins;
        document.getElementById("numGuessRem").innerHTML = "Number of Guesses Remaining: " + numGuesses;
    }
}
//guess letters
document.onkeydown = function(event){
    var userKey = event.key;
    var indexes = letterMatch(userKey,randomWord);
    if(indexes.length>0){
        //there is a match
        document.getElementById("wordSpaces").innerHTML = replaceChar(userKey,indexes, document.getElementById("wordSpaces").innerHTML);
        numGuesses -=1;
        document.getElementById("numGuessRem").innerHTML = "Number of Guesses Remaining: " + numGuesses;
        if(numGuesses>0){
            //win
            wins++;
            console.log();
            document.getElementById("numWins").innerHTML = "Wins: " + wins;
            numGuesses = 20;
            document.getElementById("wordSpaces").innerHTML = "You WIN! Press Spacebar for a new word";
            lettersGuessed = "";
            document.getElementById("lettersGuessed").innerHTML = "Letters Guessed " + lettersGuessed;
        }else if(numGuesses<=0){
            //lose
            document.getElementById("wordSpaces").innerHTML = "Sorry you lose";
            numGuesses = 20;
            lettersGuessed = "";
            document.getElementById("lettersGuessed").innerHTML = "Letters Guessed " + lettersGuessed;
        }
    }else{
        //there isnt a match
        lettersGuessed += userKey;
        document.getElementById("lettersGuessed").innerHTML = "Letters Guessed " + lettersGuessed;
        numGuesses -=1;
        document.getElementById("numGuessRem").innerHTML = "Number of Guesses Remaining: " + numGuesses;
        if(numGuesses<=0){
            //lose
            document.getElementById("wordSpaces").innerHTML = "Sorry you lose";
            numGuesses = 20;
            lettersGuessed = "";
            document.getElementById("lettersGuessed").innerHTML = "Letters Guessed " + lettersGuessed;
        }
    }

    
    
}
console.log(makeSpaces(randomWord));
console.log(randomWord);
console.log(letterMatch("a",randomWord));
console.log(replaceChar("a",letterMatch("a",randomWord),makeSpaces(randomWord)));

