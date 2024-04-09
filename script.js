const predicates = {
    "A" : (i,j) => (i == 0 && j != 0 && j!= 4) || (i != 0 && (j == 0 || j==4)) || i == 4,
    "B": (i,j) => ((i == 0 ||i == 4 ||i==8) && j != 4) || (j == 0) || (j == 4 && i != 0 && i != 4 && i!=8),
    "C": (i,j) => ((i == 0 || i == 8) && j != 0 && j != 4) || (j == 0 && i!= 0 && i!= 8) || (j == 4 && (i==1 ||i==7) ),
    "D": (i,j) => j == 0 || (j==4 && (i!= 0 && i != 8)) || ((i == 0 ||i==8) && j != 4), 
    "E": (i,j) => i == 0 || i == 4 || i == 8 || j == 0, 
    "F": (i,j) => i == 0 || i == 4 || j == 0, 
    "G": (i,j) => ((i == 0 || i == 8)  && j != 0 && j != 4 ) || (j == 0 && i != 0 && i!= 8) || (j == 4 && ( i==1 || (i  > 4 && i != 8))) || (i == 4 && j != 1 && j != 4) , 
    "H": (i,j) => j == 0 || j == 4 || i == 4, 
    "I": (i,j) => j == 2, 
    "J": (i,j) => (j == 4 && i < 8) || (i==8 && j != 0 && j!= 4) || (j == 0 && i == 6 || i== 7) , 
    "K": (i,j) => j == 0 || j-2 == 3-i ||  i-4 == j , 
    "L": (i,j) => j==0 ||i == 8, 
    "M": (i,j) => j == 0 || j == 4 || (i==2 && j != 2) || i == 3 || (i == 4 && j == 2),  
    "N": (i,j) => j == 0 || j == 4 || Math.abs(i/2-j) < 1, 
    "O": (i,j) => ((j == 0 || j == 4)  && i != 0 && i != 8) || ((i==0 || i == 8) && j != 0 && j!= 4), 
    "P": (i,j) => j == 0 || ((i==0 || i == 4) && j != 4) || (j == 4 && i < 4 && i!= 0),
    "Q": (i,j) => ((j == 0 || j == 4)  && i != 0 && i < 7) || ((i==0 || i == 7) && j != 0 && j!= 4) || (i == 6 && j == 2) || (i == 8 && j == 4), 
    "R": (i,j) => j == 0 || ((i==0 || i == 4) && j != 4) || (j == 4 && i < 4 && i!= 0) || j-1 == i - 5,
    "S": (i,j) => ((i==0 ||i == 8) && j != 0 && j != 4 ) || i - 2 == j || ((j == 0 || j == 4) && (i==1 ||i==2 ||i== 6 ||i==7)), 
    "T": (i,j) => i == 0 || j == 2, 
    "U": (i,j) => j == 0 || j== 4 ||i== 8, 
    "V": (i,j) => Math.abs(i/4-j) < 0.6 ||  Math.abs(4-i/4-j) < 0.6, 
    "W": (i,j) => j == 0 || j == 4 || (i == 4 && j == 2) || i == 5 || (i == 6 && j != 2)  , 
    "X": (i,j) =>  Math.abs(i/2 - j) < 0.6 ||   Math.abs(4-i/2 - j) < 0.6, 
    "Y": (i,j) =>  (i > 3 && j == 2) || (i < 2 && (j == 0 || j == 4)) || (i >=2 && i<4 && (j == 1 || j == 3)), 
    "Z": (i,j) => i==0 || i == 8 ||  Math.abs(4-i/2 - j) < 0.6,
    "0": (i,j) => i == 0 ||i == 8 || j == 0 || j == 4 || (j ==2 && (i>2 && i<6)),
    "1": (i,j) => 4-j == i || j == 4, 
    "2": (i,j) => i == 0 || i == 8 || i == 4 || (j == 0 && i >= 4) || (j==4 && i <= 4), 
    "3": (i,j) => j==4 || i == 0 || i == 4 || i == 8, 
    "4": (i,j) => (j==0 && i<= 4 )||i == 4 || (j==4 && i>=4), 
    "5": (i,j) => i==0 || i == 4 ||i == 8 || (j == 0 && i <=4) || (j == 4 && i >=4), 
    "6": (i,j) => i==0 || j == 0 || i==4 ||i == 8 || (j == 4 && i>=4), 
    "7": (i,j) => i==0 ||j == 4, 
    "8": (i,j) => i == 0 || j== 4 || i == 4 || i == 8 ||j==0, 
    "9": (i,j) => i == 0 || j== 4 || i == 4 || i == 8 || (j == 0 &&  i<=4),
    " ": (i,j) => false,
    ".": (i,j) =>  i >= 7 && j <=1,
    ",": (i,j) =>  (i==7 && j <= 1) || (i==8 && j == 0) || (i==6 && j==1) ,
    "-": (i,j) => i == 4,
};

const board = document.getElementById("board");

var pixelsize = 20;
var charSpacing = 1;
var shownChars = 5;
var text = "HELLO";
var delay = 50;
var bgColor = 'lightgray';
var foreColor = "red";

var buffer;
var rowLen;

var timerEnabled = false;

go();

function init() {
    while(board.children.length>0) {
        board.children[0].remove();
    }

    for (let i = 0; i <  9; i++) {
        var row = document.createElement("div");
        row.className = "dRow";
        for (let j = 0; j < 5*shownChars + (shownChars-1) * charSpacing; j++) {
            var pix = document.createElement("div");
            pix.className = "pix";
            pix.style.backgroundColor = bgColor;
            pix.style.width = pixelsize+ "px";
            pix.style.height = pixelsize+ "px";
            row.appendChild(pix);
        }
        board.appendChild(row);
    }
}

function go() {
    init();
    for (let char = 0; char < Math.min(text.length, shownChars); char++) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 5; j++) {
                displayPixel(i, char*(5+charSpacing) + j, predicates[text[char]](i,j) );
            }
            
        }
    }
    
}

function start() {
    init();
    document.getElementById("goButton").setAttribute("disabled",true);
    document.getElementById("startButton").setAttribute("disabled",true);
    document.getElementById("stopButton").removeAttribute("disabled");
    
    rowLen = 5*text.length + (text.length-1) * charSpacing + 5*shownChars + (shownChars-1) * charSpacing;
    buffer = new Array(9*rowLen);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 2*rowLen; j++) {
            buffer[i*rowLen + j] = false;
        }
    }

    for (let char = 0; char < text.length; char++)
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 5; j++) {
                buffer[i*rowLen + char*(5+charSpacing)+j] = predicates[text[char]](i,j);
            }
        }

    displayBuffer();
    timerEnabled = true;
    setTimeout(()=>tick(), delay);
}

function shiftBuffer() {
    for (let i = 0; i < 9; i++) {
        var temp = buffer[i*rowLen];
        for (let j = 0; j < rowLen-1; j++) {
            buffer[i*rowLen + j] = buffer[i*rowLen + j + 1];
        }
        buffer[(i+1)*rowLen-1] = temp;
    }
}


function displayBuffer() {
    for (let i = 0; i<9; i++) {
        for (let j = 0; j < 5*shownChars + (shownChars-1) * charSpacing; j++) {
            displayPixel(i,j, buffer[rowLen*i + j]);
        }
    }
}

function tick() {
    if (!timerEnabled) {
        return;
    }

    shiftBuffer();
    displayBuffer();
    setTimeout(()=>tick(), delay);
    return false;
}

function stop() {
    timerEnabled = false;
    document.getElementById("stopButton").setAttribute("disabled",true);
    document.getElementById("goButton").removeAttribute("disabled");
    document.getElementById("startButton").removeAttribute("disabled");
}

function displayPixel(i, j, enabled) {
    board.getElementsByClassName("dRow")[i].getElementsByClassName("pix")[j].style.backgroundColor = enabled ? foreColor : bgColor;
}

function changeText(t) {
    text = t.toUpperCase();
}

function changeColors(c) {
    switch (c) {
        case "lgr":
            bgColor = "lightgray";
            foreColor = "red";
            break;
        case "rw":
            bgColor = "red";
            foreColor = "white";
            break;
        case "bw":
            bgColor = "blue";
            foreColor = "white";
            break;
        case "gy":
            bgColor = "darkgray";
            foreColor = "yellow";
            break;
        case "by":
            bgColor = "blue";
            foreColor = "yellow";
            break;
        case "ry":
            bgColor = "red";
            foreColor = "yellow";
            break;
    }
}

function changePixSize(s) {
    pixelsize = s-0;
}

function changeSpacing(s) {
    charSpacing = s-0;
}

function changeCharNum(v) {
    shownChars = v-0;
}

function changeDelay(d) {
    delay = d-0;
}