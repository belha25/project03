document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#quiz-selector').onsubmit = function(){
      console.log("submitted")
      let quizNo = document.getElementsByName("quiz").value
      let questionNo = 1
      fetchQuizQuestion(quizNo, questionNo)
      return false;
     
    }
   
})
async function fetchQuizQuestion(quizNo, questionNo) {
    try{
        const api_endpoint = `https://my-json-server.typicode.com/belha25/project03/quiz${quizNo}/${questionNo}`;
        const response = await fetch(api_endpoint);
        const result = await response.json()
        console.log(result);
        questionDisplay(result, quizNo, questionNo);
    }
    catch(err){
        console.error(err);
    }
}
function questionDisplay(){
    //get question no
    //get type
    //get text
    //get answers
    //display them (create html items?)
    //create li for each answer
    //flag answer as correct one
    //when submitted, pass call to handle question
}

function handle_question(e){
    //get answer
    //send to scorekeeper
    //increase question number if question number is not 5
    if (questionNo <5) {
        questionNo++
        fetchQuizQuestion(quizNo, questionNo)
    }

}

function scorekeeper(answer){
    var correct
    var score
    if (answer = correctAnswer){
      correct++;  
    }
    score = correct/5;
}