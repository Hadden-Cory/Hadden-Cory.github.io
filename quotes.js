document.getElementById("quoteBtn").addEventListener("touch", buttonPress);

function buttonPress(){
  console.log("buttonPress");
}

function grabAQuote(){

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let quotes = JSON.parse(this.responseText);
      quote = document.createElement("H1");
      text = document.createTextNode(quotes.quote1.text+quotes.quote1.author);
      quote.appendChild(text);
      document.getElementById("displayArea").appendChild(quote);
    }
  };  
  xhttp.open("GET", "quotes.json", true);
  xhttp.send();
}