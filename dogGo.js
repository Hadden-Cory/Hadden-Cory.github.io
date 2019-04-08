//Our API: https://random.dog/woof.json'

let descriptBank = [
    "This one's a killer, great guard dog", 
    "Great with kids, no shedding.", 
    "Loves other dogs, very good compainion.",
    "Smart work dog, used to heard sheep.",
    "Originally owned by the queen.",
    "National Dog show winning.",
    "Eats bad guys.",
    "Best accessory for this summer!",
    "Can't keep him, he has a licker problem.",
    "Once killed three bears with his death glare.",
    "Cute, Energetic, Potty Trained",
    "Runs half marathons with me.",
    "Was my favorite sled dog till it broke a toenail",
    "Retired K-9 Unit Dog",
    "Good family dog, really well behaved",
    "Lap dog for single elderly owner.",
    "Not your average hound! *winky face*",
    "Great bird dog!",
    "You love me!- This Dog",
    "Speaks fluent French and Italian."
]

window.addEventListener('load', function() {

  console.log('window loaded')

  if (!location.hash) {
    console.log('unset location hash. Hash defaulted to #dogGo');
    location.hash = "#dogGo_List";
  }

  randomName();
  setContent();

  let fido = new Dog("Fido");
  console.log(fido);
}, false);

window.addEventListener('hashchange', setContent, false);

function setContent() {

  console.log("HashChangeEvent Registared");

  let route = location.hash;

  if (route == "#dogGo_Cart" || route == "#dogGo_Dog" || route == "#dogGo_List") {

    console.log("Hash identified as " + location.hash + ". Initiating AJAX")
    displayContent(location.hash, function(content) {
      console.log("inserting new content");
      document.getElementById("content").innerHTML = content;
    });

  } else {
    console.log("Hash unidentified. AJAX not called")
    document.getElementById("content").innerHTML = "Oops! Content Not Found";
  }
}

function displayContent(site, callback) {

  let xhttp = new XMLHttpRequest();

  xhttp.addEventListener("load", function() {
    callback(xhttp.responseText);
  }, false);

  site = site.substr(1);
  let ajaxUrl = site + '.html';
  console.log(ajaxUrl);

  xhttp.open("GET", ajaxUrl);
  xhttp.send(null);
}


class Dog {
  constructor(name) {
    this.name = name;
    this.date = randomDate();
    this.price = randomPrice();
    this.description = randomDescription();
    this.highestBidder = "computer";
    this.bidCeiling = (Math.floor(Math.random() * 1000 % 10) * 10) + this.price;
  }

  bid() {
    this.price = this.price + 5;
    setHighestBidder();
  }

  setHighestBidder() {
    if (this.price > this.bidCeiling) {
      this.highestBidder = "current User";
    } else {
      this.price = this.price + 5;
      this.highestBidder = "computer";
    }
  }
}

function randomDate() {
  var num = (Math.floor(Math.random() * 400) % 7) + 1;
  let rndDate = new Date();
  let newDate = rndDate.getDate() + num;
  rndDate.setDate(newDate);
  console.log('randomDate() returned ' + rndDate);
  return rndDate;
}

function randomPrice() {
  var num = ((Math.floor(Math.random() * 1400 % 10) * 100) + 300);
  console.log('randomPrice() returned '+num);
  return num;
}

function randomDescription() {
    
    var num = ((Math.floor(Math.random() * 400) % 20)+1)
    console.log(descriptBank[num]);
    return descriptBank[num];

//   let xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {

//     if (this.readyState == 4 && this.status == 200) {
//         let descriptions = [];
//         descriptions = JSON.parse(this.responseText);
//       var num = ((Math.floor(Math.random() * 400) % 20)+1);
//       num = "description" + num;
//       console.log('randomDescription() returned '+ descriptions[num]);
//       return descriptions[num];
//     }
//   };

//   xhttp.open("GET", "descriptions.json", true);
//   xhttp.send();
}

function randomName(){
    namey.get(function(n) { console.log(n); });
}