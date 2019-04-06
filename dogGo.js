//Our API: https://random.dog/woof.json


class Dog{
    constructor(name, date, price, description, bidCeiling){
        this.name = name;
        this.date = date;
        this.price = price;
        this.description = description;
        this.highestBidder = "computer";
        this.bidCeiling = bidCeiling;
    }

    bid(){
        this.price = this.price + 5;
        setHighestBidder();
    }

    setHighestBidder(){
        if (this.price > this.bidCeiling){
            this.highestBidder = "current User";
        } else {
            this.price = this.price + 5;
            this.highestBidder = "computer";
        }
    }
}

