let quizController = (function(){
        let quizData = {
            'Fun Quiz':{
                q1:{
                    question: 'What is the most common colour of toilet paper in France?',
                    choices:['Pink', 'Blue', 'White', 'Red'],
                    corectIdx: 0
                },
                q2:{
                    question: 'The average person does what thirteen times a day?',
                    choices: ['Yawns','Laughs','Smiles','Jumps'],
                    corectIdx: 1
                },
                q3:{
                    question: 'Coprastastaphobia is the fear of what?',
                    choices:['Heights','Flying','Constipation','Spiders'],
                    corectIdx: 2
                },
                q4:{
                    question: 'It\'s illegal in Texas to put what on your neighbour’s Cow?',
                    choices:['Marshmallows','Candy','Sprinkles','Grafitti'],
                    corectIdx: 3
                },
                q5:{
                    question: 'Native to the Caribbean, what sort of animal is the mountain chicken?',
                    choices:['Bird','Dog','Bear','Frog','Snake','Bat'],
                    corectIdx: 3
                },
                q6:{
                    question: 'True or false: You can sneeze in your sleep?',
                    choices:['True','False'],
                    corectIdx: 1
                },
                q7:{
                    question: 'Which European country has 158 verses to its national anthem?',
                    choices:['Germay','Greece','Italy','Spain'],
                    corectIdx: 1
                },
                q8:{
                    question: 'What is Scooby Doo’s full name?',
                    choices:['Scot Doo Doo','Albert Scoob Doo','Scoobert Doo','Scoobert Doo Doo'],
                    corectIdx: 2
                },
                q9:{
                    question: 'Where was the fortune cookie invenindexted?',
                    choices:['Beijing','Tokyo','Budapest','San Francisco'],
                    corectIdx: 3
                },
                q10:{
                    question: 'Which country has the most tornadoes by area?',
                    choices:['England','Greece','USA','Japan'],
                    corectIdx: 0
                }
            },
            'Engineering':{
                q1:{
                    question: 'What is the most common colour of toilet paper in France?',
                    choices:['Pink', 'Blue', 'White', 'Red'],
                    corectIdx: 0
                },
                q2:{
                    question: 'The average person does what thirteen times a day?',
                    choices: ['Yawns','Laughs','Smiles','Jumps'],
                    corectIdx: 1
                },
                q3:{
                    question: 'Coprastastaphobia is the fear of what?',
                    choices:['Heights','Flying','Constipation','Spiders'],
                    corectIdx: 2
                },
                q4:{
                    question: 'It\'s illegal in Texas to put what on your neighbour’s Cow?',
                    choices:['Marshmallows','Candy','Sprinkles','Grafitti'],
                    corectIdx: 3
                },
                q5:{
                    question: 'Native to the Caribbean, what sort of animal is the mountain chicken?',
                    choices:['Bird','Dog','Bear','Frog','Snake','Bat'],
                    corectIdx: 3
                },
                q6:{
                    question: 'True or false: You can sneeze in your sleep?',
                    choices:['True','False'],
                    corectIdx: 1
                },
                q7:{
                    question: 'Which European country has 158 verses to its national anthem?',
                    choices:['Germay','Greece','Italy','Spain'],
                    corectIdx: 1
                },
                q8:{
                    question: 'What is Scooby Doo’s full name?',
                    choices:['Scot Doo Doo','Albert Scoob Doo','Scoobert Doo','Scoobert Doo Doo'],
                    corectIdx: 2
                },
                q9:{
                    question: 'Where was the fortune cookie invenindexted?',
                    choices:['Beijing','Tokyo','Budapest','San Francisco'],
                    corectIdx: 3
                },
                q10:{
                    question: 'Which country has the most tornadoes by area?',
                    choices:['England','Greece','USA','Japan'],
                    corectIdx: 0
                }
            },
            score: 0,
            playQuizArr: []
        }
        return {
            getQuizArr: () => {
                return quizData.playQuizArr;
            },
            delQuizInArr: (idx) => {
                quizData.playQuizArr.splice(idx,1);
            },
            getQuiz: (type,q) => {
                return{
                    question: quizData[type][q].question,
                    choices:quizData[type][q].choices,
                }
            },
            getAnswer: (type,q,inx) => {
                let result;
                if(quizData[type][q].corectIdx==inx){
                    result="Correct!"; quizData.score++;
                }else{
                    result="Incorrect!";
                }
                return result;
            },
            getScore: ()=>{
                return quizData.score;
            },
            getQuizList: (type) =>{
                quizData.playQuizArr = [];
                Object.keys(quizData[type]).forEach(key => quizData.playQuizArr.push(key));
            },
            updateScore: (correct) => {
                if(correct) {quizData.score++;}
                if(correct==0) {quizData.score = 0;}
                return quizData.score;
            }
        }
})();

let UIController = (function(quizCtrl){
        let stringsHTML ={
            type: document.getElementById('types'),
            score: document.querySelector('.score__text'),
            result: document.querySelector('.result'),
            question: document.querySelector('.question__text'),
            choices: document.querySelector('.choices'),
            newGame: document.querySelector('.newGame'),
        }
        return{
            returnStringHTmL: function(){
                let getStringHTML = stringsHTML;
                return getStringHTML;
            },
            displayNextQuiz: (type)=>{
                let qArr = quizCtrl.getQuizArr();
                console.log(qArr.length);
                if(qArr.length > 0){
                    let n = Math.floor(Math.random()*qArr.length);
                    let quizData = quizCtrl.getQuiz(type,qArr[n])
                    stringsHTML.question.textContent = quizData.question;
                    
                    for(let i=0; i < quizData.choices.length;i++ )
                    {
                        let text = quizData.choices[i];
                        let btn = document.createElement("BUTTON");
                        btn.id = i;
                        btn.innerHTML = text; 
                        btn.className= "btn-choice";
                        btn.addEventListener("click",function() {
                            stringsHTML.result.textContent = quizCtrl.getAnswer(type,qArr[n],i);
                            stringsHTML.score.textContent = "Current Score : " + quizCtrl.getScore();
                            setTimeout(function(){
                                UIController.clearUI();
                                quizCtrl.delQuizInArr(n);
                                UIController.displayNextQuiz(type);
                            }
                            ,500)
                        });
                        stringsHTML.choices.appendChild(btn);
                    }
                }
                else{
                    stringsHTML.result.textContent = "Thank you for completing the quiz.";
                    stringsHTML.score.textContent = "Total Score : " + quizCtrl.getScore();
                }
            },
            clearUI: () =>{
                if(quizCtrl.getScore()==0){
                    stringsHTML.score.textContent = "Current Score : 0";
                }
                stringsHTML.question.textContent = "";
                stringsHTML.result.textContent = "";
                stringsHTML.choices.innerHTML = "";
            }
         }
})(quizController);

let globalController = (function(quizCtrl,UICtrl){
    let type;
        let eventListeners = function(){
            document.getElementById('newGame').addEventListener('click', globalController.init);
        };

        return{
            init: () =>{
                quizController.updateScore(0);
                UICtrl.clearUI();
                type = document.getElementById('types')[document.getElementById('types').selectedIndex].value;
                quizArr = quizCtrl.getQuizList(type);
                UICtrl.displayNextQuiz(type);
                eventListeners();
            }
        }
})(quizController,UIController);


globalController.init();

