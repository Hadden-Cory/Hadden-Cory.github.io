let quoteBtn = document.getElementById("quoteBtn");
quoteBtn.addEventListener("touch", buttonPress);

function buttonPress(){
  console.log("buttonPress");
}

function grabAQuote(){
 removeQuote();
 let num = randomNumber();
 let quote = "quote"+num;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let quotes = JSON.parse(this.responseText);
      quote = document.createElement("H1");
      let text = document.createTextNode(quotes.quote.text)
      let author = document.createTextNode("\n-"+quotes.quote.author);
      quote.appendChild(text);
      quote.appendChild(author);
      document.getElementById("displayArea").appendChild(quote);
    }
  };  
  xhttp.open("GET", "quotes.json", true);
  xhttp.send();
}

function randomNumber() {
  var num = (Math.floor(Math.random() * 500) % 10);
}

function removeQuote() {
  let quote = document.getElementById('displayArea');
  while (quote.firstChild) {
    quote.removeChild(quote.firstChild);  
  }
}
