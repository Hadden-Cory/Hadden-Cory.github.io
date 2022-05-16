var isHeads = true;


function flip() {
    var num = (Math.floor(Math.random() * 400) % 2);

    displayFlip(num);
    if (num == 1) {
        isHeads = true;
    } else {
        isHeads = false;
    }
}

function displayFlip(num) {
// ---------------------------------------------------------------------------------Animation/Transition Triggered by JS 1||
    document.getElementById("result").innerHTML = "";
    if (isHeads && num == 1) {
        document.getElementById("goldDollar").classList.toggle("flipToSameSide");
        document.getElementById("goldDollarAction").classList.toggle("flipToSameSide");
        setTimeout(function () {
            document.getElementById("result").innerHTML = "Heads";
        }, 1000);

    } else if (isHeads && num == 0) {

        document.getElementById("goldDollar").classList.toggle("flipToOtherSide");
        document.getElementById("goldDollarAction").classList.toggle("flipToOtherSide");
        setTimeout(function () {
            document.getElementById("result").innerHTML = "Tails";
        }, 1000);
    } else if (!isHeads && num == 1) {
        document.getElementById("goldDollar").classList.toggle("flipToOtherSide");
        document.getElementById("goldDollarAction").classList.toggle("flipToOtherSide");
 
        setTimeout(function () {
            document.getElementById("result").innerHTML = "Heads";
        }, 1000);
    } else if (!isHeads && num == 0) {
        document.getElementById("goldDollar").classList.toggle("flipToSameSide");
        document.getElementById("goldDollarAction").classList.toggle("flipToSameSide");
        setTimeout(function () {
            document.getElementById("result").innerHTML = "Tails";
        }, 1000);
    }
}

function inspection() {
    // ---------------------------------------------------------------------------------Animation/Transition Triggered by JS 2||
    document.getElementById("result").innerHTML = "";
    if (isHeads){
        document.getElementById("goldDollarAction").classList.toggle("inspectFront");
    }
    else{
        document.getElementById("goldDollarAction").classList.toggle("inspectBack");
    }

}
// ---------------------------------------------------------------------------------Animation/Transition Triggered by JS 3||
function showPage(){ document.getElementById("content").classList.add("visible");}