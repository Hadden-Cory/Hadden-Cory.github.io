var entry = {
  time: "",
  mood: "",
  note: "",
//   entry: function() {
//     return this.time + "<br><h3>" + this.mood + "</h3>" + this.note + ",<br>";
// }
}

function submit() {
  var mood = document.forms['entry']['mood'].value;
  var time = document.forms['entry']['time'].value;
  var note = document.forms['entry']['note'].value;

  entry.time = time;
  entry.mood = mood;
  entry.note = note;

  alert(time);
  var strEntry = JSON.stringify(entry);
  localStorage.setItem(time, strEntry);

  var ret = localStorage.getItem(time);
  var ret1 = JSON.parse(ret);
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