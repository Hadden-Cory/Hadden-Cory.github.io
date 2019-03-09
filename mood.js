/**************************************************************
 * To Brother Baer
 * 
 * To make grading easy, I have included several comment tags
 * (Formatted: "//-----------[topic] - [subtopic] Ex. #||")
 * to help you recoginze the lines code that demostrate a 
 * topic. To keep it clean, I'm omiting topic tags for 
 * functions and varibles because you will readily spot them 
 * anyway.
 * 
 * I also did not use an associative array as most would define
 * associative arrays in JS (I could argue that all ojects can
 * seen as an associative array of sorts with a key (member 
 * name) and and value (member data), by that logic I could 
 * also argue that local storage is a sort of associative array
 * but I think both of those arguments are besides point this 
 * class is trying to make). I didn't really need associative 
 * array. If you'd like, I can demonstrate by telling you 
 * what they are, how to use them, and their limitations.
 * I just didn't have a use for one in this app. I can 
 * include them in my next submission if the description below
 * is insufficient for the grading requirements.
 *  
 * Asscoiative arrays with a string key in stead of an integer
 * index (personally, I think of them as objects that I can 
 * append and remove properties from easily).
 * 
 * In JS they can be created like this:
 * 
 * var aArray = { "red": '#ff0000', "green": '#00ff00', "blue":
 *                '#0000ff' };
 * 
 * Or like this (though it is rather cumbersome way):
 * 
 * aArray = new Array(); // or if your like: let aArray = [];
 * aArray['red'] = '#ff0000';
 * aArray['green'] = '#00ff00';
 * aArray['blue'] = '#0000ff';
 *  
 * I can now access elements like this:
 * 
 * aArray['red']; //evaluates as '#ff0000'
 * 
 * Or like this:
 * 
 * aArray.red; //evaluates as '#ff0000'
 * 
 * The sad thing about JS associative array is that they do not 
 * inherit the the array prototype (for example, the command 
 * "aArray.length;" will just evaluate to 0 or undefined 
 * depending on how you defined it). There are several baidaid
 * jobs availible on the internet if desire, but most of them 
 * involve you telling the computer how to make your array-like
 * object to act like an array.  
 * 
 * I hope that little demo can count, if not
 * 
 * Happy grading.
 * ***********************************************************/


/***********Objects*Prototypes*************/

// -------------------------------------------------------------JavaScript Objects - Object Creation Functions (ES6) Ex. 1||
class Entry {
  // -------------------------------------------------------------JavaScript Objects - Properties, Methods (ES6) Ex. 1||
  // -------------------------------------------------------------JavaScript - Parameters Ex. 1||
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

// -------------------------------------------------------------JavaScript Objects - Object Creation Functions (ES6) Ex. 2||
class Weather extends Entry {
    // -------------------------------------------------------------JavaScript Objects - Properties, Methods (ES6) Ex. 2||
     // -------------------------------------------------------------JavaScript - Parameters Ex. 2||
  constructor(time, date, note, weather) {
    let type = 'weather';
      // -------------------------------------------------------------JavaScript Objects - Inheritance (ES6) Ex. 1||
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

// -------------------------------------------------------------JavaScript Objects - Object Creation Functions (ES6) Ex. 3||
class Mood extends Entry {
    // -------------------------------------------------------------JavaScript Objects - Properties, Methods (ES6) Ex. 3||
     // -------------------------------------------------------------JavaScript - Parameters Ex. 3||
  constructor(time, date, note, mood) {
    let type = 'mood';
    // -------------------------------------------------------------JavaScript Objects - Inheritance (ES6) Ex. 2||
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

// -------------------------------------------------------------JavaScript Objects - Object Creation Functions (ES6) Ex. 4||
class Exercise extends Entry {
    // -------------------------------------------------------------JavaScript Objects - Properties, Methods (ES6) Ex. 4||
     // -------------------------------------------------------------JavaScript - Parameters Ex. 4||
  constructor(time, date, note, workout, duration) {
    let type = 'exercise';
    // -------------------------------------------------------------JavaScript Objects - Inheritance (ES6) Ex. 3||
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
/* I won't bother putting example tags 
*  for each function. I think you can 
*  find them easy enough, and I will 
*  just make sure they have a comment
*  block labling each. 


/*
FUNCTION SAVE OBJ
  Receievs form data, builds it into appropriate object, and sends its it off 
  to be stored in local storage.
*/
 // -------------------------------------------------------------JavaScript - Parameters Ex. 5||
function saveObj(form, type) {

  // Normal options
  let date = document.forms[form]['date'].value + "";
  let time = document.forms[form]['time'].value + "";
  let note = document.forms[form]['note'].value + "";

  // -------------------------------------------------------------JavaScript - Conditional Statements Ex. 1||
  //Form specific data options
  if (type == "weather") {

    let weather = document.forms[form]['weather'].value + "";
        // -------------------------------------------------------------JavaScript Objects - Instantiation (ES6) Ex. 1||
    let weatherObj = new Weather(time, date, note, weather);
    storeObj(weatherObj);

  } else if (type == "mood") {

    let mood = document.forms[form]['mood'].value + "";
            // -------------------------------------------------------------JavaScript Objects - Instantiation (ES6) Ex. 2||
    let moodObj = new Mood(time, date, note, mood);
    storeObj(moodObj);

  } else if (type == "exercise") {

    let workout = document.forms[form]['workout'].value + "";
    let duration = document.forms[form]['duration'].value + "";
            // -------------------------------------------------------------JavaScript Objects - Instantiation (ES6) Ex. 3||
    let exerciseObj = new Exercise(time, date, note, workout, duration);
    storeObj(exerciseObj);

  } else {

    alert("Submission Error: Please reload the page.")

  }

  //Re-render List instantly
  removeList();
  buildList();
}

/*
FUNCTION STORE OBJ
  Receives an object, stringifies it, and sends it to local storage.
*/
// -------------------------------------------------------------JavaScript - Parameters Ex. 6||
function storeObj(obj) {
  // -------------------------------------------------------------JSON - Stringify Ex. 1||
  let strEntry = JSON.stringify(obj);
  localStorage.setItem(obj.getType() + ', ' + obj.getDate() + ', ' + obj.getTime(), strEntry);
}

/*
FUNCTION RETREIVE ALL DATA
  Returns all the objects in local storage as an array. 
*/
function retreiveAllData() {

  // -------------------------------------------------------------JavaScript - Array Ex. 1||
  let data = [];
  // -------------------------------------------------------------JavaScript - Loop Ex. 1||
  for (let i = 0; i < localStorage.length; i++) {

    let key = localStorage.key(i);
    let entry = localStorage.getItem(key);
    // -------------------------------------------------------------JSON - Parse Ex. 1||
    let pEntry = JSON.parse(entry);

    // -------------------------------------------------------------JavaScript - Array Ex. 2||
    data.push(pEntry);

  }

  return data;
}

/*
FUNCTION REMOVE LIST
  Removes all list items. 
  Called to reset list area during rerender. 
*/
function removeList() {
  let list = document.getElementById('list');
  // -------------------------------------------------------------JavaScript - Loop Ex. 2||
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

/*
FUNCTION SORT BY DATE
  Custom array sort funtion that sorts entries by date. 
*/
 // -------------------------------------------------------------JavaScript - Parameters Ex. 7||
function sortByDate(a, b) {
  // -------------------------------------------------------------JavaScript - Conditional Statements Ex. 2||
  let comparison = 0;
  if (a.getDate >= b.date) {
    comparison = 1;
  } else if (a.date <= b.date) {
    comparison = -1;
  }
  return comparison;
}

/*
FUNCTION SORT BY TIME
  Custom array sort funtion that sorts entries by time. 
*/
 // -------------------------------------------------------------JavaScript - Parameters Ex. 8||
function sortByTime(a, b) {
  let comparison = 0;
  // -------------------------------------------------------------JavaScript - Conditional Statements Ex. 3||
  if (a.time >= b.time) {
    comparison = 1;
  } else if (a.time <= b.time) {
    comparison = -1;
  }
  return comparison;
}

/*
FUNCTION BUILD TABLE
Renders all the objects in local storage as a list of entries.
*/
function buildList() {

  // -------------------------------------------------------------JavaScript - Array Ex. 3||
  let journal = retreiveAllData();
  // -------------------------------------------------------------JavaScript - Array Ex. 4||
  let sortedByTime = journal.sort(sortByTime);
  // -------------------------------------------------------------JavaScript - Array Ex. 5||
  let sortedJournal = sortedByTime.sort(sortByDate);
  let date = "";
  let time = "";

  let printHeading = document.createElement("H1");
  let text = document.createTextNode("Journal");
  printHeading.appendChild(text);
  document.getElementById("list").appendChild(printHeading);

  // -------------------------------------------------------------JavaScript - Loop Ex. 3||
  for (let i = 0; i < sortedJournal.length; i++) {

    // -------------------------------------------------------------JavaScript - Array Ex. 6||
    let rowDAO = sortedJournal[i];
    
    // -------------------------------------------------------------JavaScript - Conditional Statements Ex. 3|| 
    if (date == rowDAO.date) {
      //Do nothing
    } else {
      printDate = document.createElement("H2");
      text = document.createTextNode(rowDAO.date);
      printDate.appendChild(text);
      document.getElementById("list").appendChild(printDate);
      date = rowDAO.date;
    }

    // -------------------------------------------------------------JavaScript - Conditional Statements Ex. 4||
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
    // -------------------------------------------------------------JavaScript - Conditional Statements Ex. 5||
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