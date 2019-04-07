//Our API: https://random.dog/woof.json'

window.addEventListener('load', function () {

    console.log('window loaded')

    if (!location.hash) {
        console.log('unset location hash. Hash defaulted to #dogGo');
        location.hash = "#dogGo_List";
    }

    randomDescription();
    setContent();

}, false);

window.addEventListener('hashchange', setContent, false);

function setContent() {

    console.log("HashChangeEvent Registared");

    let route = location.hash;

    if (route == "#dogGo_Cart" || route == "#dogGo_Dog" || route == "#dogGo_List") {

        console.log("Hash identified as" + location.hash + ". Initiating AJAX")
        displayContent(location.hash, function (content) {
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
    constructor(name, description, bidCeiling) {
        this.name = name;
        this.date = randomDate();
        this.price = randomPrice();
        this.description = description;
        this.highestBidder = "computer";
        this.bidCeiling = bidCeiling;
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
    console.log(num);
}

function randomDescription() {
console.log('entered random description')
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log('in xhttp')
            let descriptions = JSON.parse(this.responseText);
        }};
        xhttp.open("GET", "descriptions.json", true);
        xhttp.send();

        var num = (Math.floor(Math.random() * 400) % 7)

        console.log(descriptions[num]);
        return descriptions[num];
    }