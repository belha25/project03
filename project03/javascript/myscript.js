let questionNo = 1
let quizNo = 1
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#quiz-selector').onsubmit = function(){
      console.log("submitted")
      var quizChoice = document.querySelector('input[name="quiz"]:checked')
      quizNo = quizChoice.value;
      fetchQuizQuestion(quizNo, questionNo)
      document.querySelector("#holder").innerHTML="";
      return false;
     
    }
   
})
async function fetchQuizQuestion(quizNo, questionNo) {
    try{
        const api_endpoint = `https://my-json-server.typicode.com/belha25/project03/quiz${quizNo}/${questionNo}`;
        const response = await fetch(api_endpoint);
        const result = await response.json()
        console.log(result);
       if(result.type == "text"){
        textQuestionDisplay(result);
        document.querySelector('#submitanswer').onclick=handle_question
        
       }
       if(result.type=="narrative"){
        NarrativeQuestionDisplay(result);
        document.querySelector('#submitanswer').onclick=handle_question
   
        
       }
       if(result.type=="image"){
        ImageQuestionDisplay(result);
        document.querySelector('#submitanswer').onsubmit=handle_question
       
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

}
function handle_question(e){

  
    if (questionNo<5) {
        document.querySelector("#holder").innerHTML="";
        questionNo++
        fetchQuizQuestion(quizNo, questionNo);
    }
    else{
        questionNo = 1;
        endscreen();
    }

}
function endscreen(score){

}
function scorekeeper(answer){
    let correct = 0;
    if (answer == correctAnswer){
      correct++;  
    }
    let score = correct/5;
}