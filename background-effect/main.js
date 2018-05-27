// var mousePosition = document.addEventListener(click, trackMouse);


window.addEventListener("click", function(e){
    var xCoord = e.clientX;
    var yCoord = e.clientY;
    var waveA = document.querySelector("#wave-a");
    waveA.style.left = xCoord + "px";
    waveA.style.top = yCoord + "px";
    
    // setTimeout(() => {
    //     var i =+ 1;
    //     waveA.style.height = i + "px";

    // }, 100);
    
    waveGrow();
    function waveGrow () {
        var i;
        waveA.style.height = i + "px";
        
        if (i <= 500) {
          this.setTimeout(waveGrow, 100);
          i += 1;
        };
        console.log (i);
        
    } 

    console.log (xCoord +" AND ") ;
})

