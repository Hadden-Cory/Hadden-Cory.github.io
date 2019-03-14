//---------------------------------------------------------------> Event
document.addEventListener('DOMContentLoad', initilize);

//---------------------------------------------------------------> Array
var validations = [
  "That's aweful!", "So sorry mate!", "Awww!", "Can I help?",
  "You hang in there!", "Disgraceful!", "You deserve better!",
  "You don't need this!", "Your so strong!", " Why, I oughta...!",
  "FOR REALZZ?!!", "I know, I know...", "You inspire me!",
  "Uncalled for!", "Barbaric!", "What the...?", "WOW!",
  "Keep fighting!", "We believe in you!",
  "You're still the best!"
]

//----------------------------------------------------------------> Associative Array, JS Obj.
var smileArray = {
  threeDSmile: "smiles/smile_1.png",
  transparentSmile: "smiles/smile_2.png",
  sideWaysSmile: "smiles/smile_3.png",
  classicSmile: "smiles/smile_4.png",
  greenDSmile: "smiles/smile_5.png",
  laughingSmile: "smiles/smile_6.png",
};

function initilize() { //Aids in document load.

}

//complaint storage
//---------------------------------------------------------------> Variables
var complaintSent = false;
var complaint = "none";
var lastComplaint = "none";
var complaintIsChanged = false;

//---------------------------------------------------------------> JS Functions
/*********************************
 * VALIDATE USER
 * Controls ventilator
 * animations and display.
 * *******************************/
function validateUser() {

  complaint = document.getElementById("complaint").value;

  //---------------------------------------------------------------> CSS Class Edit
  document.getElementById("mainVentArea").classList.add("send");

  //---------------------------------------------------------------> JS Conditional
  if (!complaintSent) { //If we haven't yet sent a complaint.

    storeComplaint(complaint);
    setTimeout(function () { //
      makeValidatersVisible();
      refreshValidaters();
    }, 3500);

  } else if (didComplaintChanged()) { //If the user updated the complaint.
    storeComplaint(complaint);
    setTimeout(function () {
      refreshValidaters()
    }, 3500);
    resetAnimation(document.getElementById("mainVentArea", 6000))

  } else { //If there the complaint is still the same but the user still wants validation.
    refreshValidaters()
  }
  lastComplaint = complaint;
}


/*********************************
 * MAKE VALIDATES VISIBLE
 * Make validation elements  
 * visible in sync w/animations.
 * *******************************/
function makeValidatersVisible() {

  document.getElementById("validationArea").style.opacity = "100";

  setTimeout(function () { //sync with current animation.
    //---------------------------------------------------------------> CSS Class Edit
    document.getElementById("validater0").classList.add("validatee");
    document.getElementById("validater1").classList.add("validatee");
    document.getElementById("validater2").classList.add("validatee");

    document.getElementById("validater0").classList.add("validatee1");
    document.getElementById("validater1").classList.add("validatee1");
    document.getElementById("validater2").classList.add("validatee1");

    document.getElementById("validater0").classList.remove("collasped");
    document.getElementById("validater1").classList.remove("collasped");
    document.getElementById("validater2").classList.remove("collasped");
  }, 500);

  complaintSent = true; //update user input state.
}

/*********************************
 * REFRESH VALIDATERS
 * allows validaters to display 
 * new messages.
 * *******************************/
function refreshValidaters() {
  var botMessage0 = selectMessage();
  var botMessage1 = selectMessage();
  var botMessage2 = selectMessage();

  document.getElementById("validater0").innerHTML = botMessage0;
  document.getElementById("validater1").innerHTML = botMessage1;
  document.getElementById("validater2").innerHTML = botMessage2;

  document.getElementById("btn_vent_text").innerHTML = "More";

  document.getElementById("validater0").classList.toggle('validatee2');
  document.getElementById("validater1").classList.toggle('validatee2');
  document.getElementById("validater2").classList.toggle('validatee2');
}

/*********************************
 * RESET ANIMATION
 * Clear animation so that it can 
 * be replayed.
 * *******************************/
function resetAnimation(item, time) {
  //---------------------------------------------------------------> Animation Trigger
  item.style.animation = 'none';
  setTimeout(function () {
    item.style.animation = '';
  }, time);

}

/*********************************
 * DID COMPLAINT CHANGE.
 * Check state of user input  
 * *******************************/
function didComplaintChanged() {
  complaint = document.getElementById("complaint").value;
  //---------------------------------------------------------------> JS Conditional
  if (complaint == lastComplaint) {
    complaintIsChanged = false
  } else {
    complaintIsChanged = true
  }
  return complaintIsChanged;
}

/**********************************
 * STORE COMPLAINT
 * Saves complaint to local 
 * storage.  
 * *******************************/
function storeComplaint(complaint) {
  if (typeof (Storage) !== "undefined") {
    var timestamp = Date();
    localStorage.setItem(timestamp, complaint);
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
}

/**********************************
 * RETRIEVE COMPLAINT
 * Pulls a complaint from local 
 * storage.  
 * *******************************/
function retrieveComplaint(time) {
  if (typeof (Storage) !== "undefined") {
    return localStorage.getItem(time);
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
}

function loadThreeComplaints() {
  if (typeof (Storage) !== "undefined") {
  for (var i = 0; i < 3; i++){

    var selection = Math.floor(Math.random() * localStorage.length);
    var lcKey = localStorage.key(selection);
    var lcItem = localStorage.getItem(lcKey);
    
    var pTag = document.createElement("P");
    var tNode = document.createTextNode(lcItem);
    pTag.appendChild(tNode);
    document.getElementById("history").appendChild(pTag);
    tNode = document.createTextNode("--Complained: ");
    pTag.appendChild(tNode);
    document.getElementById("history").appendChild(pTag);
    tNode = document.createTextNode(lcKey);
    pTag.appendChild(tNode);
    document.getElementById("history").appendChild(pTag);
  }


  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }
}

/*********************************
 * SELECT MESSAGE
 * Randomly choses a validation 
 * message.
 * *******************************/
function selectMessage() {
  var selection = Math.floor(Math.random() * 20);
  return validations[selection];
}

/*********************************
 * SMILE FACE DRAW
 * Takes face sent to it and finds 
 * the instruction &/or filename
 * to draw it on the canvas. 
 * *******************************/
//---------------------------------------------------------------> JS Parameter
function smileyFaceDraw(face) {

  var canvas = document.getElementById("smileyFace");
  var ctx = canvas.getContext("2d");
  var x = 50 + Math.floor(Math.random() * 600);
  var y = 50 + Math.floor(Math.random() * 200);

  var img = document.getElementById(face);
  ctx.drawImage(img, x, y);
}


function cgiFace() {
  var canvas = document.getElementById("smileyFace");
  var ctx = canvas.getContext("2d")

  var x = 50 + Math.floor(Math.random() * 600);
  var y = 50 + Math.floor(Math.random() * 200);
  var eyeSpacing = 7 + Math.floor(Math.random() * 7);
  var eyeSizing = 1 + Math.floor(Math.random() * 5);
  var smileSize = 5 + Math.floor(Math.random() * 23);

  ctx.beginPath();
  ctx.arc(x, y, 40, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc((x - eyeSpacing), (y - 10), eyeSizing, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc((x + eyeSpacing), (y - 10), eyeSizing, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, (y + 5), smileSize, 0, 1 * Math.PI);
  ctx.stroke();
}

function clearCanvas() {
  var canvas = document.getElementById("smileyFace");
  var ctx = canvas.getContext("2d")

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(-10, -10, 8000, 8000);

}