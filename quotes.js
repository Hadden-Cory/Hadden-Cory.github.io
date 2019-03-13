window.onload = function(){ 
  document.getElementById("quoteBtn").ontouchstart = buttonPress;
  document.getElementById("quoteBtn").ontouchend = buttonRelease;
  document.getElementById("quoteBtn").addEventListener("animationend", newSlide);
  document.getElementById("quoteBtn").addEventListener("animationend", grabAQuote);
  document.getElementById("quoteBtn").onclick = buttonClick;
};

function newSlide (){
  document.getElementById("displayArea").classList.toggle("newSlide");
  setTimeout(function(){document.getElementById("displayArea").classList.toggle("newSlide");},1300);
}

function buttonPress(){
 document.getElementById("quoteBtn").classList.toggle("quoteButtonPressed");
 document.getElementById("quoteBtn").style.backgroundColor = "#ffdddd";

}

function buttonRelease(){
  document.getElementById("quoteBtn").style.backgroundColor = "#eeeeee";
  document.getElementById("quoteBtn").classList.toggle("quoteButtonPressed");
  document.getElementById("quoteBtn").style.animation = "buttonRelease 700ms";
  setTimeout( function() {document.getElementById("quoteBtn").style.animation = "unset";}, 700)
 }
 
function buttonClick (){
buttonPress();
setTimeout(function(){buttonRelease();}, 700);
setTimeout(function(){newSlide();}, 700);
setTimeout(function(){grabAQuote();}, 1000);
}


function grabAQuote(){
setTimeout( function(){
 removeQuote();
 let num = randomNumber();
 let quote = "quote"+num;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let quotes = JSON.parse(this.responseText);
      quote = quotes[quote];
      console.log(quote);
      quoteNode = document.createElement("H1");
      quoteNode1 = document.createElement("H3");
      let text = document.createTextNode(quote.text)
      let author = document.createTextNode(quote.author);
      quoteNode.appendChild(text);
      quoteNode1.appendChild(author);
      document.getElementById("displayArea").appendChild(quoteNode);
      document.getElementById("displayArea").appendChild(quoteNode1);
    }
  };  
  xhttp.open("GET", "quotes.json", true);
  xhttp.send();
}, 1020);
}

function randomNumber() {
  let num = (Math.floor(Math.random() * 1000));
  let num1 = (Math.floor(Math.random() * num) % 10);
  return num1+1;
}

function removeQuote() {
  let quote = document.getElementById('displayArea');
  while (quote.firstChild) {
    quote.removeChild(quote.firstChild);  
  }
}
