var entry = {
   time: "",
   date: "",
   note: "",
   opt1: "",
   opt2: ""
};

function submit(form, option0, option1) {

 

  var date = document.forms[form]['date'].value+"";
  var time = document.forms[form]['time'].value+"";
  var note = document.forms[form]['note'].value+"";
  var opt0 = document.forms[form][option0].value+"";


  entry.time = time;
  entry.date = date;
  entry.note = note;
  entry.opt0 = opt0;
  
  if (option1!=""){
    var opt1 = document.forms[form][option1].value+"";
    entry.opt1 = opt1;
  };
 
  var strEntry = JSON.stringify(entry);
  localStorage.setItem(time+date, strEntry);
  printMood();
  // var ret = localStorage.getItem(time);
  // var ret1 = JSON.parse(ret);

 
}

function writeToFile(){
  var fileWriter = require('fileWriter');



}

function printMood() {
  var table = document.getElementById('notes');

for (var i = 0; i < localStorage.length; i++){
  
  var key = localStorage.key(i);
  var item = localStorage.getItem(key);
  

  console.log("Before Parse: "+item);
  var pitem = JSON.parse(item);
 
  console.log("Note after Parse: " + pitem.opt0);
  var row = table.insertRow(i);
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  cell0.innerHTML = pitem.opt0;
  cell1.innerHTML = pitem.note;
  cell2.innerHTML = pitem.time;
  cell3.innerHTML = pitem.date;

}
//   var tableRow = document.createElement("TR");
//   var rowInsertion = document.createTextNode(dataInsertion);
//   tableRow.appendChild(rowInsertion);
//   document.getElementById("notes").appendChild(tableData);  

// }var tableData = document.createElement("TD");
//   var dataInsertion = document.createTextNode(pitem.note);
//   tableData.appendChild(dataInsertion);


  
  // var xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function() {
  //   if (this.readyState == 4 && this.status == 200) {
  //     document.getElementById("moodlist").innerHTML = this.responseText;
  //   }
  // }
  
  // xhttp.open("GET", thing, true);
  // xhttp.send();alert("ajax");
}