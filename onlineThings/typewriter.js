// set up text to print, each item in array is new line
var aText = new Array( "ph" );

function iSpeed() {
    return Math.floor(Math.random()*140) // anywhere between 0-x
}
function lSpeed() {
    return Math.floor(Math.random()*800) // anywhere between 0-x
}

var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines
    
var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter( soundtype = 'character' ) {
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
    var destination = document.getElementById("typedtext");
    
    while ( iRow < iIndex ) {
        sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos);
    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText.length ) {
            iArrLength = aText[iIndex].length;
            setTimeout("typewriter( 'newline' )", lSpeed());
        } else {
            finishWriting();
        }
    } else {
        setTimeout("typewriter( 'character' )", iSpeed());
    }
}

function setupText() {
    // aText = new Array( $("p#typedtext").text() );
    aText = $("p#typedtext").text().split( " BR" )
    iArrLength = aText[0].length; // the length of the text array
    console.log(aText);
}

function run() {
    var s = document.getElementById('endtext').style;
    s.opacity = 0;
    s.display = 'none';
    console.log("run!");
    setupText();
    console.log("setup complete");
    typewriter();
}

function finishWriting() {
    console.log("typewriter complete");
    fadeInDiv();
}

function fadeInDiv() {
    var fadeTarget = document.getElementById("endtext");
    var fakeS = 1;
    var fadeInto = 0.025;
    var fadeDelay = 25;
    fadeTarget.style.display = 'block';

    var fadeEffect = setInterval(function () {
        if (fakeS > 0) {
            fakeS -= fadeInto
            fadeTarget.style.opacity = 1-fakeS;
        } else {
            clearInterval(fadeEffect);
        }
    }, fadeDelay);
}