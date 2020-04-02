// IIFE
// https://developer.mozilla.org/en-US/docs/Glossary/IIFE

window.addEventListener("load", init);

let count = 0;
let counter = 0;
let questionState = 'stopped';
let target = null;
const timerPlaceholder = document.getElementById("timer");

function init() {
  const startButton = document.getElementById("start");
  startButton.addEventListener("click", startButtonHandler);
}

function stopButtonHandler(event) {
  if (event.target.nodeName == "SPAN") {
    clearInterval(counter);
  }
}

function startButtonHandler(event) {
  console.log(event)
  if (event.target.nodeName == "P" && questionState == 'stopped') {
    target = event.target;
    console.log(event.target.attributes[0].nodeValue);
    count = parseInt(event.target.attributes[0].nodeValue);
    counter = setInterval(timer, 1000); //1000 will  run it every 1 second
    questionState = 'started';
  }
  else if(event.target.nodeName == "P" && questionState == 'started'){
    clearInterval(counter);
    target.innerHTML = 'Start';
    questionState = 'stopped';
    target.parentElement.classList.remove('warning');
  }
}

function timer() {
  count = count - 1;
  if (count <= 0) {
    clearInterval(counter);
    timerPlaceholder.innerHTML = 'Time is up';
    questionState = 'stopped';
    target.parentElement.classList.remove('warning');
    target.innerHTML = 'Start';
    return;
  }
  target.innerHTML = 'Stop';
  target.parentElement.classList.add('warning');
  timerPlaceholder.innerHTML = count;
}
