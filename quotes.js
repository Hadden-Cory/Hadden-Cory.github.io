function grabAQuote(){
    alert(1);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            alert(2);
          if (this.readyState == 4 && this.status == 200) {
              alert(3);
            var item = JSON.parse(xhttp.response);
            alert(item.author);

            //document.getElementById("list").innerHTML = "<li>\""+item.quote+"\"<br>-"+ item.author+"</li>";
          }
        }
        
       // xhttp.open("GET", "quotes.json", true);
        //xhttp.send();
}