/**************************************************************
 * To Brother Baer
 * 
 * To make grading easy, I have included several comment tags
 * (Formatted: "//-----------[topic] - [subtopic] Ex. #||")
 * to help you recoginze the lines code that demostrate a 
 * topic. To keep it clean, I'm omiting topic tags for 
 * functions and varibles because you will easily spot them 
 * anyway. Also to keep it clean, I will only include 3 tags
 * per subtopic even if there is many more instances.
 * 
 * Proeject Relfections:
 * I realize local storage is not the place for user login 
 * info. In hindsight, I would never store a user table in 
 * local storage, but it was a great excercise that took a lot
 * of out of the box thinking. I hope it demoed fluentcy 
 * alright. I also could have gotten away without gettters and
 * setters, but the OO pursit in me likes to pretend JS will 
 * encapsulate my model (just wishful thinking I guess).
 * 
 * Happy grading.
 * ***********************************************************/

/***********Gloabls*************/
let sessionUser;

/***********Objects*Prototypes*************/
// -------------------------------------------------------------JavaScript Objects - Object Creation Functions (ES6) Ex. 1||
class Entry {
  // -------------------------------------------------------------JavaScript Objects - Properties, Methods (ES6) Ex. 1||
  // -------------------------------------------------------------JavaScript - Parameters Ex. 1||
  constructor(time, date, note, type) {
    this.time = time || 'time not specified';
    this.date = date || 'date not specified';
    this.note = note || "No additional notes";
    this.type = type || "unknown entry type";
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
    // -------------------------------------------------------------JavaScript Objects - inheritance (ES6) Ex. 1||
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

// -------------------------------------------------------------JavaScript Objects - Object Creation Functions (ES6) Ex. 2||
class Mood extends Entry {
  // -------------------------------------------------------------JavaScript Objects - Properties, Methods (ES6) Ex. 2||
  constructor(time, date, note, mood) {
    let type = 'mood';
    // -------------------------------------------------------------JavaScript Objects - inheritance (ES6) Ex. 2||
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
    // -------------------------------------------------------------JavaScript Objects - inheritance (ES6) Ex. 3||
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

// -------------------------------------------------------------JavaScript Objects - Object Creation Functions (ES6) Ex. 3||
class User {

  // -------------------------------------------------------------JavaScript Objects - Properties, Methods (ES6) Ex. 3||
  constructor(name, pin, journal){
    this.name = name;
    this.pin = pin;
    this.journal = journal;
  }

  setName(name) {
    this.name = name;
  }

  setPin(pin) {
    this.pin = pin;
  }

  setJournal(journal) {
    this.journal = journal;
  }

  getName() {
    return this.name;
  }

  getPin() {
    return this.pin;
  }

  getJournal() {
    return this.journal;
  }


}
/***********Authentication*Functions*************
*  I won't bother putting example tags 
*  for each function. I think you can 
*  find them easy enough, and I will 
*  just make sure they have a comment
*  block labling each. 
*************************************************/
/*
FUNCTION SAVE USER
  Receievs user ID form data, builds it into appropriate User object, and sends its it off 
  to be stored in local storage.
*/
// -------------------------------------------------------------JavaScript - Parameters Ex. 2||
function saveUser(form) {

  //turn form data into a user object
  let name = document.forms[form]['name'].value + "";
  let pin = document.forms[form]['pin'].value + "";
   // -------------------------------------------------------------JavaScript - Arrays (Associate) Ex. 1||
  let journal = {};
  // -------------------------------------------------------------JavaScript Objects - instantiation Ex. 1||
  let obj = new User(name, pin, journal);

  // -------------------------------------------------------------JSON - Stringify Ex. 1||
  //stringify for storage.
  let strUser = JSON.stringify(obj);

  // -------------------------------------------------------------Local Storage - Simple Data Ex. 1||
  localStorage.setItem(name + pin, strUser);

  alert("User \""+name+"\" has been added to your browser's local storage. You may now sign in with this ID.");
}

/*
FUNCTION VERIFY USER
  Receievs form data, builds it into appropriate User object, and sends its it off 
  to be stored in local storage.
*/
function verifyUser(form) {

  //grab form data
  let name = document.forms[form]['name'].value + "";
  let pin = document.forms[form]['pin'].value + "";

  // -------------------------------------------------------------JavaScript - Conditional Statments Ex. 1||
        // -------------------------------------------------------------Local Storage - Simple Data Ex. 1||
  //if user with this pin exist
        // -------------------------------------------------------------Local Storage - Objects & Associative Array Ex. 1||
  if (localStorage.getItem(name + pin) != null) {

    //retrieve loacl storage data, parse it, and set session user credentials to valid 
    strObj = localStorage.getItem(name + pin);
    localStorage.setItem('sesssionUser', strObj);

    console.log("User\""+name+"\" Found");
    userIsSelcted = true;
    // -------------------------------------------------------------Local Storage - Simple Data Ex. 1||
    localStorage.setItem('isSignedIn', true);

    //enter Mood main page
    window.location.replace("mood.html");

  } else {

    //Oh no the ID failed to verfiy
    alert("User \""+ name + "\" Not Found:\nUsername or pin may be incorrect.");

  }
}


/*
FUNCTION SIGN OUT
  Resets all session user credentials
*/
function signOut() {

  //reset session user credentials
        // -------------------------------------------------------------Local Storage - Simple Data Ex. 2||
  localStorage.setItem('sesssionUser', null);
        // -------------------------------------------------------------Local Storage - Simple Data Ex. 3||
  localStorage.setItem('isSignedIn', false);
  console.log(localStorage.getItem('sesssionUser')+ " signed out.");

  //reload page. Since the user info has been rest this will simply
  //send back to the login page. 
  window.location.replace("mood.html");
}

/*
FUNCTION SIGN OUT
  Check session user credentials. If verified, finish building the page, if not verified, redirect to the sign in page.
*/
function isSignedIn() {

  // -------------------------------------------------------------Local Storage - Objects & Associative Array Ex. 2||
  //just some simplifying DAO (data access object) 
  let signedIn = localStorage.getItem('isSignedIn');
  
  if (signedIn == 'true') {

    //Grab the user ID the sign in page saved for us and build a user object we can store in sessionUSer
    sessionUserStr = localStorage.getItem('sesssionUser');

    // -------------------------------------------------------------JSON - Parse Ex. 2||
    sessionUserID = JSON.parse(sessionUserStr);
    
    // -------------------------------------------------------------JavaScript - Arrays (Associate) Ex. 1||
    let journal = {};

    // -------------------------------------------------------------JavaScript Objects - instantiation Ex. 2||
    sessionUser = new User (sessionUserID.name, sessionUserID.pin, journal);

            // -------------------------------------------------------------Local Storage - Objects & Associative Array Ex. 3||
    let storedUserStr = localStorage.getItem(sessionUserID.name+sessionUserID.pin);

    // -------------------------------------------------------------JSON - Parse Ex. 3||
    let storedUser = JSON.parse(storedUserStr);
    sessionUser = new User (storedUser.name, storedUser.pin, storedUser.journal);
  
    
    // -------------------------------------------------------------DOM Manipulation - Create & Append Ex. 1||
    let tables = document.getElementById("titleArea");
    welcome = document.createElement("H1");
    text = document.createTextNode(" Welcome to Mood " + sessionUserID.name);
    welcome.appendChild(text);
    // -------------------------------------------------------------DOM Manipulation - insertBefore Ex. 1||
    tables.insertBefore(welcome, tables.childNodes[0]);

    //render our users journal
    buildList();

  } else {
    
    //User didn't verify, send them back to the sign in page.
    console.log('No user signed in. Page redirected');
    window.location.replace("moodUserSelection.html");
  }

}

/***********Meat*Functions*************
*  I won't bother putting example tags 
*  for each function. I think you can 
*  find them easy enough, and I will 
*  just make sure they have a comment
*  block labling each. 
*************************************************/
/*
FUNCTION SAVE OBJ
  Receievs form data, builds it into appropriate object, and sends its it off 
  to be stored in local storage.
*/
function saveObj(form, type) {

  // Grab universal entry options from form
  let date = document.forms[form]['date'].value + "";
  let time = document.forms[form]['time'].value + "";
  let note = document.forms[form]['note'].value + "";

  // Grab form specific data options
  // -------------------------------------------------------------JavaScript - Conditional Statments Ex. 2||
  if (type == "weather") {

    let weather = document.forms[form]['weather'].value + "";
  
    // -------------------------------------------------------------JavaScript Objects - instantiation Ex. 3||
    let weatherObj = new Weather(time, date, note, weather);
    storeEntry(weatherObj);

  } else if (type == "mood") {

    let mood = document.forms[form]['mood'].value + "";
    
    let moodObj = new Mood(time, date, note, mood);
    storeEntry(moodObj);

  } else if (type == "exercise") {

    let workout = document.forms[form]['workout'].value + "";
    let duration = document.forms[form]['duration'].value + "";
    
    let exerciseObj = new Exercise(time, date, note, workout, duration);
    storeEntry(exerciseObj);

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

function storeEntry(obj) {

  // -------------------------------------------------------------JSON - Stringify Ex. 2||
  //Turn passed Object into a string for storage
  let strEntry = JSON.stringify(obj);

  //Push it on to the session users journal
  let key = obj.getType() + obj.getDate() + obj.getTime();
  
  // -------------------------------------------------------------JavaScript - Arrays Ex. 2||
  sessionUser.journal[key] = strEntry;

  // -------------------------------------------------------------JSON - Stringify Ex. 3||
  sessionUserStr=JSON.stringify(sessionUser);
  
  //overide the stored useer.
  localStorage.setItem(sessionUser.getName()+sessionUser.getPin(), sessionUserStr);
}

/*
FUNCTION RETREIVE ALL DATA
  Returns all the objects in local storage as an array. 
*/
function retreiveAllData() {

  // -------------------------------------------------------------JavaScript - Arrays Ex. 2||
  let data = [];
 // -------------------------------------------------------------JavaScript - Loop Ex. 1||
 // -------------------------------------------------------------JavaScript - Arrays (Associate) Ex. 3||
  for (entry in sessionUser.journal) {

    // -------------------------------------------------------------JSON - Parse Ex. 1||
    let obj = JSON.parse(sessionUser.journal[entry])

    data.push(obj);

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
   // -------------------------------------------------------------DOM Manipulation - Remove Ex. 1||
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

/*
FUNCTION SORT BY DATE
  Custom array sort funtion that sorts entries by date. 
*/
// -------------------------------------------------------------JavaScript - Parameters Ex. 3||
function sortByDate(a, b) {
  let comparison = 0;

  // -------------------------------------------------------------JavaScript - Conditional Statments Ex. 3||
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
function sortByTime(a, b) {
  let comparison = 0;
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

  //Retrieve all the sessions journal in the form of an array;
  let journal = retreiveAllData();
   // -------------------------------------------------------------JavaScript - Arrays Ex. 3||
  let sortedByTime = journal.sort(sortByTime);
  let sortedJournal = sortedByTime.sort(sortByDate);
  let date = "";
  let time = "";

  // -------------------------------------------------------------DOM Manipulation - Create & Append Ex. 2||
  let printHeading = document.createElement("H1");
  let text = document.createTextNode("Journal");
  printHeading.appendChild(text);
  document.getElementById("list").appendChild(printHeading);


 // -------------------------------------------------------------JavaScript - Parameters Ex. 2||
  for (let i = 0; i < sortedJournal.length; i++) {

    let rowDAO = sortedJournal[i];  
    if (date == rowDAO.date) {
      //Do nothing
    } else {
        // -------------------------------------------------------------DOM Manipulation - Create & Append Ex. 3||
      printDate = document.createElement("H2");
      text = document.createTextNode(rowDAO.date);
      printDate.appendChild(text);
      document.getElementById("list").appendChild(printDate);
      date = rowDAO.date;
    }

    if (time == rowDAO.time) {
      //Do nothing
    } else {
      
      // -------------------------------------------------------------DOM Manipulation - Create & Append Ex. 3||
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