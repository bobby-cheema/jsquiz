const mydata = JSON.parse(localStorage.getItem("scores"));

const myel = document.getElementById("results");

let HTMLtext = "<h1> Some of the high scores  </h1>";
console.log(mydata)

if (!mydata) {
    myel.innerHTML = "<h2> Sorry No Users to display</h2>"
} else {
    for (i = 0; i < mydata.length; i++) {
        console.log(mydata[i].score);
        HTMLtext += `
                    <h3> User ${mydata[i].name}  Scored ${mydata[i].score}Points </h3> 
                 `;
    }
    myel.innerHTML = HTMLtext;

}




console.log("myel", myel);
//myel.innerHTML = HTMLtext;