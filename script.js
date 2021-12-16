// get elements
const startext = "Welcome to the quiz press atart to continue";
const questionEL = document.getElementById("questions");
const hiscoreEL = document.getElementById("hiscore");
const nextbtnEL = document.getElementById("next");
const startbtnEL = document.getElementById("start");
const answersEL = document.getElementById("answer");
const timerEL = document.getElementById("timer");
//const stageEL = document.getElementById("stage");
const scoreEL = document.getElementById("score");
//define variables
let isStart = false;

let hiscore = 0;
let totaltime = 20;
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
            "They both originated on the island of Java",
        ],
        Ans: 1,
    },
    {
        Q: " When a user views a page containing a JavaScript program, which machine actually executes the script? ",
        options: [
            "The User's machine running a Web browser",
            "The Web server",
            "A central machine deep within Netscape's corporate offices",
            "None of the above",
        ],
        Ans: 0,
    },
    {
        Q: " How can you get the type of arguments passed to a function?",
        options: [
            "using typeof operator",
            "Both of the above ",
            "None of the above ",
        ],
        Ans: 0,
    },
    {
        Q: "How do you create a function  ",
        options: [
            "function ()",
            "my function",
            "function= new()",
            "function.new()",
        ],
        Ans: 0,
    },
    {
        Q: "what array.length will do  ",
        options: [
            "tells the length of array ",
            "reduce the length of array ",
            "adds the length of array",
        ],
        Ans: 1,
    },
];
const ql = questions.length;

const nextquestion = () => {
    if (stage == ql - 1) {
        stage = 0;
        askquestions(questions, stage);
    }

    if (stage < ql - 1) {
        stage++;
        askquestions(questions, stage);
        // stageEL.textContent = `Question NO: ${stage}`;
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
    answersEL.textContent = "Your last answer wasCorrect";
    nextquestion();
};

const fail = () => {
    console.log("Failed");
    totaltime = totaltime - 1;
    answersEL.textContent = "Your last Answer was Wrong";
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
    // if (+ANS == +INDEX) {
    //     console.log("pass question");
    //     updatescore();
    //     answersEL.textContent = "Correct";
    //     nextquestion();
    // } else {
    //     fail()
    // }
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
const sortscores = () => {};
const timeup = () => {
    answersEL.textContent = "";
    questionEL.innerHTML =
        " <p> Your Time is up <p><h3>Enter Your Enitails </h3> ";
    //   questionEL.innerHTML = `<p>Your Time is up<p>
    //   <p> You scored ${thisscore}
    //   <form >
    //   <h1>Please Enter Your Details</h1>
    //   <label for="fname">First name:</label><br>
    //   <input type="text" id="fname" name="fname"><br><br>
    //   <input type="submit" value="Submit">
    // </form>
    //   `;
    const myform = document.createElement("form");
    const sendbtn = document.createElement("button");
    sendbtn.textContent = "Submit details";
    myform.method = "post";
    const INPUT = document.createElement("input");

    INPUT.name = "name";

    INPUT.type = "text";
    INPUT.id = "userinput";
    const SUBMIT = document.createElement("button");
    SUBMIT.textContent = "Send";
    SUBMIT.addEventListener("click", (event) => {
        event.preventDefault();
        const userInput = INPUT.value;
        let OBJ = [{

        }]
        console.log(`username ${userInput} score is ${thisscore}`);
        let scores = JSON.parse(localStorage.getItem('scores'));
        if (scores) {
            console.log("Data present")
            OBJ = JSON.parse(localStorage.getItem("scores"))

            console.log(JSON.stringify(OBJ))
            let arr = [userInput, thisscore]
            let NEWOBJ = [...OBJ, {
                "name": userInput,
                "score": thisscore

            }]

            console.log(JSON.stringify(NEWOBJ))
            localStorage.setItem("scores", JSON.stringify(NEWOBJ))
            location.reload()
        } else {
            console.log("no data preseny")
                //push the array in OBJ
            OBJ = [{
                name: userInput,
                score: thisscore
            }]
            localStorage.setItem("scores", JSON.stringify(OBJ))
            location.reload()

        }
        //localStorage.setItem("scores", JSON.stringify(OBJ))

        //location.reload()
    });

    myform.appendChild(INPUT);
    myform.appendChild(SUBMIT);
    questionEL.appendChild(myform);
};

const starttimer = () => {
    askquestions(questions, stage);

    const timerid = setInterval(() => {
        totaltime--;
        console.log(totaltime);
        timerEL.textContent = totaltime;

        if (totaltime === 0 || totaltime < 0) {
            //timeover();
            clearInterval(timerid);
            timeup();
        }
    }, 1000);
};