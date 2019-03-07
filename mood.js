
/***********Objects*Prototypes*************/
class Entry {
  constructor(time, date, note, type) {
    this.time = time || 'time not specified';
    this.date = date || 'date not specified';
    this.note = note || "No additional notes";
    this.type = type || "unknown entryu type";
  }

  //setters
  setTime(time) {
    this.time = time;
  }

  setDate(date) {
    this.date = date;
  }

  setNote(note) {
    this.note = note;
  }

  setNote(type) {
    this.type = type;
  }

  //getters
  getTime() {
    return this.time;
  }

  getDate() {
    return this.date;
  }

  getNote() {
    return this.note;
  }

  getType() {
    return this.type;
  }
}

class Weather extends Entry {
  constructor(time, date, note, weather) {
    let type = 'weather';
    super(time, date, note, type);
    this.weather = weather || "Sunny";
  }

  setWeather(weather) {
    this.weather = weather;
  }

  getWeather() {
    return this.weather;
  }
}

class Mood extends Entry {
  constructor(time, date, note, mood) {
    let type = 'mood';
    super(time, date, note, type);
    this.mood = mood || "Neutral";
  }

  setMood(mood) {
    this.mood = mood;
  }

  getMood() {
    return this.mood;
  }
}

class Exercise extends Entry {
  constructor(time, date, note, workout, duration) {
    let type = 'exercise';
    super(time, date, note, type);
    this.workout = workout || "Running";
    this.duration = duration || "10 Minutes";
  }

  setWorkout(workout) {
    this.workout = workout;
  }

  setDuration(duration) {
    this.duration = duration;
  }

  getWorkout() {
    return this.workout;
  }

  getDuration() {
    return this.duration;
  }
}

/***********Meat*Functions*************/

/*
FUNCTION SAVE OBJ
  Receievs form data, builds it into appropriate object, and sends its it off 
  to be stored in local storage.
*/
function saveObj(form, type) {

  // Normal options
  let date = document.forms[form]['date'].value + "";
  let time = document.forms[form]['time'].value + "";
  let note = document.forms[form]['note'].value + "";

  //Form specific data options
  if (type == "weather") {

    let weather = document.forms[form]['weather'].value + "";
    let weatherObj = new Weather(time, date, note, weather);
    storeObj(weatherObj);

  } else if (type == "mood") {

    let mood = document.forms[form]['mood'].value + "";
    let moodObj = new Mood(time, date, note, mood);
    storeObj(moodObj);

  } else if (type == "exercise") {

    let workout = document.forms[form]['workout'].value + "";
    let duration = document.forms[form]['duration'].value + "";
    let exerciseObj = new Exercise(time, date, note, workout, duration);
    storeObj(exerciseObj);

  } else {

    alert("Submission Error: Please reload the page.")

  }
  removeList();
  buildList();
}

/*
FUNCTION STORE OBJ
  Receives an object, stringifies it, and sends it to local storage.
*/
function storeObj(obj) {
  let strEntry = JSON.stringify(obj);
  localStorage.setItem(obj.type + ', ' + obj.getDate() + ', ' + obj.getTime(), strEntry);
}

/*
FUNCTION RETREIVE OBJ
  Receives an object type and date, pulls it from local storage, parses it into an object,
  and returns it for use stringifies it, and sends it to local storage.
*/
function retreiveObj(type, date, time) {

  let retStr = localStorage.getItem(type + ', ' + date + ', ' + time);
  let retObj = JSON.parse(retStr);
  return retObj;
}

function removeList() {
  let list = document.getElementById('list');

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

/*
FUNCTION BUILD TABLE

*/
function buildList() {

  let journal = [];

  for (let i = 0; i < localStorage.length; i++) {

    let key = localStorage.key(i);
    let entry = localStorage.getItem(key);
    let pEntry = JSON.parse(entry);
    journal.push(pEntry);

  }

  let sortedJournal = journal.sort(sortByTimeStamp);
  let date = "";
  let time = "";

  let printHeading = document.createElement("H1");
  let text = document.createTextNode("Journal");
  printHeading.appendChild(text);
  document.getElementById("list").appendChild(printHeading);

  for (let i = 0; i < sortedJournal.length; i++) {

    let rowDAO = sortedJournal[i];

    if (date == rowDAO.date) {
      //Do nothing
    } else {
      printDate = document.createElement("H2");
      text = document.createTextNode(rowDAO.date);
      printDate.appendChild(text);
      document.getElementById("list").appendChild(printDate);
      date = rowDAO.date;
    }

    if (time == rowDAO.time) {
      //Do nothing
    } else {
      printTime = document.createElement("H3");
      text = document.createTextNode(rowDAO.time);
      printTime.appendChild(text);
      document.getElementById("list").appendChild(printTime);
      time = rowDAO.time;
    }

    let row = "";

    if (rowDAO.type == 'weather') {
      row += rowDAO.weather + "";
    } else if (rowDAO.type == 'mood') {
      row += rowDAO.mood + "";
    } else if (rowDAO.type == 'exercise') {
      row += rowDAO.duration + " of " + rowDAO.workout;
    } else {
      console.log('Unrecognized Object Type');
    }

    row += " -- " + rowDAO.note;

    printRow = document.createElement("P");
    text = document.createTextNode(row);
    printRow.appendChild(text);
    document.getElementById("list").appendChild(printRow);
  }






}

function sortByTimeStamp(a, b) {
  let comparison = 0;
  if (a.date >= b.date && a.time > b.time) {
    comparison = 1;
  } else if (a.date <= b.date && a.time < b.time) {
    comparison = -1;
  }
  return comparison;
}

//   let row = table.insertRow(i);
//   let cell0 = row.insertCell(0);
//   let cell1 = row.insertCell(1);
//   let cell2 = row.insertCell(2);
//   let cell3 = row.insertCell(3);
//   cell0.innerHTML = pitem.opt0;
//   cell1.innerHTML = pitem.note;
//   cell2.innerHTML = pitem.time;
//   cell3.innerHTML = pitem.date;

// }
//   let tableRow = document.createElement("TR");
//   let rowInsertion = document.createTextNode(dataInsertion);
//   tableRow.appendChild(rowInsertion);
//   document.getElementById("notes").appendChild(tableData);  

//   let tableData = document.createElement("TD");
//   let dataInsertion = document.createTextNode(pitem.note);
//   tableData.appendChild(dataInsertion);

// let sortedWeatherAry = weatherAry.sort(sortByTimeStamp);
// let sortedMoodAry = moodAry.sort(sortByTimeStamp);
// let sortedExerciseAry = exerciseAry.sort(sortByTimeStamp);

// let weatherAry = []; 
// let moodAry = [];
// let exerciseAry = []; 

// if (pEntry.type == 'weather'){
//   weatherAry.push(pEntry);
// } else if (pEntry.type == 'mood'){
//   moodAry.push(pEntry);
// } else if (pEntry.type == 'exercise'){
//   exerciseAry.push(pEntry);
// } else {
//   console.log('Unrecognized Object Type');
// }

// for (let i = 0; i < sortedWeatherAry.length; i++){
//   console.log(sortedWeatherAry[i]);
// }
// for (let i = 0; i < sortedMoodAry.length; i++){
//   console.log(sortedMoodAry[i]);
// }
// for (let i = 0; i < sortedExerciseAry.length; i++){
//   console.log(sortedExerciseAry[i]);
// }
