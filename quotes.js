function grabAQuote(){

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let quotes = JSON.parse(this.responseText);
      document.getElementById("thing").innerHTML = quotes.quote1.text;

      quote = document.createElement("H1");
      text = document.createTextNode(quotes.quote1.text+"\"<br>-"+ quotes.quote1.author);
      quote.appendChild(text);
      document.getElementById("thing").appendChild(quote);
    }
  };  
  xhttp.open("GET", "quotes.json", true);
  xhttp.send();
}




 
        //  var xhttp = new XMLHttpRequest();

        //  xhttp.onreadystatechange = function() {
        //   alert('here');
         
        //    if (this.readyState == 4 && this.status == 200) {

        //      var item = JSON.parse(xhttp.response);

        //     //  quote = document.createElement("H1");
        //     //  text = document.createTextNode(item.quote+"\"<br>-"+ item.author);
        //     //  quote.appendChild(text);
         //    //  document.getElementById("thing").appendChild(quote);
          
        // printTime = document.createElement("H3");
        // text = document.createTextNode(rowDAO.time);
        // printTime.appendChild(text);
        // document.getElementById("list").appendChild(printTime);

        //      document.getElementById("list").innerHTML = "<li>\""+item.quote+"\"<br>-"+ item.author+"</li>";
        //    };
        
        // xhttp.open("GET", "quotes.json", true);
        // xhttp.send();
