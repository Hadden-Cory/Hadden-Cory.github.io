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

  var ret = localStorage.getItem(time);
  var ret1 = JSON.parse(ret);

  alert(ret1.note);
}

// function printMood(thing) {
//     alert();
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       document.getElementById("moodlist").innerHTML = this.responseText;
//     }
//   }
//   xhttp.open("GET", thing, true);
//   xhttp.send();
// }