let questionNo = 1;
let quizNo = 1;
let correct = 0;
let score=0;
let correctAnswer = "correctAnswer"
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#quiz-selector').onsubmit = function(){
      console.log("submitted")
      var quizChoice = document.querySelector('input[name="quiz"]:checked')
      quizNo = quizChoice.value;
      fetchQuizQuestion(quizNo, questionNo)
      document.querySelector("#holder").innerHTML="";
      return false;
     
    }
    document.querySelector("#holder").addEventListener("click", function(e){
        console.log("clicked")
        if(e.target.id=="submitanswer"){
            answer = document.querySelector('input[name="answer"]:checked')
            let currentScore = scorekeeper(answer.value);
            updateScore(questionNo, currentScore);
            handle_question();
        }
        if(e.target.id=="retake"){
            window.location.reload();
        }
    })
});

async function fetchQuizQuestion(quizNo, questionNo) {
    try{
        const api_endpoint = `https://my-json-server.typicode.com/belha25/project03/quiz${quizNo}/${questionNo}`;
        const response = await fetch(api_endpoint);
        const result = await response.json()
        console.log(result);
       if(result.type == "text"){

        textQuestionDisplay(result);

       }
       if(result.type=="narrative"){
        NarrativeQuestionDisplay(result);
   
        
       }
       if(result.type=="image"){
        ImageQuestionDisplay(result);
;
       
       }
    }
    catch(err){
        console.error(err);
    }
}
function textQuestionDisplay(result){
        const source = document.getElementById("text-question").innerHTML;
        const compile = Handlebars.compile(source);
        document.querySelector("#holder").innerHTML = compile(result);

}
function NarrativeQuestionDisplay(result){
    const source = document.getElementById("narrative-question").innerHTML;
    const compile = Handlebars.compile(source);
    document.querySelector("#holder").innerHTML = compile(result);
}
function ImageQuestionDisplay(result){
    const source = document.getElementById("image-question").innerHTML;
    const compile = Handlebars.compile(source);
    result.quizNo = quizNo;
    result.questionNo = questionNo;
    document.querySelector("#holder").innerHTML = compile(result)

}
function handle_question(e){
    if (questionNo<5) {
        document.querySelector("#holder").innerHTML="";
        questionNo++
        fetchQuizQuestion(quizNo, questionNo);
    }
    else{
        questionNo = 0;
        endscreen(score);
    }

}
function updateScore(questionNo, score){
    document.querySelector("#questionsanswered").innerHTML=`<td>${questionNo}</td>`;
    document.querySelector("#scorenum").innerHTML=`<td>${score}</td>`;
}
function endscreen(score){
    console.log("Score is" + score)
    let source = ""
    document.querySelector("#holder").innerHTML;
    if (score > .8){
        source = document.getElementById("end-screenPASS").innerHTML;
    }
    else{
        source = document.getElementById("end-screenFAIL").innerHTML;
    }
    const compile = Handlebars.compile(source);
    document.querySelector("#holder").innerHTML = compile({score});

}
function scorekeeper(answer){
    if (answer == correctAnswer){
      correct++;  
    }
    score = 100*(correct/5);
    return score;
}