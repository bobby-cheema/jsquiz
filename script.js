// get elements
const startext = "Welcome to the quiz press atart to continue";
const questionEL = document.getElementById("questions");
const hiscoreEL = document.getElementById("hiscore");
const nextbtnEL = document.getElementById("next");
const startbtnEL = document.getElementById("start");
const answersEL = document.getElementById("answers");
const timerEL = document.getElementById("timer");
//const stageEL = document.getElementById("stage");
const scoreEL = document.getElementById("score");
//define variables
let isStart = false;

let hiscore = 0;
let totaltime = 0;
let stage = 0;
let thisscore = 0;
const updatescore = () => {
    thisscore++;
    scoreEL.textContent = `Current SCORE: ${thisscore}`;
};
//add event to buttons
startbtnEL.addEventListener("click", () => {
    console.log("Start Button pressed", isStart);
    if (isStart === true) {
        console.log("Already running");
        return;
    }

    starttimer();
    isStart = true;
    startbtnEL.setAttribute("hidden", true);
});

const questions = [{
        Q: "Why so JavaScript and Java have similar name? ",
        options: [
            "JavaScript is a stripped-down version of Java",
            "JavaScript's syntax is loosely based on Java's",
            "Joj They both originated on the island of Java",
        ],
        Ans: 1,
    },
    {
        Q: " When a user views a page containing a JavaScript program, which machine actually executes the script? ",
        options: ["The User's machine running a Web browser",
            "The Web server",
            "A central machine deep within Netscape's corporate offices",
            "None of the above"
        ],
        Ans: 2,
    },
    {
        Q: "fav sports ",
        options: ["cricket", "powerlifting", "nothing "],
        Ans: 1,
    },
    {
        Q: "fav color ",
        options: ["red ", "black", "white  ", "green"],
        Ans: 2,
    },
    {
        Q: "fav place ",
        options: ["nz", "australia", "canada "],
        Ans: 1,
    },
];
const ql = questions.length;

const nextquestion = () => {
    console.log(` stage= ${stage}  ql = ${ql}`);
    if (stage == ql - 1) {
        stage = 0;
        askquestions(questions, stage);
    }

    if (stage < ql - 1) {
        stage++;
        askquestions(questions, stage);
        stageEL.textContent = `Question NO: ${stage}`;
    }
};

const getans = (el) => {
    return `
    ${el[stage]}
    
    `;
};
const myidel = document.getElementById("myid");
const pass = () => {
    console.log("pass question");
    updatescore();
    nextquestion();
};

const fail = () => {
    console.log("Failed");
    totaltime = totaltime + 5;
    nextquestion();
};

function answer(event) {
    //event.preventDefault()
    const ANS = event.getAttribute("data-ans");
    const INDEX = event.getAttribute("data-index");
    // const ANS = myidel.dataset.ans;
    // const INDEX = myidel.dataset.index;
    console.log(`Answer is [${typeof ANS}] your index is [${typeof INDEX}]`); +
    ANS == +INDEX ? pass() : fail();
}

const askquestions = (questions, stage) => {
    let HTMLText = `<h2>  ${questions[stage].Q} <h2>`;
    for (let i = 0; i < questions[stage].options.length; i++) {
        HTMLText += `  <li > 
                        <button 
                        id="myid${i}" 
                        data-ans="${questions[stage].Ans}" 
                        data-index= "${i} "
                        onclick="answer(this)"> 
                            ${questions[stage].options[i]}
                            
                            </button>
                            
                            </li>`;
    }
    questionEL.innerHTML = HTMLText;
};
const dortscores = () => {



}
const timeup = () => {
    questionEL.innerHTML = `<p>Your Time is up<p>
  <p> You scored ${thisscore} 
  <form >
  <h1>Please Enter Your Details</h1> 
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br><br>
  <input type="submit" value="Submit">
</form>



  `;
};

const starttimer = () => {
    askquestions(questions, stage);

    const timerid = setInterval(() => {
        totaltime++;
        console.log(totaltime);
        timerEL.textContent = totaltime;

        if (totaltime === 20 || totaltime > 20) {
            //timeover();
            clearInterval(timerid);
            timeup();
        }
    }, 1000);
};