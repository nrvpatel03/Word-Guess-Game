
//utilities

//generate random word for game
function genRandoWord(genWordsArr){
    return genWordsArr[Math.floor(Math.random() * (genWordsArr.length - 1))];
};

// take that word and count the number of letters then generate that number of spaces
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
//letter match, function that takes user letter, finds all indexes of the letter in the word returns
//an array of those indexes where it matches the word.
function letterMatch(userKey,randomWord){
    var indexes = [];
    for (var i = 0; i<randomWord.length; i++){
        if(randomWord[i] === userKey){
            indexes.push(i);
        }
    }
    return indexes;
}
//replace char takes the array of indexes, user key and string of blank spaces ("_ _ _")
//and replaces the blank spaces with letters at the indexes where it matches the user key.
function replaceChar(userKey,indexes,wordSpace){
    var splitArr = wordSpace.split(" ");
    for(var i = 0; i<indexes.length; i++){
        splitArr.splice(indexes[i],1,userKey);
    }
    return splitArr.join(" ");
}

// push button to start the game! space bar
//number of wins is 0 guesses is 0 winArr is empty right now.
//winArr is an array to check if the user has entered all the characters that belong in the random
//word
var wins = 0;
var numGuesses = 20;
var randomWord = "";
var winArr = [];

//start game setup everything by pressing space bar. Generate a random word and set guesses to 20.
//change html appropriately.
document.onkeyup = function(event){
    var keyPressed = event.key;
    if(keyPressed === " "){
        randomWord=genRandoWord(genWords);
        numGuesses = 20;
        lettersGuessed = "";
        winArr=[];
        document.getElementById("wordSpaces").innerHTML = makeSpaces(randomWord);
        document.getElementById("numWins").innerHTML = "Wins: " + wins;
        document.getElementById("numGuessRem").innerHTML = "Number of Guesses Remaining: " + numGuesses;
        document.getElementById("lettersGuessed").innerHTML = "Letters Guessed " + lettersGuessed;
        document.getElementById("winpic").innerHTML = "";
        alert("Please only Type Letters, Press SpaceBar for a new Word");
    }
}

//guess letters, take user input from key
document.onkeydown = function(event){
    var userKey = event.key.toLowerCase();
    //use letter match to get indexes array from the user key entered.
    var indexes = letterMatch(userKey,randomWord);
    if(indexes.length>0){
        //there is a match because there is something in the indexes array.
        if(winArr.indexOf(userKey) === -1){
            //if the winArray does not have this user key yet, add it to the win array,
            //the number of times it is in the index
        for(var i = 0; i<indexes.length;i++){
            winArr.push(userKey);
        }}
        //change word string "_ _ _" with replace char in html and take num guesses -1
        document.getElementById("wordSpaces").innerHTML = replaceChar(userKey,indexes, document.getElementById("wordSpaces").innerHTML);
        numGuesses -=1;
        document.getElementById("numGuessRem").innerHTML = "Number of Guesses Remaining: " + numGuesses;
        if(numGuesses>0 && winArr.length === randomWord.length){
            //win because win arr length has the same length as the random word string, meaning,
            //user guessed all the letters.
            wins++;
            //change html appropriately for a new game.
            document.getElementById("numWins").innerHTML = "Wins: " + wins;
            numGuesses = 20;
            document.getElementById("wordSpaces").innerHTML = "You WIN! Press Spacebar for a new word";
            document.getElementById("lettersGuessed").innerHTML = "The word is: " + randomWord;
            winArr=[];
            //play audio for winning, show picture bonus!
            document.getElementById("winpic").innerHTML = "<img src=\"assets/images/" + randomWord + ".jpg\" height = \"150px\" width = \"150px\">";
        }else if(numGuesses<0){
            //lose
            document.getElementById("wordSpaces").innerHTML = "Sorry you lose Press Spacebar for a new word";
            numGuesses = 20;
            lettersGuessed = "";
            document.getElementById("lettersGuessed").innerHTML = "The word was: " + randomWord;
            winArr=[];
        }
    }else{
        //there isnt a match
        lettersGuessed += userKey;
        document.getElementById("lettersGuessed").innerHTML = "Letters Guessed " + lettersGuessed;
        numGuesses -=1;
        document.getElementById("numGuessRem").innerHTML = "Number of Guesses Remaining: " + numGuesses;
        if(numGuesses<0){
            //lose
            document.getElementById("wordSpaces").innerHTML = "Sorry you lose press Spacebar for a new word";
            numGuesses = 20;
            lettersGuessed = "";
            document.getElementById("lettersGuessed").innerHTML = "The word was: " + randomWord;
            winArr=[];
        }
    }    
}
