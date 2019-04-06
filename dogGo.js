//Our API: https://random.dog/woof.json'

window.addEventListener('load', function () {
    
    console.log('window loaded')
    
    if (!location.hash) {
        console.log('unset location hash. Hash defaulted to #dogGo');
        location.hash = "#dogGo";
    }

    setContent();

}, false);

window.addEventListener('hashchange', setContent, false);

function setContent() {

    console.log("HashChangeEvent Registared");

    let displayArea = document.getElementById("content");
    let route = location.hash;

    if (route == "#cart") {

        console.log("Hash identified as '#cart'. Initiating AJAX")
        displayContent(location.hash,displayContent)

    } else {
        console.log("Hash unidentified. AJAX not called")
        displayArea.innerHTML = location.hash;
    }
}

function displayContent(site, callback){
    
    let xhttp = new XMLHttpRequest();
    
    xhttp.onload = function(){
        callback(xhttp.responseText);
    };

    site = site.substr(1);
    let ajaxUrl = site + '.html'; 
    console.log(ajaxUrl);

        xhttp.open("GET", ajaxUrl);
        xhttp.send(null);
    }


class Dog {
    constructor(name, date, price, description, bidCeiling) {
        this.name = name;
        this.date = date;
        this.price = price;
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