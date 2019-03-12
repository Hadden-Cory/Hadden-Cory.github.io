document.getElementById("quoteBtn").addEventListener("touch", buttonPress);

function buttonPress(){
  console.log("buttonPress");
}

function grabAQuote(){
 removeQuote();
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let quotes = JSON.parse(this.responseText);
      quote = document.createElement("H1");
      let text = document.createTextNode(quotes.quote1.text)
      let author = document.createTextNode("-"+quotes.quote1.author);
      quote.appendChild(text);
      quote.appendChild(author);
      document.getElementById("displayArea").appendChild(quote);
    }
  };  
  xhttp.open("GET", "quotes.json", true);
  xhttp.send();
}

function removeQuote() {
  let quote = document.getElementById('displayArea');
  while (quote.firstChild) {
    quote.removeChild(quote.firstChild);  
  }
}
