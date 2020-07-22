function Quiz(question,choices,correctIndex){
    this.question = question;
    this.choices = choices;
    this.correctIndex = correctIndex;
}

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




Quiz.prototype.displayQuiz = function(){
    document.querySelector('.question__text').textContent = this.question;
    
    //Generate Radio Button for Each choice
    for(let i=0; i < this.choices.length; i++){
        let listchoices = document.getElementById("choices");

            let text = this.choices[i];
            let btn = document.createElement("BUTTON");
            btn.id = i;
            btn.innerHTML = text;
            btn.setAttribute("value", text);
            btn.setAttribute("text",text);
            btn.className= "btn-choice";

            btn.addEventListener("click", function() {

                let index = checkQuizIndex(true);
                let answerIndex = i;
                quizlist[index].checkAnswerUpdateScore(answerIndex,passUpdateScore);
            })

            btn.style.backgroundColor = "#FBEEC1;"
            btn.style.borderRadius ="3px";
            btn.style.border = "1px solid #FBEEC1";
            btn.style.cursor ="pointer";
            btn.style.color = "#8D8741";
            btn.style.fontFamily ="Montserrat";
            btn.style.fontSize = "1rem";
            btn.style.padding = "0.7rem 0.7rem";
            btn.style.display = "block";
            btn.style.marginBottom = "0.8rem";
            btn.style.width ="40%";

            listchoices.appendChild(btn);
    }
}

Quiz.prototype.checkAnswerUpdateScore = function(answerIndex,passUpdateScore){

    let updatedSc;
    if(answerIndex == this.correctIndex){
        document.querySelector('.result').textContent = "Correct!";
        updatedSc = passUpdateScore(true);
    }
    else
    {
        document.querySelector('.result').textContent = "Incorrect!";
        updatedSc = passUpdateScore(false);
    }
    
    document.querySelector('.score__text').textContent = "Current Score : " + updatedSc;

    setTimeout(function(){
        document.querySelector('.result').textContent = "";
        showNextQuiz();
    },1000);
    
}

function updateScore(){
    let currentScore=0;
    return function(correct){
        if(correct){currentScore++;}
        return currentScore;
    }

}

let quizlist = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10];
let passUpdateScore = updateScore();
let checkQuizIndex;

function quizIndex(index){
    let i = index;
    return function(correct){
        if(correct){
            return i;
        }
    }    
}

function init(){
    document.querySelector('.score__text').textContent = "Current Score : 0 ";
    document.querySelector('.result').textContent = "";
    showNextQuiz();
}

function showNextQuiz(){
    //clear the previous quiz
    let choices = document.getElementById('choices');
    choices.innerHTML = '';

    let n = Math.floor(Math.random()*quizlist.length);
    quizlist[n].displayQuiz();
    checkQuizIndex = quizIndex(n);
}

init();

document.getElementById('newGame').addEventListener('click',function(){
    init();
});


