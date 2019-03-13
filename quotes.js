//Load page before listening to inputs
window.onload = function () {
  // -------------------------------------------------------------JS Events - Mobile Events Ex. 1||
  document.getElementById("quoteBtn").ontouchstart = buttonPress;
  document.getElementById("quoteBtn").ontouchend = buttonRelease;

  //I must have had a spelling error orignally because this was the only way 
  //animation end would work. 
  // -------------------------------------------------------------JS Events - Animation & Transition Events Ex. 1||
  document.getElementById("quoteBtn").addEventListener("animationend", newSlide);
  document.getElementById("quoteBtn").addEventListener("animationend", grabAQuote);

  //Simulates mobile events for PC users
  // -------------------------------------------------------------JS Events - Standard Events Ex. 1||
  document.getElementById("quoteBtn").onmousedown = buttonPress;
  document.getElementById("quoteBtn").onmouseup = buttonRelease;
};

//Lanuches slide change animation
function newSlide() {
  // ------------------------------------------------------------- CSS3 Using JS  - ClassList Ex. 1||
  document.getElementById("displayArea").classList.toggle("newSlide");
  setTimeout(function () {
    // ------------------------------------------------------------- CSS3 Using JS  - ClassList Ex. 2||
    document.getElementById("displayArea").classList.toggle("newSlide");
  }, 1300);
}

//Lanuches button press down animation
function buttonPress() {
  // ------------------------------------------------------------- CSS3 Using JS  - ClassList Ex. 3||
  document.getElementById("quoteBtn").classList.toggle("quoteButtonPressed");
  // ------------------------------------------------------------- CSS3 Using JS  - Style Ex. 1||
  document.getElementById("quoteBtn").style.backgroundColor = "#ffdddd";

}

//Lanuches button release animation
function buttonRelease() {
  document.getElementById("quoteBtn").style.backgroundColor = "#eeeeee";
  // ------------------------------------------------------------- CSS3 Using JS  - ClassList Ex. 4||
  document.getElementById("quoteBtn").classList.toggle("quoteButtonPressed");
  // ------------------------------------------------------------- CSS3 Using JS  - Style Ex. 2||
  document.getElementById("quoteBtn").style.animation = "buttonRelease 700ms";
  setTimeout(function () {
    // ------------------------------------------------------------- CSS3 Using JS  - Style Ex. 3||
    document.getElementById("quoteBtn").style.animation = "unset";
  }, 700)
}

function grabAQuote() {

  // time the quote change while the slide is off screen
  setTimeout(function () {

    //clear text area
    removeQuote();

    //construct a random quote key
    let num = randomNumber();
    let quote = "quote" + num;

    // -------------------------------------------------------------AJAX - Request JSON Ex. 1||
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        let quotes = JSON.parse(this.responseText);

        quote = quotes[quote];

        //Print quote to slide
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

    //send AJAX
    // -------------------------------------------------------------AJAX - Request JSON Ex. 2||
    xhttp.open("GET", "quotes.json", true);
    xhttp.send();
  }, 1020); //timeout timing in ms
}

//get a random number for our quote key
function randomNumber() {
  //I wan this number to be very random so we will do this twice.
  let num = (Math.floor(Math.random() * 3000));

  //the number right after the % represents the number of slides
  let num1 = (Math.floor(Math.random() * num) % 10);
  return num1 + 1;
}

//Wipe the slide clean. Without this quotes would stack in the slide.
function removeQuote() {
  let quote = document.getElementById('displayArea');
  while (quote.firstChild) {
    quote.removeChild(quote.firstChild);
  }
}