function grabAQuote(){

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            
          if (this.readyState == 4 && this.status == 200) {

            var item = JSON.parse(xhttp.response);

            document.getElementById("list").innerHTML = "<li>\""+item.quote+"\"<br>-"+ item.author+"</li>";
          };
        };
        
       xhttp.open("GET", "quotes.json", true);
       xhttp.send();
}