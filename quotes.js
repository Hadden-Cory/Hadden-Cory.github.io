let quoteBtn = document.getElementById("quoteBtn");
quoteBtn.addEventListener("touch", buttonPress);

function buttonPress(){
  console.log("buttonPress");
}

function grabAQuote(){
 removeQuote();
 let num = randomNumber();
 let quote = "quote"+num;
 console.log(quote);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let quotes = JSON.parse(this.responseText);
      quote = document.createElement("H1");
      let text = document.createTextNode(quotes[quote].text)
      let author = document.createTextNode("\n-"+quotes[quote].author);
      quote.appendChild(text);
      quote.appendChild(author);
      document.getElementById("displayArea").appendChild(quote);
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
