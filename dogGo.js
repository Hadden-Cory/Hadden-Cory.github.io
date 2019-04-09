//Our API: https://random.dog/woof.json'

/** namey */
window.namey = {

  /*
   * Lightweight JSONP fetcher
   * Copyright 2010 Erik Karlsson. All rights reserved.
   * BSD licensed
   */
  // Lightweight JSONP fetcher - www.nonobtrusive.com
  jsonP: (function() {
    var a = 0,
      c,
      f,
      b,
      d = this;
    function e(j) {
      var i = document.createElement("script"),
        h = false;
      i.src = j;
      i.async = true;
      i.onload = i.onreadystatechange = function() {
        if (!h && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
          h = true;
          i.onload = i.onreadystatechange = null;
          if (i && i.parentNode) {
            i.parentNode.removeChild(i)
          }
        }
      };
      if (!c) {
        c = document.getElementsByTagName("head")[0]
      }
      c.appendChild(i)
    }

    function g(h, j, k) {
      f = "?";
      j = j || {};
      for (b in j) {
        if (j.hasOwnProperty(b)) {
          f += encodeURIComponent(b) + "=" + encodeURIComponent(j[b]) + "&"
        }
      }
      var i = "json" + (++a);
      d[i] = function(l) {
        k(l);
        try {
          delete d[i]
        } catch (m) {}
        d[i] = null;
      };
      e(h + f + "callback=" + i);
      return i
    }
    return {
      get: g
    }
  }()),

  /**
   * API for namey random name generator.  There's two basic ways to use it.  First, just call namey.get with a callback:
   *
   * namey.get(function(n) { console.log(n); }); => ["John Clark"]
   *
   * The call returns an array because there's an option to request more than one random name. For example:
   *
   * namey.get({ count: 3, callback: function(n) { console.log(n); }}); ; => ["John Cook", "Ruth Fisher", "Donna Collins"]
   *
   * Here's the full list of parameters:
   * 
   * count -- how many names you would like (default: 1)
   *
   * type -- what sort of name you want 'female', 'male', 'surname', or leave blank if you want both genders
   *
   * with_surname -- true/false, if you want surnames with the first
   * name. If false, you'll just get first names.  Default is true.
   *
   * frequency -- 'common', 'rare', 'all' -- default is 'common'. This
   * picks a subset of names from the database -- common names are
   * names that occur frequently, rare is names that occur rarely.
   * 
   * min_freq/max_freq  -- specific values to get back a really
   * specific subset of the names db. values should be between 0 and
   * 100. You probably don't need this, but here's an example:
   * namey.get({ count: 3, min_freq: 30, max_freq: 50, callback: function(n) { console.log(n); }});
   * => ["Crystal Zimmerman", "Joshua Rivas", "Tina Bryan"]
   *
   * callback -- a function to do something with the data.  The data
   * passed in will be an array of names -- use them wisely.
   * 
   */
  get: function(options) {
    var callback;
    var tmp_params = {};
    var host = "namey.muffinlabs.com";
    //var host = window.location.host;

    if (typeof (options) == "function") {
      callback = options;
    } else if (typeof (options) == "object") {
      callback = options.callback;

      if (typeof (options.host) !== "undefined") {
        host = options.host;
      }

      if (typeof (options.count) == "undefined") {
        options.count = 1;
      }
      tmp_params.count = options.count;

      if (typeof (options.type) != "undefined" && options.type != "both") {
        tmp_params.type = options.type;
      }
      ;

      if (options.type != "surname" && typeof (options.with_surname) != "undefined") {
        tmp_params.with_surname = options.with_surname;
      }
      if (options.min_freq) {
        tmp_params.min_freq = options.min_freq;
        tmp_params.max_freq = options.max_freq;
      } else if (typeof (options.frequency) != "undefined") {
        tmp_params.frequency = options.frequency;
      }

    }

    this.jsonP.get('//' + host + '/name.json', tmp_params, function(d) {
      if (typeof (callback) == "function") {
        callback(d);
      } else {
        console.log(d);
      }
    });
  }
}

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
  "You'll love me!- This Dog",
  "Speaks fluent French and Italian."
]
let dogBank = [];

window.addEventListener('load', function() {

  console.log('window loaded')

  if (!location.hash) {
    console.log('unset location hash. Hash defaulted to #dogGo');
    location.hash = "#dogGo_List";
  }

  setContent();

  let fido0 = new Dog();
  let fido1 = new Dog();
  let fido2 = new Dog();
  initDog(fido0, fetchName, fetchPicture);
  initDog(fido1, fetchName, fetchPicture);
  initDog(fido2, fetchName, fetchPicture);
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
      if (location.hash == "#dogGo_List") {
        setTimeout(function(){dogBank.forEach(buildList);},3000);
      }
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
  constructor() {
    this.name = "unnamed";
    this.date = randomDate();
    this.price = randomPrice();
    this.description = randomDescription();
    this.highestBidder = "computer";
    this.bidCeiling = (Math.floor(Math.random() * 1000 % 10) * 10) + this.price;
    this.picture = "loading.gif";
  }

  setName(name) {
    this.name = name;
  }

  setPicture(url) {
    this.picture = url;
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

function fetchName(dog) {
  namey.get(function(n) {
    dog.setName(n[0]);
  });
}

function fetchPicture(dog) {
  const url = 'https://random.dog/woof.json';
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
      let pictureObj = JSON.parse(this.responseText);
      dog.setPicture(pictureObj['url']);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function initDog(dog, callback0, callback1) {
  dog.setName('Loading');
  callback0(dog);
  callback1(dog);
  dogBank.push(dog);
  console.log(dogBank);
}



function randomDate() {
  var num = (Math.floor(Math.random() * 400) % 7) + 1;
  let rndDate = new Date();
  let newDate = rndDate.getDate() + num;
  rndDate.setDate(newDate);
  return rndDate;
}

function randomPrice() {
  var num = ((Math.floor(Math.random() * 1400 % 10) * 100) + 100);
  return num;
}

function randomDescription() {

  var num = ((Math.floor(Math.random() * 400) % 20) + 1)
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

function buildList(value, index, array) {
  let dayoOfWeek=['Sunday','Monday', 'Tuesday','Wednesday','Thursday','Friday', 'Saturady'];
  let monthOfYear=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', "October", 'November', 'December'];

  let date = 'dog' + index + 'date';
  let price = 'dog' + index + 'price';
  let picture = 'dog' + index + 'picture';
  console.log(date + ", " + price + ", " + picture)
  document.getElementById(date).innerHTML = dayoOfWeek[value.date.getDay()] + ", " + monthOfYear[value.date.getMonth()]+" "+value.date.getDate();
  document.getElementById(price).innerHTML = '$'+value.price; 
  
  let img = document.createElement("img");
  img.src = value.picture;
  let thumbnail = document.getElementById(picture);
  thumbnail.appendChild(img);
// document.getElementById(picture).innerHTML = "<img scr='"+value.picture+"' class='thumbnail' alt='thumbnail of dog'>";
// console.log("<img scr='"+value.picture+"' class='thumbnail' alt='thumbnail of dog'>"); 
}