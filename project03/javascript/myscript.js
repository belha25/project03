document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#quiz-selector').onsubmit = function(){
      console.log("submitted")
      var quizChoice = document.querySelector('input[name="quiz"]:checked')
      let quizNo = quizChoice.value;
      let questionNo = 1
      fetchQuizQuestion(quizNo, questionNo)
      document.querySelector("#holder").innerHTML="";
      return false;
     
    }
   
})
async function fetchQuizQuestion(quizNo, questionNo) {
    try{
        const api_endpoint = `https://my-json-server.typicode.com/belha25/project03/quiz${quizNo}.${questionNo}`;
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
function NarrativeQuestionDisplay(){
    
}
function ImageQuestionDisplay(){

}
function handle_question(e){
  
    if (questionNo<5) {
        questionNo++
        fetchQuizQuestion(quizNo, questionNo)
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