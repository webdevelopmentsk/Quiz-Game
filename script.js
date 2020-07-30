let quizData = {
    type:{
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
        'Cities':{
            q1:{
                question: 'Which city does not have an obelisk?',
                choices:['Rome', 'Ulaanbataar', 'London', 'Cairo'],
                corectIdx: 1
            },
            q2:{
                question: 'In what city was the first skyscraper built?',
                choices:['Durban', 'London', 'Hong Kong', 'Chicago'],
                corectIdx: 3
            },
            q3:{
                question: 'What city is well known for its Carnival?',
                choices:['Khartoum', 'Rio de Janeiro', 'Kiev', 'Colombo'],
                corectIdx: 1
            },
            q4:{
                question: 'What Mexican port is famous for its cliff divers?',
                choices:['Tijuana', 'Acapulco', 'Managua', 'Tampico'],
                corectIdx: 1
            },
            q5:{
                question: 'At the heart of which city can a commons be found?',
                choices:['Trenton', 'Philadelphia', 'New York City', 'Boston'],
                corectIdx: 3
            },
            q6:{
                question: 'What is the only major world capital named after a religion?',
                choices:['Christiansted', 'Christiansburg', 'Seoul', 'Islamabad'],
                corectIdx: 3
            },
            q7:{
                question: 'What is the largest city in Turkey?',
                choices:['Adana', 'Damascus', 'Istanbul', 'Ankara'],
                corectIdx: 2
            },
            q8:{
                question: 'What is the citadel of Moscow called?',
                choices:['Ginza', 'Tiananmen Square', 'Empire State Building', 'Kremlin'],
                corectIdx: 3
            },
            q9:{
                question: 'Which Indian city is famed for its clock tower?',
                choices:['Delhi', 'Kolkata', 'Pune', 'Mumbai'],
                corectIdx: 3
            },
            q10:{
                question: 'Where might one find the city of Tunis?',
                choices:['Tunisia', 'Algeria', 'Egypt', 'Kenya'],
                corectIdx: 0
            }
        },
        'Countries by Pictures':{
            q1: {
                question: 'Guess the countries that are depicted in these images.',
                choices:['Russia','Japan','Norway','Sweden'],
                corectIdx: 3,
                img: 'img/sweden.jpg'
            },
            q2: {
                question: 'Guess the countries that are depicted in these images.',
                choices:['Taiwan','Japan','South Korea','China'],
                corectIdx: 0,
                img: 'img/taiwan.jpg'
            },
            q3: {
                question: 'Guess the countries that are depicted in these images.',
                choices:['Japan','South Korea','China','Taiwan'],
                corectIdx: 1,
                img: 'img/southKorea.jpg'
            },
            q4: {
                question: 'Guess the countries that are depicted in these images.',
                choices:['Portugal','U.S.A','England','Australia'],
                corectIdx: 3,
                img: 'img/australia.jpg'
            },
            q5: {
                question: 'Guess the countries that are depicted in these images.',
                choices:['Slovakia','Russia','Serbia','Hungary'],
                corectIdx: 1,
                img: 'img/russia.jpg'
            },
            q6: {
                question: 'Guess the countries that are depicted in these images.',
                choices:['Czech Republic','Austria','Estonia','Germany'],
                corectIdx: 0,
                img: 'img/czechRepublic.jpg'
            },
        }
    },
    score: 0,
    playingQuizArr: [],
    resetGame:()=>{
        quizData.score = 0;
        quizData.playingQuizArr = [];
    },
    quizType:()=>{
        let types=[];
        for(let type in quizData.type){
            types.push(type);
        }
        return types;
    },
    generateNewQuizArr: (type)=>{
        Object.keys(quizData.type[type]).forEach(key => quizData.playingQuizArr.push(key));
    },
    getAnswer: (qCorrectIdx, AnswerIndex,qIndexInArr) =>{
        let result;
        //check result and update score
        if(qCorrectIdx==AnswerIndex){
            result= true; quizData.score++;
        }else{
            result= false;
        }
        //remove displayed question in the playinglist
        quizData.playingQuizArr.splice(qIndexInArr,1);
        //return result text
        return result;
    },
    updateScore: (correct)=>{
        if(correct) {quizData.score++;}
        if(correct==0) {quizData.score = 0;}
        return quizData.score;
    },
};


let UIController = (function() {
    let DOMstring ={
        type: document.getElementById('types'),
        score: document.querySelector('.score__text'),
        result: document.querySelector('.result'),
        question: document.querySelector('.question__text'),
        choices: document.querySelector('.choices'),
        newGame: document.querySelector('.newGame'),
        clearUI:document.querySelectorAll('.question__text','.result')
    }
    return{
        clearUI: function(){
            DOMstring.question.textContent = "";
            DOMstring.result.textContent = "";
            DOMstring.choices.innerHTML = "";
            if(quizData.score ==0){DOMstring.score.textContent = "Current Score : 0";}
        },
        displayNextQuiz: (type) => {
            if(quizData.playingQuizArr.length > 0){
                let n = Math.floor(Math.random()*quizData.playingQuizArr.length);
                //display question
                let q = quizData.type[type][quizData.playingQuizArr[n]];
                DOMstring.question.textContent = q.question;
                //display image(optional)
                if(q.img){
                    let newDiv = document.createElement('div');
                    newDiv.className = "image";
                    newDiv.style.backgroundImage = "url(" + q.img + ")";
                    DOMstring.question.appendChild(newDiv);
                }
                //display choices
                for(let i=0; i < q.choices.length;i++ )
                {
                    let text = q.choices[i];
                    let btn = document.createElement("BUTTON");
                    btn.id = i;
                    btn.innerHTML = text; 
                    btn.className= "btn-choice";
                    btn.addEventListener("click",function() {
                        let result = quizData.getAnswer(q.corectIdx,i,n);
                        if(result){
                            DOMstring.result.textContent = "Correct!";
                            btn.style.backgroundColor = "#98BF64";
                        }
                        else{
                            DOMstring.result.textContent = "Incorrect!";
                            btn.style.backgroundColor = "#CD5C5C";
                        }
                        DOMstring.score.textContent = "Current Score : " + quizData.score;
                        setTimeout(function(){
                            UIController.clearUI();
                            UIController.displayNextQuiz(type);
                        }
                        ,400)
                    });
                    DOMstring.choices.appendChild(btn);
                }
            }
            else{
                DOMstring.result.textContent = "Thank you for completing the quiz.";
                DOMstring.score.textContent = "Total Score : " + quizData.score;
            }
        },
        getDOMString: () => {
            return DOMstring;
        },
        addQuizTypes: () => {
            DOMstring.type.options.length = 0;
            let types = quizData.quizType();
            types.forEach(el => {
                let option = document.createElement("option");
                option.value = el;
                option.text = el;
                DOMstring.type.add(option);
            });
        }

    }
})();


let globalController = (function(UIController){

    let DOMstring = UIController.getDOMString();

    let eventListeners = () =>{
        DOMstring.newGame.addEventListener('click', globalController.init);
        DOMstring.type.addEventListener('change', function(){
            quizData.resetGame(); UIController.clearUI();
            let type = quizData.quizType()[DOMstring.type.selectedIndex];
            quizData.generateNewQuizArr(type);
            UIController.displayNextQuiz(type);
            eventListeners();
        });
    };
    return{
        init: () =>{
            quizData.resetGame();
            UIController.clearUI();
            UIController.addQuizTypes();
            let type = quizData.quizType()[DOMstring.type.selectedIndex];
            quizData.generateNewQuizArr(type);
            UIController.displayNextQuiz(type);
            eventListeners();
        }
    }
})(UIController);

globalController.init();
