/*************************************************************
 ****************************DOG-GO*************************** 
 *************************************************************/

/************************************************************
 * DOG-GO is a computer generated dog auction. It pulls data 
 * for two APIs to build random dogs and sell them. It also 
 * randomly bids against you, keeps track of all your bids 
 * (even if you leave the page), and has some pretty funky
 * shopping music. 
 * 
 * Again, I have left tags to make grading easy, but to 
 * avoid being verbrose will limit the number of tags I 
 * leave.
 * 
 * Cory Hadden, 4/12/19
 * *********************************************************/

/***********************************************************
 * THe following code came with the documentation for the 
 * name generater API. Jump to line 165 where my code starts
 * *********************************************************/

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
        } catch (m) { }
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

/************************
 *MY CODE FROM HERE ON
 * ||      ||       ||
 * \/      \/       \/
 ************************/

/************************
 ********GLOBALS*********
 ************************/
let descriptBank = [
  "This one's a killer, great guard dog",
  "Great with kids, no shedding.",
  "Loves other dogs, very good compainion.",
  "Smart work dog, used to heard sheep.",
  "Originally owned by the queen.",
  "National Dog show winner.",
  "Eats bad guys.",
  "Best accessory for this summer!",
  "Can't keep, has a licker problem.",
  "Once killed three bears with death glare.",
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

//reference tables
let dayoOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturady'];
let monthOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', "October", 'November', 'December'];

//Dog Memory
let dogBank = [];
let dogSelection = 0;

//Helps Regulate Async Opperations
let callbackCount = 0;


/************************
 ****Event*Listeners*****
 ************************/

 //Load page
window.addEventListener('load', function () {

  console.log('window loaded');
  
  //If redirect to the main fragment if the app isn't ready yet
  if (!location.hash || dogBank.length == 0) {
    console.log('unset location hash. Hash defaulted to #dogGo');
    location.hash = "#dogGo_List";
  }

  //Populate views
  setContent();

}, false);

//Change views
window.addEventListener('hashchange', setContent, false);


/************************
 ******Prototypes********
 ************************/
class Dog {

  constructor() {
    this.name = "unnamed";
    this.date = randomDate();
    this.price = randomPrice();
    this.description = randomDescription();
    this.highestBidder = "computer";
    this.bidCeiling = (Math.floor(Math.random() * 1000 % 10) * 10) + this.price;
    this.picture = "loading.gif";
    this.biddedOn = false;
  }

  setName(name) {
    this.name = name;
  }

  setPicture(url) {
    this.picture = url;
  }

  bid() {
    this.biddedOn = true;
    let price = this.price;
    this.price = price + 5;

    this.setHighestBidder();
  }

  setHighestBidder() {
    
    //Random time before the computer will bid againt you.
    let timeSeed = (Math.floor(Math.random() * 40000) % 4000);

    //Message Area
    let bidding = document.getElementById('highestbidder');

    //Render price
    document.getElementById('price').innerHTML = 'Current Bid $' + this.price;
      
    //Render auction status
    bidding.innerHTML = "You are the highest bidder!";

    //Color green for winning and red for loosing
    bidding.classList.remove('loosing');
    bidding.classList.add('winning');

    //if we bid past the computers biding theshold
    if (this.price > this.bidCeiling) {
      
      this.highestBidder = "Current User";

    } else {//if the computer still has some budget to bid

      //Wait a random amount of time
      setTimeout(function () {
        
        //Computer ups the bid
        this.price = this.price + 5;

        //Render the counter bid and change message area color 
        bidding.innerHTML = "Counter Bid +$5";
        bidding.classList.remove('winning');
        bidding.classList.add('loosing');

        this.highestBidder = "computer";

      }, timeSeed);

      //Wait 1.5 seconds before replacing the counter bid message the "your loosing the auction" mesage
      setTimeout(function () {
        document.getElementById('price').innerHTML = 'Current Bid $' + price;
        document.getElementById('highestbidder').innerHTML = "You are not the highest bidder";
      }, (timeSeed + 1500));
    }
  }
}

/************************
 *****Meat*Functions*****
 ************************/

/*
FUNCTION SET CONTENT
  Controls the dynamic content of each fragment
*/
function setContent() {

  //If we don't have any dogs loaded, make 3;
  if (!location.hash || dogBank.length == 0) {
    
    //Used to restrict rendering the page until async opperations are complete  
    callbackCount = 0;

    //build 3 dogs
    let fido0 = new Dog();
    let fido1 = new Dog();
    let fido2 = new Dog();
    
    //Assign pictures, names, and store in dogBank
    initDog(fido0, fetchName, fetchPicture);
    initDog(fido1, fetchName, fetchPicture);
    initDog(fido2, fetchName, fetchPicture);
  }

  console.log("HashChangeEvent Registared");

  let route = location.hash;

  //We set a timeout give time for the animations.
  setTimeout(function () {

    //Load fragments
    if (route == "#dogGo_Cart" || route == "#dogGo_Dog" || route == "#dogGo_List") {

      console.log("Hash identified as " + route + ". Initiating AJAX")
     
      displayContent(route, function (content) {
        
        console.log("inserting new content");
        document.getElementById("content").innerHTML = content;

        //Fragmant Specific Instructions
        if (route == "#dogGo_List") {

          //Wait till we have all the pictures loaded before rendering.
          if (callbackCount > 3) {

            //Render List Page
            dogBank.forEach(buildList);
          }
        } else if (route == "#dogGo_Dog") {
          buildDetailPage(dogSelection); //Render dog's details/bid page
        } else if (route == "#dogGo_Cart") {
          {
            //Sort ands render the whole bid history 
            for (var i = 0; i < localStorage.length; i++) {
              buildCart(localStorage.getItem(localStorage.key(i)))
            }
          }

        } else if(location.hash == '#null'){
          
          //do nothing, Used for a quick reset of the list without refreshing in loadMoreDogs().
       
        } else {

          //Error Handling
          console.log("Hash unidentified. AJAX not called")
          document.getElementById("content").innerHTML = "Oops! Content Not Found";
        }
      });
    }
  }, 185)//The timeout time for out animation 185ms
}

/*
FUNCTION DISPLAY CONTENT
  AJAX Controler that loads in each fragment
*/
function displayContent(fragment, callback) {

  let xhttp = new XMLHttpRequest();

  //Send response once we are doen loading
  xhttp.addEventListener("load", function () {
    callback(xhttp.responseText);
  }, false);

  //Pull off thr '#' and append a '.html'
  fragment = fragment.substr(1);
  let ajaxUrl = fragment + '.html';

  //get the fragment
  xhttp.open("GET", ajaxUrl);
  xhttp.send(null);
}

/*
FUNCTION FETCH NAME 
  Accepts a dog and sets its name with the Random name API
*/
function fetchName(dog) {
  namey.get(function (n) {
    dog.setName(n[0]);
  });
}

/*
FUNCTION FETCH PICTURE
  Accepts a dog and sets its picture with the random dog picture API
*/
function fetchPicture(dog) {

  const url = 'https://random.dog/woof.json';
  
  //Plain vanilla AJAX
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      let pictureObj = JSON.parse(this.responseText);
      
      //We'll use these regex expressions to filter out unwanted file types from the API
      let isMovie = /.mp4/;
      let isWebm = /.webm/;

      //IF the response is not a restricted file type, use it as the dog's picture
      if (!isMovie.test(pictureObj['url']) && !isWebm.test(pictureObj['url'])) {
        dog.setPicture(pictureObj['url']);
        callbackCount++;

        //IF we have all the pictures back from the API, then store everyone in the dog bank
        if (callbackCount == 3) {
          dogBank.forEach(buildList);
        }

      } else { //IF the response was a unwanted file type
        
        //Go fish
        fetchPicture(dog);
      }
    }
  };

  //Send the Request
  xhttp.open("GET", url, true);
  xhttp.send();
}

/*
FUNCTION INITIALIZE DOG
  Async coordinating function that accepts a dog and sets its picture and name.
*/
function initDog(dog, callback0, callback1) {
  dog.setName('Loading');
  callback0(dog);
  callback1(dog);
  dogBank.push(dog);
}

/*
FUNCTION SET DOG SELECTION
  This function sets ths global dog selector as an easy for functions to agree on which dog to manipulate and directs us to the appropriate dog deatil page.
*/
function setDogSelection(index) {
  dogSelection = index;
  location.hash = '#dogGo_Dog'
}

/*
FUNCTION RANDOM DATE
  Returns a random date (right before midnight) when the auction will end. Limits dates to a certain range
*/
function randomDate() {
  let num = (Math.floor(Math.random() * 400) % 7) + 1;
  let rndDate = new Date();
  let newDate = rndDate.getDate() + num;
  rndDate.setDate(newDate);
  rndDate.setHours(23, 59, 59)
  return rndDate;
}

/*
FUNCTION RANDOM PRICE
  Returns a random price within a certain range
*/
function randomPrice() {
  let num = ((Math.floor(Math.random() * 1400 % 10) * 100) + 100);
  return num;
}

/*
FUNCTION RANDOM DESCRIPTION
  Returns a random description from the bank near line 165
*/
function randomDescription() {

  var num = ((Math.floor(Math.random() * 400) % 20) + 1)
  return descriptBank[num];

}

/*
FUNCTION BUILD LIST
  Populates the List fragment
*/
function buildList(value, index, array) {

  //Element selectors
  let date = 'dog' + index + 'date';
  let price = 'dog' + index + 'price';
  let picture = 'dog' + index + 'picture';

  //Render end date and price, color price if winning or loosing auction
  document.getElementById(date).innerHTML = "Ends " + dayoOfWeek[value.date.getDay()] + ", " + monthOfYear[value.date.getMonth()] + " " + value.date.getDate();
  document.getElementById(price).innerHTML = '$' + value.price;
  if (value.highestBidder == "Current User") {
    document.getElementById(price).classList.add('winning');
    document.getElementById(price).classList.remove('loosing');
  } else if (value.biddedOn) {
    document.getElementById(price).classList.add('loosing');
  }

  //Element selector
  let table = document.getElementById('dog' + index + 'table');

  //Hide loading symbol
  document.getElementById('loader'+index).classList.add('collapsed');

  //Expand table
  table.classList.remove('collapsed');
  
  //Add dog's picture 
  let img = document.createElement("img");
  img.src = value.picture;
  img.className = 'thumbnail';
  let thumbnail = document.getElementById(picture);
  thumbnail.appendChild(img);

  //Advance callback counter 
  callbackCount++;
}

/*
FUNCTION BUILD DETAIL PAGE
  Populates the selected Dog's detail fragment.
*/
function buildDetailPage(index, hasBid) {
  
  let dog = null;

  if (hasBid) {
    dog = localStorage.getItem()
  } else {
    dog = dogBank[index];
  }

  //Add picture
  let img = document.createElement("img");
  img.src = dog.picture;
  img.className = 'picture';
  let parent = document.getElementById('dogDetails');
  parent.appendChild(img);

  //Render dog details
  document.getElementById('name').innerHTML = dog.name;
  document.getElementById('date').innerHTML = "Ends " + dayoOfWeek[dog.date.getDay()] + ", " + monthOfYear[dog.date.getMonth()] + " " + dog.date.getDate();
  document.getElementById('description').innerHTML = dog.description;
  document.getElementById('price').innerHTML = 'Current Bid $' + dog.price;
  if (dog.highestBidder == 'computer') {
    document.getElementById('highestbidder').innerHTML = "You are not the highest bidder";
    document.getElementById('highestbidder').classList.add('loosing');
    document.getElementById('highestbidder').classList.remove('winning');
  } else {
    document.getElementById('highestbidder').innerHTML = "You are the highest bidder";
    document.getElementById('highestbidder').classList.remove('loosing');
    document.getElementById('highestbidder').classList.add('winning');
  }

}

/*
FUNCTION BID 5
  Calls the dog's native bid methods and saves or saves over the dog in local storage
*/
function bid5() {
  let dog = dogBank[dogSelection];
  dog.bid();

  //Now that the biding is done prepare and store the dog for the long term
  let dogStr = JSON.stringify(dog);
  localStorage.setItem(dog.name + dog.date, dogStr);
}

/*
FUNCTION BUILD CART
  Organizes and populates the selected user's shopping cart fragment.
*/
function buildCart(dogStr) {

  //unpack the stringified JSON we were passed, reset the date to a usable data type, and check todays date so that we know when and auction is expired.
  let dog = JSON.parse(dogStr);
  let date = new Date(dog.date);
  let now = new Date();

  //Element selectors
  let div = document.createElement("div");
  let text = document.createElement("h1");

  //Render the dogs bid history card
  text.innerHTML = '<table><tr><td id="picture' + dog.name + date + '"></td><td><h1>' + dog.name + '</h1><h3>' + dog.description + '</h3><h3>' + dayoOfWeek[date.getDay()] + ", " + monthOfYear[date.getMonth()] + " " + date.getDate() + '</h3><h1 id="price' + dog.name + date + '">$' + dog.price + '</h1></td></tr></table>';
  div.className = 'banner';

  //Organize the dog by won, lost, winning, and loosing
  let parent = null;
  if (dog.highestBidder == "Current User" && date > now) {
    parent = document.getElementById('winningContainer');
    document.getElementById('winningContainer').classList.remove('collapsed');
  } else if (dog.highestBidder == "computer" && date > now) {
    parent = document.getElementById('loosingContainer');
    document.getElementById('loosingContainer').classList.remove('collapsed');
  } else if (dog.highestBidder == "Current User" && date <= now) {
    parent = document.getElementById('wonContainer')
    document.getElementById('wonContainer').classList.remove('collapsed');
  } else {
    parent = document.getElementById('lostContainer')
    document.getElementById('lostContainer').classList.remove('collapsed');
  }

  //Attach the card to the document
  div.appendChild(text);
  parent.appendChild(div);
  
  //Insert the dogs picture
  let img = document.createElement("img");
  img.src = dog.picture;
  img.className = 'picture';
  parent = document.getElementById('picture' + dog.name + date);
  parent.appendChild(img);

  //Color proce based on win/lose status
  if (dog.highestBidder == "Current User") {
    document.getElementById("price" + dog.name + date).classList.add('winning');
    document.getElementById("price" + dog.name + date).classList.remove('loosing');
  } else {
    document.getElementById("price" + dog.name + date).classList.add('loosing');
    document.getElementById("price" + dog.name + date).classList.remove('winning');
  }

}

/*
FUNCTION PRESSED
  Animates a button push
*/
function pressed(element) {
  element.classList.add('pressed');
  setTimeout(function () {
    element.classList.remove('pressed');
  }, 65);
}

/*
FUNCTION LOAD PAGE
  Animates a fragment load
*/
function loadPage(element) {
  setTimeout(function () {
    element.classList.add('loadPage');
    setTimeout(function () {
      element.classList.remove('loadPage');
    }, 186);
  }, 75);
}

/*
FUNCTION LOAD MORE DOGS
  Resets dog bank and builds three new dogs to bis on
*/
function loadMoreDogs() {
  
  //Hide the current list and restore the loading symbol
  for (let i = 0; i < 3; i++) {
    console.log(i+ ' For');
    document.getElementById('loader'+i).classList.remove('collapsed');
    document.getElementById('dog'+i+'table').classList.add('collapsed');
    }
  
  //Reset dog bank
  dogBank = null;
  dogBank = [];

  //Reload the list by unloading and reloading the fragment
  location.hash = '#null';
  location.hash = '#dogGo_List';
}