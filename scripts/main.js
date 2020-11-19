import {
    setMaintain
} from "./ui-elements/maintain.js";

setMaintain(100);


let time = document.getElementsByClassName("ptime")[0];
time.addEventListener("click", () => {
    console.log("Ale production");
});


function buttonFac(name) {
    let temp = document.getElementsByClassName(name)[0];
    temp.addEventListener("click", () => {
        RemoveMarked();
        temp.classList.add("marked");
    });
}

buttonFac('temp');
// buttonFac('state');
// buttonFac('productsPerMin');
// buttonFac('amountToProduce');
buttonFac('humidity');
buttonFac('acceptableProducts');
buttonFac('vibration');
buttonFac('DefectProducts');
buttonFac('produced');

function RemoveMarked() {
    let marked = document.getElementsByClassName('marked')[0];
    console.log(marked.className);
    marked.classList.remove("marked");
}

setInterval(function () {
    time.children[1].innerHTML = new Date()
        .toString()
        .slice(16, 25);
}, 1);

const select_items = document.getElementsByClassName("select-items")[0];
document.getElementById("batchNr")
    .addEventListener("click", () => {
        select_items.classList.toggle("select-hide");
    });

document.getElementsByClassName("batchNr")[0].addEventListener("click", () => {
    select_items.classList.toggle("select-hide");
});

let data = [2312, 2390, 2039, 1023, 2093, 1049, 1923, 231];
data.forEach((batch) => {
    let div = document.createElement("div");
    div.innerText = batch;
    div.addEventListener("click", () => {
        document.getElementsByClassName("batchNr")[0].value = batch;
    });
    select_items.appendChild(div);
});

document.addEventListener("click", (element) => {
    if (element.target == document.getElementById("batchNr") ||
        element.target == document.getElementsByClassName("batchNr")[0]) {} else {
        select_items.classList.add("select-hide");
    }
});