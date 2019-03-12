function grabAQuote(){

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("thing").innerHTML = this.responseText;
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

        //     //  let tables = document.getElementById("list");
        //     //  quote = document.createElement("LI");
        //     //  text = document.createTextNode(item.quote+"\"<br>-"+ item.author);
        //     //  quote.appendChild(text);
          
        //      document.getElementById("list").innerHTML = "<li>\""+item.quote+"\"<br>-"+ item.author+"</li>";
        //    };
        
        // xhttp.open("GET", "quotes.json", true);
        // xhttp.send();
