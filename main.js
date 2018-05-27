//Calculate window width
//assign cat to var

var catImage = document.querySelector(".cat");
var screenLeftEdge = window.innerWidth - catImage.width;
var body = document.querySelector("body");

// calculate end of screen left position minus cat image width


function walkToLeft () {
    var catPosition = catImage.x;
    catImage.style.transform = "scaleX(1)";
    catImage.style.left = catPosition + 10 + "px";

    if (catPosition <= screenLeftEdge) {
        this.setTimeout (walkToLeft, 10);
    } else {
        console.log ("I'm at the end");
        walkToRight(10);
    };
}

walkToLeft();

function walkToRight () {
    var catPosition = catImage.x;
    catImage.style.transform = "scaleX(-1)";
    catImage.style.left = catPosition - 10 + "px";
        
    if (catPosition >= 0) {
        this.setTimeout(walkToRight, 10);
    }else {
        walkToLeft();
    };

}
