//Our API: https://random.dog/woof.json'

/** namey */
window.namey = {

  /*
   * Lightweight JSONP fetcher
   * Copyright 2010 Erik Karlsson. All rights reserved.
   * BSD licensed
   */
  // Lightweight JSONP fetcher - www.nonobtrusive.com
  jsonP: (function () {
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
      i.onload = i.onreadystatechange = function () {
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
      d[i] = function (l) {
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
  get: function (options) {
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
      };

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

    this.jsonP.get('//' + host + '/name.json', tmp_params, function (d) {
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
let dayoOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturady'];
let monthOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', "October", 'November', 'December'];
let dogBank = [];
let callbackCount = 0;
let dogSelection = 0;

window.addEventListener('load', function () {

  console.log('window loaded')

  if (!location.hash || dogBank.length == 0){
    console.log('unset location hash. Hash defaulted to #dogGo');
    location.hash = "#dogGo_List";
  }

  let fido0 = new Dog();
  let fido1 = new Dog();
  let fido2 = new Dog();
  initDog(fido0, fetchName, fetchPicture);
  initDog(fido1, fetchName, fetchPicture);
  initDog(fido2, fetchName, fetchPicture);

  setContent();
}, false);

window.addEventListener('hashchange', setContent, false);

function setContent() {

  console.log("HashChangeEvent Registared");

  let route = location.hash;

  if (route == "#dogGo_Cart" || route == "#dogGo_Dog" || route == "#dogGo_List") {

    console.log("Hash identified as " + route + ". Initiating AJAX")
    displayContent(route, function (content) {
      console.log("inserting new content");
      document.getElementById("content").innerHTML = content;

      if (route == "#dogGo_List") {
        if (callbackCount > 3) {
          dogBank.forEach(buildList);
          console.log(dogBank);
        }
      } else if (route == "#dogGo_Dog") {
        buildDetailPage(dogSelection);
      } else {
        console.log("Hash unidentified. AJAX not called")
        document.getElementById("content").innerHTML = "Oops! Content Not Found";
      }
    });
  }
}

function displayContent(site, callback) {

  let xhttp = new XMLHttpRequest();

  xhttp.addEventListener("load", function () {
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
    let price = this.price;
    this.price = price + 5;

    this.setHighestBidder();
  }

  setHighestBidder(){
    if (this.price > this.bidCeiling) {
      this.highestBidder = "current User";
    } else {
      document.getElementById('price').innerHTML = 'Current Bid $' + this.price;
      document.getElementById('highestbidder').innerHTML = "You are the highest bidder";
      setTimeout(function(){
      document.getElementById('highestbidder').innerHTML = "Counter Bid +$5";
      this.price = this.price + 5;
      console.log(this.price);
      this.highestBidder = "computer";

      },1500);      
      setTimeout(function(){
      document.getElementById('price').innerHTML = 'Current Bid $' + this.price;
      document.getElementById('highestbidder').innerHTML = "You are not the highest bidder";
      },2200);

    }
  }
}

function fetchName(dog) {
  namey.get(function (n) {
    dog.setName(n[0]);
  });
}

function fetchPicture(dog) {
  const url = 'https://random.dog/woof.json';
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      let pictureObj = JSON.parse(this.responseText);
      let isMovie = /.mp4/;
      let isWebm = /.webm/;
      if (!isMovie.test(pictureObj['url']) && !isWebm.test(pictureObj['url'])) {
        dog.setPicture(pictureObj['url']);
        callbackCount++;
        console.log(dog);

        if (callbackCount == 3) {
          dogBank.forEach(buildList);
        }
      } else {
        fetchPicture(dog);
      }
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
}

function setDogSelection(index) {
  dogSelection = index;
  location.hash = '#dogGo_Dog'
}

function randomDate() {
  let num = (Math.floor(Math.random() * 400) % 7) + 1;
  let rndDate = new Date();
  let newDate = rndDate.getDate() + num;
  rndDate.setDate(newDate);
  rndDate.setHours(23, 59, 59)
  return rndDate;
}

function randomPrice() {
  let num = ((Math.floor(Math.random() * 1400 % 10) * 100) + 100);
  console.log(num);
  console.log("36 "+(num+5));
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

  let date = 'dog' + index + 'date';
  let price = 'dog' + index + 'price';
  let picture = 'dog' + index + 'picture';

  document.getElementById(date).innerHTML = "Ends " + dayoOfWeek[value.date.getDay()] + ", " + monthOfYear[value.date.getMonth()] + " " + value.date.getDate();
  document.getElementById(price).innerHTML = '$' + value.price;

  let dog = document.getElementById('dog' + index);
  let table = document.getElementById('dog' + index + 'table');
  let loader = document.getElementById('loader' + index);

  dog.removeChild(loader);
  table.classList.remove('collapsed');
  let img = document.createElement("img");
  img.src = value.picture;
  img.className = 'thumbnail';
  let thumbnail = document.getElementById(picture);
  thumbnail.appendChild(img);
  callbackCount++;
}


function buildDetailPage(index) {
  console.log('dog ' + index + ' page');

  dog = dogBank[index];
  let img = document.createElement("img");
  img.src = dog.picture;
  img.className = 'picture';
  let parent = document.getElementById('dogDetails');
  parent.appendChild(img);

  document.getElementById('name').innerHTML = dog.name;
  document.getElementById('date').innerHTML = "Ends " + dayoOfWeek[dog.date.getDay()] + ", " + monthOfYear[dog.date.getMonth()] + " " + dog.date.getDate();
  document.getElementById('description').innerHTML = dog.description;
  document.getElementById('price').innerHTML = 'Current Bid $' + dog.price;
  // if (dog.highestBidder == 'computer') {
  //   document.getElementById('highestbidder').innerHTML = "You are not the highest bidder";
  // } else {
  //   document.getElementById('highestbidder').innerHTML = "You are the highest bidder";
  // }

}

function bid5(){
  dogBank[dogSelection].bid();
}