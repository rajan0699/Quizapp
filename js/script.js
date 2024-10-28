const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-box ");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz-box");
const option_text = document.querySelector(".option-list");



const timecount = quiz_box.querySelector(".timer .time-sec");
const timeline = quiz_box.querySelector("header .timeline");
const timeoff = quiz_box.querySelector("header .time-text");

// start quiz button clicked{

start_btn.onclick = ()=>{
    info_box.classList.add("activeinfo");
}

// }
// exit quiz button clicked{

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeinfo");
}

// }

// continue quiz button clicked{

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeinfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    QuestionCounter(1);
    startTimer(15);
    startTimerline(0)
}

// }

//Getting QUEtions and option from array 

let quetion_count = 0 ;
let question_number =1;
let counter;
let counterline;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next-btn");
const result_box = document.querySelector(".result-box");
const Restart_quiz = result_box.querySelector(".buttons .restart");
const Quit_quiz = result_box.querySelector(".buttons .quit");

Restart_quiz.onclick = ()=>{
    
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    let quetion_count = 0 ;
    let question_number =1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(quetion_count);
    QuestionCounter(question_number);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterline);
    startTimerline(widthValue);
    next_btn.style.display = "none";
    timeoff.textContent = "Time Left";

}
Quit_quiz.onclick = ()=>{
    window.location.reload();
}

//if Next button clicked
next_btn.onclick = ( ) =>{
    if (quetion_count < questions.length-1) {
        quetion_count++;
        question_number++;
        showQuestions(quetion_count);
        QuestionCounter(question_number);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterline);
        startTimerline(widthValue);
        next_btn.style.display = "none";
        timeoff.textContent = "Time Left";

    }else{
        clearInterval(counter);
        clearInterval(counterline);
        console.log("Questions over");
        showResultBox();
    }
}

function showQuestions(index){
    const question_text = document.querySelector(".que-text");
    let question_tag = '<span>'+questions[index].no +". " + questions[index].question +'</span>';
    let option_tag = '<div class="options">'+ questions[index].option[0] +'<span></span></div>' +
    '<div class="options">'+ questions[index].option[1] +'<span></span></div>' +
    '<div class="options">'+ questions[index].option[2] +'<span></span></div>'+
                    '<div class="options">'+ questions[index].option[3] +'<span></span></div>';
                    
    question_text.innerHTML = question_tag;
    option_text.innerHTML = option_tag;

    const option = option_text.querySelectorAll(".options");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionsSelected(this)");
        
    }
}



let  tickIcon = ' <div class="icon tick"><i class="fas fa-check"></i></div>';
let  crossIcon = ' <div class="icon cross"><i class="fas fa-times"></i></div>';



function optionsSelected(answer){
    clearInterval(counter);
    clearInterval(counterline);

    let userAnswer = answer.textContent;
    let correctAnswer = questions[quetion_count].answer;
    let allOptions = option_text.children.length;
    if (userAnswer == correctAnswer) {
        userScore += 1;
        console.log(userScore)
        answer.classList.add("correct");
       console.log("Answer is correct"); 
       answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
       answer.insertAdjacentHTML("beforeend", crossIcon);

        // if answer is incorrect then  automatically select the correct answer

        for (let i = 0; i < allOptions; i++) {
            if (option_text.children[i].textContent == correctAnswer) {
            option_text.children[i].setAttribute("class", "options correct");
            option_text.children[i].insertAdjacentHTML("beforeend", tickIcon);
            

            }           
        }
    }


 //once user selected diabled
    for (let i = 0; i < allOptions; i++) {
        option_text.children[i].classList.add("disable");
    }
    next_btn.style.display = "block";
}

function QuestionCounter(index){
    const bottom_question_number = quiz_box.querySelector(".total-question");
    let totalQuestionstag= '<span><p>'+ index +'</p>of<p>'+questions.length +'</p>Questions</span>';
    
    bottom_question_number.innerHTML = totalQuestionstag;

}



// <------ timer -----------> 

function startTimer(time){
    counter =setInterval(timer, 1000)
    function timer(){
        timecount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timecount.textContent;
            timecount.textContent = "0"+ addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timecount.textContent = "00";
            timeoff.textContent = "Time off";

            let correctAnswer = questions[quetion_count].answer;
            let allOptions = option_text.children.length;
            for (let i = 0; i < allOptions; i++) {
                if (option_text.children[i].textContent == correctAnswer) {
                option_text.children[i].setAttribute("class", "options correct");
                option_text.children[i].insertAdjacentHTML("beforeend", tickIcon);
                
    
                }           
            }
            for (let i = 0; i < allOptions; i++) {
                option_text.children[i].classList.add("disable");
            }
            next_btn.style.display = "block";
        }
    }
}
// <------ timeline -----------> 

function startTimerline(time){
    counterline =setInterval(timer, 29); 
    function timer(){
        time += 1;
       timeline.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterline);
           
        }
    }
}

function showResultBox(){
    info_box.classList.remove("activeinfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score-text");
    if (userScore > 3) {
        let scoreTag = '<span>and &#128526; you got <p>'+ userScore +'</p> out of <p>'+questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    if (userScore > 1) {
        let scoreTag = '<span>and &#128526; you got <p>'+ userScore +'</p> out of <p>'+questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span>and nice! you got <p>'+ userScore +'</p> out of <p>'+questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }

}

