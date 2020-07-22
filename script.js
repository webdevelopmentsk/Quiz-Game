//Function Constructor of the questions
function Quiz(question,choices,correctIndex){
    this.question = question;
    this.choices = choices;
    this.correctIndex = correctIndex;
}
//Instances of Quiz function
let q1 = new Quiz ('What is the most common colour of toilet paper in France?',['Pink', 'Blue', 'White', 'Red'], 0);
let q2 = new Quiz('The average person does what thirteen times a day?',['Yawns','Laughs','Smiles','Jumps'],1);
let q3 = new Quiz('Coprastastaphobia is the fear of what?',['Heights','Flying','Constipation','Spiders'],2);
let q4 = new Quiz('It\'s illegal in Texas to put what on your neighbour’s Cow?',['Marshmallows','Candy','Sprinkles','Grafitti'],3);
let q5 = new Quiz('Native to the Caribbean, what sort of animal is the mountain chicken?',['Bird','Dog','Bear','Frog','Snake','Bat'],3);
let q6 = new Quiz('True or false: You can sneeze in your sleep',['True','False'],1);
let q7 = new Quiz('Which European country has 158 verses to its national anthem?',['Germay','Greece','Italy','Spain'],1);
let q8 = new Quiz('What is Scooby Doo’s full name?',['Scot Doo Doo','Albert Scoob Doo','Scoobert Doo','Scoobert Doo Doo'],2);
let q9 = new Quiz('Where was the fortune cookie invented?',['Beijing','Tokyo','Budapest','San Francisco'],3);
let q10 = new Quiz('Which country has the most tornadoes by area?',['England','Greece','USA','Japan'],0);
//Variables
let originQuizList = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10];
let quizlist =[];
let callBack = updateScoreCount();
let checkQuizIndex;

let scoreHTML = document.querySelector('.score__text');
let resultHTML =  document.querySelector('.result');
let questionHTML = document.querySelector('.question__text');

//Prototype Methods of Quiz function
Quiz.prototype.displayQuiz = function(){
    
    questionHTML.textContent = this.question;
    
    //Generate Button for Each choice
    for(let i=0; i < this.choices.length; i++){
        let listchoices = document.getElementById("choices");

        let text = this.choices[i];
        let btn = document.createElement("BUTTON");
        btn.id = i;
        btn.innerHTML = text; 
        btn.className= "btn-choice";

        btn.addEventListener("click", function() {
            let index = checkQuizIndex(true);
            let answerIndex = i;
            quizlist[index].checkAnswerUpdateScore(answerIndex,callBack);
        })
        listchoices.appendChild(btn);
    }
}

Quiz.prototype.checkAnswerUpdateScore = function(answerIndex,callBack){

    let sc;
    if(answerIndex == this.correctIndex){
        resultHTML.textContent = "Correct!"; sc = callBack(true);
    }
    else{
        resultHTML.textContent = "Incorrect!";sc = callBack(false);
    }
    scoreHTML.textContent = "Current Score : " + sc;
    setTimeout(function(){resultHTML.textContent = ""; showNextQuiz();},500);
    
    //remove the selected question from the quiz list
    var delIndex = checkQuizIndex(true);
    quizlist.splice(delIndex,1);
}

function updateScoreCount(){
    let currentScore=0;
    return function(correct){
        if(correct){currentScore++;}
        return currentScore;
    }
}

function quizIndex(index){
    let i = index;
    return function(correct){
        if(correct){
            return i;
        }
    }    
}

function init(){
    scoreHTML.textContent = "Current Score : 0 ";
    resultHTML.textContent = "";
    //clone the quiz array 
    for (i = 0; i < originQuizList.length; i++) {
        quizlist.push(originQuizList[i]);
    }
    showNextQuiz();
}

function showNextQuiz(){
    //clear the previous quiz
    let choices = document.getElementById('choices');
    choices.innerHTML = '';

    if(quizlist.length > 0){
        let n = Math.floor(Math.random()*quizlist.length);

        quizlist[n].displayQuiz();
        checkQuizIndex = quizIndex(n);
    }
    else{
        resultHTML.textContent = "Thank you for completing the quiz.";
        scoreHTML.textContent = "Total Score : " + callBack(true);
        questionHTML.textContent = '';
    }
}

document.getElementById('newGame').addEventListener('click',function(){init();});

init();


