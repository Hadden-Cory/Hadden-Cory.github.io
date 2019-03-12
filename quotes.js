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
      quote = quotes[quote];
      console.log(quote);
      quoteNode = document.createElement("H1");
      let text = document.createTextNode(quote.text)
      let author = document.createTextNode("\n-"+quotes[quote].author);
      quoteNode.appendChild(text);
      quoteNode.appendChild(author);
      document.getElementById("displayArea").appendChild(quoteNode);
    }
  };  
  xhttp.open("GET", "quotes.json", true);
  xhttp.send();
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
