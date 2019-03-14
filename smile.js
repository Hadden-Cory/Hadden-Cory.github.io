/*********************************
 * SMILE FACE DRAW
 * Takes face sent to it and finds 
 * the instruction &/or filename
 * to draw it on the canvas. 
 * *******************************/
function smileyFaceDraw(face) {

  //Find a random spot on the canvas
  var canvas = document.getElementById("smileyFace");
  var ctx = canvas.getContext("2d");
  var x = 50 + Math.floor(Math.random() * 600);
  var y = 50 + Math.floor(Math.random() * 200);

  //Draw image at that spot
  var img = document.getElementById(face);
  ctx.drawImage(img, x, y);
}

/*********************************
 * CGI FACE
 * Randomly draws a new face on
 * on the canvas. 
 * *******************************/
function cgiFace() {
  var canvas = document.getElementById("smileyFace");
  var ctx = canvas.getContext("2d")

  //randomize the drawing location, eyes. and smile.
  var x = 50 + Math.floor(Math.random() * 600);
  var y = 50 + Math.floor(Math.random() * 200);
  var eyeSpacing = 7 + Math.floor(Math.random() * 7);
  var eyeSizing = 1 + Math.floor(Math.random() * 5);
  var smileSize = 5 + Math.floor(Math.random() * 23);

  //build head
  ctx.beginPath();
  ctx.arc(x, y, 40, 0, 2 * Math.PI);
  ctx.stroke();

  //build eyes1
  ctx.beginPath();
  ctx.arc((x - eyeSpacing), (y - 10), eyeSizing, 0, 2 * Math.PI);
  ctx.stroke();

  //build eyes2
  ctx.beginPath();
  ctx.arc((x + eyeSpacing), (y - 10), eyeSizing, 0, 2 * Math.PI);
  ctx.stroke();

  //build smile
  ctx.beginPath();
  ctx.arc(x, (y + 5), smileSize, 0, 1 * Math.PI);
  ctx.stroke();
}

/*********************************
 * Clear Canvas
 * Paints over all the smiles
 * *******************************/
function clearCanvas() {
  //find canvas
  var canvas = document.getElementById("smileyFace");
  var ctx = canvas.getContext("2d")

  //fill canvas with white stuff
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(-10, -10, 8000, 8000);

}