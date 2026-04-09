// Upload image and have the canvas with same sizes --- Testing with 2 canvas on above the other

// const canvasTwo = document.getElementById("canvasTwo");
// const ctxTwo = canvasTwo.getContext("2d");

// Set point Size.  pointSize is the radius of the dots created and need to be dynamic and chosen by the user

let pointSize;
let showSize = document.getElementById("dynamicSize");

function changeSize() {
  let inputSize = document.getElementById("sizeInput").value;
  if (inputSize) {
    pointSize = inputSize;
  } else {
    pointSize = 4; // if no input is given 4 is default value
  }
  showSize.innerHTML = "Current point radius size is: " + pointSize + "px";
}

changeSize(); // initiate function on page load/refresh ---- Still testing

function resetSize() {
  document.getElementById("sizeInput").value = "";
  pointSize = 4;
  showSize.innerHTML = "Current point radius size is: " + pointSize + "px";
}
// Canvas size changes

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let pointsRedLeft = [];
let pointsRedRight = [];
let pointsBlueLeft = [];
let pointsBlueRight = [];
let pointsMeasure = [];
var timeout = 300;
var clicksRed = 0;
var clicksBlue = 0;

const resetButton = document.getElementById("reset");
const deleteLastRed = document.getElementById("deleteCircleRed");
const deleteLastBlue = document.getElementById("deleteCircleBlue");

function getPosition(event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: Math.round(event.clientX - rect.left),
    y: Math.round(event.clientY - rect.top),
  };
}

function printMousePos(event) {
  var rect = event.target.getBoundingClientRect();
  // console.log(
  //   "x:" +
  //     Math.round(event.clientX - rect.left) +
  //     " y:" +
  //     Math.round(event.clientY - rect.top)
  // );
}

// DRAW RED - ALL EVENTS

function drawCoordinatesRed(point, r) {
  ctx.fillStyle = "hsl(0, 100%, 30%)"; // Dark Red color
  ctx.beginPath();
  ctx.arc(point.x, point.y, r, 0, Math.PI * 2, true);
  ctx.fill();
}

function drawRedLeft(e) {
  clicksRed++;
  var m = getPosition(e);
  drawCoordinatesRed(m, pointSize);
  pointsRedLeft.push(m);
  console.log(pointsRedLeft);
  let index = pointsRedLeft.indexOf(m);
  console.log(index);
  ctx.font = " " + (parseInt(pointSize) + 8) + "px Arial";
  ctx.fillText(
    "L" + (index + 1),
    m.x + pointSize * 1.2,
    m.y + pointSize * 1.2 + 10
  );
  refreshRemoveList();
}

function drawRedRight(e) {
  clicksRed++;
  var m = getPosition(e);
  drawCoordinatesRed(m, pointSize);
  pointsRedRight.push(m);
  console.log(pointsRedRight);
  let index = pointsRedRight.indexOf(m);
  console.log(index);
  ctx.font = " " + (parseInt(pointSize) + 8) + "px Arial";
  ctx.fillText(
    "R" + (index + 1),
    m.x + pointSize * 1.2,
    m.y + pointSize * 1.2 + 10
  );
  refreshRemoveList();
}

function drawRedCircleLeft() {
  canvas.addEventListener("click", drawRedLeft, false);
  canvas.addEventListener("click", printMousePos, false);
  activeFunctionInfo.style.color = 'red';
  activeFunctionInfo.style.fontWeight = 'bold';
  activeFunctionInfo.innerHTML = '<i class="fa-solid fa-play"></i>&nbsp Red (front) Left circle active.'
  canvas.removeEventListener("click", drawRedRight, false);
  canvas.removeEventListener("click", drawBlueLeft, false);
  canvas.removeEventListener("click", drawBlueRight, false);
  canvas.style.cursor = "crosshair";
  // clicks++;
  // this point won't be added to the points array
  // it's here only to mark the point on click since otherwise it will appear with a delay equal to the timeout
}

function drawRedCircleRight() {
  canvas.addEventListener("click", drawRedRight, false);
  canvas.addEventListener("click", printMousePos, false);
  activeFunctionInfo.style.color = 'red';
  activeFunctionInfo.style.fontWeight = 'bold';
  activeFunctionInfo.innerHTML = '<i class="fa-solid fa-play"></i>&nbsp Red (front) Right circle active.'
  canvas.removeEventListener("click", drawRedLeft, false);
  canvas.removeEventListener("click", drawBlueLeft, false);
  canvas.removeEventListener("click", drawBlueRight, false);
  canvas.style.cursor = "crosshair";
}

function removeRedCircleLeft() {
  let lastElementRedLeft = pointsRedLeft[pointsRedLeft.length - 1];
  console.log(
    "Removed left red point on the coordinates: X " +
      lastElementRedLeft.x +
      " Y: " +
      lastElementRedLeft.y
  );
  if (pointsRedLeft.indexOf(lastElementRedLeft) >= 9) {
    ctx.clearRect(
      lastElementRedLeft.x - pointSize,
      lastElementRedLeft.y - pointSize,
      pointSize * 4 + 18,
      pointSize * 4 + 10
    );
  } else {
    ctx.clearRect(
      lastElementRedLeft.x - pointSize,
      lastElementRedLeft.y - pointSize,
      pointSize * 4 + 10,
      pointSize * 4 + 10
    );
  }
  pointsRedLeft.pop();
  canvas.removeEventListener("click", drawRedLeft, false);
  canvas.removeEventListener("click", drawRedRight, false);
  canvas.removeEventListener("click", drawBlueLeft, false);
  canvas.removeEventListener("click", drawBlueRight, false);
  canvas.removeEventListener("click", printMousePos);
  canvas.style.cursor = "default";
  // coordinates minus the radius
  //since the rect starts at the top left corner and the circle coords focus on the middle point
  // 8 is the diameter of any point, so create a square with an edge of 8
  // to also delete the number we add another square with same size for deletion hence the times 4, also de plus 10 offset
  // in the y axis and x axis like we did to draw the index numbers above
}

function removeRedCircleRight() {
  let lastElementRedRight = pointsRedRight[pointsRedRight.length - 1];
  console.log(
    "Removed left red point on the coordinates: X " +
      lastElementRedRight.x +
      " Y: " +
      lastElementRedRight.y
  );
  if (pointsRedRight.indexOf(lastElementRedRight) >= 9) {
    ctx.clearRect(
      lastElementRedRight.x - pointSize,
      lastElementRedRight.y - pointSize,
      pointSize * 4 + 20,
      pointSize * 4 + 10
    );
  } else {
    ctx.clearRect(
      lastElementRedRight.x - pointSize,
      lastElementRedRight.y - pointSize,
      pointSize * 4 + 12,
      pointSize * 4 + 10
    );
  }
  pointsRedRight.pop();
  canvas.removeEventListener("click", drawRedLeft, false);
  canvas.removeEventListener("click", drawRedRight, false);
  canvas.removeEventListener("click", drawBlueLeft, false);
  canvas.removeEventListener("click", drawBlueRight, false);
  canvas.removeEventListener("click", printMousePos);
  canvas.style.cursor = "default";
}

function removeAllRedCircleLeft() {
  for (let i = 0; i < pointsRedLeft.length; i++) {
    if (i >= 9) {
      ctx.clearRect(
        pointsRedLeft[i].x - pointSize,
        pointsRedLeft[i].y - pointSize,
        pointSize * 4 + 18,
        pointSize * 4 + 10
      );
    } else {
      ctx.clearRect(
        pointsRedLeft[i].x - pointSize,
        pointsRedLeft[i].y - pointSize,
        pointSize * 4 + 10,
        pointSize * 4 + 10
      );
    }
    // console.log(
    //   "Removed point on the coordinates: X " +
    //     pointsRedLeft[i].x +
    //     " Y: " +
    //     pointsRedLeft[i].y
    // );
  }
  pointsRedLeft.length = 0;
  canvas.removeEventListener("click", drawRedLeft, false);
  canvas.removeEventListener("click", drawRedRight, false);
  canvas.removeEventListener("click", drawBlueLeft, false);
  canvas.removeEventListener("click", drawBlueRight, false);
  canvas.removeEventListener("click", printMousePos);
  canvas.style.cursor = "default";
  activeFunctionInfo.style.color = 'red';
  activeFunctionInfo.style.fontWeight = 'bold';
  activeFunctionInfo.innerHTML = '<i class="fa-solid fa-xmark"></i>&nbspAll red left points removed!';
}

function removeAllRedCircleRight() {
  for (let i = 0; i < pointsRedRight.length; i++) {
    if (i >= 9) {
      ctx.clearRect(
        pointsRedRight[i].x - pointSize,
        pointsRedRight[i].y - pointSize,
        pointSize * 4 + 20,
        pointSize * 4 + 10
      );
    } else {
      ctx.clearRect(
        pointsRedRight[i].x - pointSize,
        pointsRedRight[i].y - pointSize,
        pointSize * 4 + 12,
        pointSize * 4 + 10
      );
    }
    console.log(
      "Removed point on the coordinates: X " +
        pointsRedRight[i].x +
        " Y: " +
        pointsRedRight[i].y
    );
  }
  pointsRedRight.length = 0;
  canvas.removeEventListener("click", drawRedLeft, false);
  canvas.removeEventListener("click", drawRedRight, false);
  canvas.removeEventListener("click", drawBlueLeft, false);
  canvas.removeEventListener("click", drawBlueRight, false);
  canvas.removeEventListener("click", printMousePos);
  canvas.style.cursor = "default";
  activeFunctionInfo.style.color = 'red';
  activeFunctionInfo.style.fontWeight = 'bold';
  activeFunctionInfo.innerHTML = '<i class="fa-solid fa-xmark"></i>&nbspAll red right points removed!';
}

// DRAW BLUE - ALL EVENTS

function drawCoordinatesBlue(point, r) {
  ctx.fillStyle = "hsl(245, 89%, 42%)"; // Dark Blue color
  ctx.beginPath();
  ctx.arc(point.x, point.y, r, 0, Math.PI * 2, true);
  ctx.fill();
}

function drawBlueLeft(e) {
  clicksBlue++;
  var n = getPosition(e);
  drawCoordinatesBlue(n, pointSize);
  pointsBlueLeft.push(n);
  console.log(pointsBlueLeft);
  let index = pointsBlueLeft.indexOf(n);
  console.log(index);
  ctx.font = " " + (parseInt(pointSize) + 8) + "px Arial";
  ctx.fillText(
    "L" + (index + 1),
    n.x + pointSize * 1.2,
    n.y + pointSize * 1.2 + 10
  );
  refreshRemoveList();
}

function drawBlueRight(e) {
  clicksBlue++;
  var n = getPosition(e);
  drawCoordinatesBlue(n, pointSize);
  pointsBlueRight.push(n);
  console.log(pointsBlueRight);
  let index = pointsBlueRight.indexOf(n);
  console.log(index);
  ctx.font = " " + (parseInt(pointSize) + 8) + "px Arial";
  ctx.fillText(
    "R" + (index + 1),
    n.x + pointSize * 1.2,
    n.y + pointSize * 1.2 + 10
  );
  refreshRemoveList();
}

function drawBlueCircleLeft() {
  canvas.addEventListener("click", drawBlueLeft, false);
  canvas.addEventListener("click", printMousePos, false);
  activeFunctionInfo.style.color = 'blue';
  activeFunctionInfo.style.fontWeight = 'bold';
  activeFunctionInfo.innerHTML = '<i class="fa-solid fa-play"></i>&nbsp Blue (hind) Left circle active.'
  canvas.removeEventListener("click", drawBlueRight, false);
  canvas.removeEventListener("click", drawRedRight, false);
  canvas.removeEventListener("click", drawRedLeft, false);
  canvas.style.cursor = "crosshair";
  
}

function drawBlueCircleRight() {
  canvas.addEventListener("click", drawBlueRight, false);
  canvas.addEventListener("click", printMousePos, false);
  activeFunctionInfo.style.color = 'blue';
  activeFunctionInfo.style.fontWeight = 'bold';
  activeFunctionInfo.innerHTML = '<i class="fa-solid fa-play"></i>&nbsp Blue (hind) Right circle active.'
  canvas.removeEventListener("click", drawBlueLeft, false);
  canvas.removeEventListener("click", drawRedRight, false);
  canvas.removeEventListener("click", drawRedLeft, false);
  canvas.style.cursor = "crosshair";
  
}

function removeBlueCircleLeft() {
  let lastElementBlueLeft = pointsBlueLeft[pointsBlueLeft.length - 1];
  console.log(
    "Removed left Blue point on the coordinates: X " +
      lastElementBlueLeft.x +
      " Y: " +
      lastElementBlueLeft.y
  );
  if (pointsBlueLeft.indexOf(lastElementBlueLeft) >= 9) {
    ctx.clearRect(
      lastElementBlueLeft.x - pointSize,
      lastElementBlueLeft.y - pointSize,
      pointSize * 4 + 18,
      pointSize * 4 + 10
    );
  } else {
    ctx.clearRect(
      lastElementBlueLeft.x - pointSize,
      lastElementBlueLeft.y - pointSize,
      pointSize * 4 + 10,
      pointSize * 4 + 10
    );
  }
  pointsBlueLeft.pop();
  canvas.removeEventListener("click", drawBlueLeft);
  canvas.removeEventListener("click", drawBlueRight);
  canvas.removeEventListener("click", drawRedLeft);
  canvas.removeEventListener("click", drawRedRight);
  canvas.removeEventListener("click", printMousePos);
  canvas.style.cursor = "default";
}

function removeBlueCircleRight() {
  let lastElementBlueRight = pointsBlueRight[pointsBlueRight.length - 1];
  console.log(
    "Removed Right Blue point on the coordinates: X " +
      lastElementBlueRight.x +
      " Y: " +
      lastElementBlueRight.y
  );
  if (pointsBlueRight.indexOf(lastElementBlueRight) >= 9) {
    ctx.clearRect(
      lastElementBlueRight.x - pointSize,
      lastElementBlueRight.y - pointSize,
      pointSize * 4 + 20,
      pointSize * 4 + 10
    );
  } else {
    ctx.clearRect(
      lastElementBlueRight.x - pointSize,
      lastElementBlueRight.y - pointSize,
      pointSize * 4 + 12,
      pointSize * 4 + 10
    );
  }
  pointsBlueRight.pop();
  canvas.removeEventListener("click", drawBlueLeft);
  canvas.removeEventListener("click", drawBlueRight);
  canvas.removeEventListener("click", drawRedLeft);
  canvas.removeEventListener("click", drawRedRight);
  canvas.removeEventListener("click", printMousePos);
  canvas.style.cursor = "default";
}

function removeAllBlueCircleLeft() {
  for (let i = 0; i < pointsBlueLeft.length; i++) {
    if (i >= 9) {
      ctx.clearRect(
        pointsBlueLeft[i].x - pointSize,
        pointsBlueLeft[i].y - pointSize,
        pointSize * 4 + 18,
        pointSize * 4 + 10
      );
    } else {
      ctx.clearRect(
        pointsBlueLeft[i].x - pointSize,
        pointsBlueLeft[i].y - pointSize,
        pointSize * 4 + 10,
        pointSize * 4 + 10
      );
    }
    console.log(
      "Removed point on the coordinates: X " +
        pointsBlueLeft[i].x +
        " Y: " +
        pointsBlueLeft[i].y
    );
  }
  pointsBlueLeft.length = 0;
  canvas.removeEventListener("click", drawBlueLeft);
  canvas.removeEventListener("click", drawBlueRight);
  canvas.removeEventListener("click", drawRedLeft);
  canvas.removeEventListener("click", drawRedRight);
  canvas.removeEventListener("click", printMousePos);
  canvas.style.cursor = "default";
  activeFunctionInfo.style.color = 'blue';
  activeFunctionInfo.style.fontWeight = 'bold';
  activeFunctionInfo.innerHTML = '<i class="fa-solid fa-xmark"></i>&nbspAll blue left points removed!';
}

function removeAllBlueCircleRight() {
  for (let i = 0; i < pointsBlueRight.length; i++) {
    if (i >= 9) {
      ctx.clearRect(
        pointsBlueRight[i].x - pointSize,
        pointsBlueRight[i].y - pointSize,
        pointSize * 4 + 18,
        pointSize * 4 + 10
      );
    } else {
      ctx.clearRect(
        pointsBlueRight[i].x - pointSize,
        pointsBlueRight[i].y - pointSize,
        pointSize * 4 + 10,
        pointSize * 4 + 10
      );
    }
    console.log(
      "Removed point on the coordinates: X " +
        pointsBlueRight[i].x +
        " Y: " +
        pointsBlueRight[i].y
    );
  }
  pointsBlueRight.length = 0;
  canvas.removeEventListener("click", drawBlueLeft);
  canvas.removeEventListener("click", drawBlueRight);
  canvas.removeEventListener("click", drawRedLeft);
  canvas.removeEventListener("click", drawRedRight);
  canvas.removeEventListener("click", printMousePos);
  canvas.style.cursor = "default";
  activeFunctionInfo.style.color = 'blue';
  activeFunctionInfo.style.fontWeight = 'bold';
  activeFunctionInfo.innerHTML = '<i class="fa-solid fa-xmark"></i>&nbspAll blue right points removed!';
}

// MEASURE POINTS - ALL EVENTS

let dist = 0;

function drawMeasureCoordinates(point, r) {
  ctx.fillStyle = "#000000"; // Black | New color grey: #525151
  ctx.beginPath();
  ctx.arc(point.x, point.y, r, 0, Math.PI * 2, true);
  ctx.fill();
}

// Function to draw line //

// var coords = [];
// function drawMeasureCoordinatesLine(event, r) {
//   var coord = { x: event.x, y: event.y };
//   coords.push(coord);
//   var max = coords.length - 1;
//   ctx.lineWidth = 3;
//   if (typeof coords[max - 1] !== "undefined") {
//     var curr = coords[max],
//       prev = coords[max - 1];
//     ctx.beginPath();
//     ctx.moveTo(prev.x, prev.y);
//     ctx.lineTo(curr.x, curr.y);
//     ctx.stroke();
//   }
// }

// function drawMeasurePoint(e) {
//   if (coords.length <= 1 && pointsMeasure.length <= 1) {
//     var o = getPosition(e);
//     drawMeasureCoordinates(o, pointSize);
//     drawMeasureCoordinatesLine(o, pointSize);
//     pointsMeasure.push(o);
//     console.log(pointsMeasure);
//     console.log(coords.length);
//     let index = pointsMeasure.indexOf(o);
//     console.log("Measure Point:" + (index + 1));
//   } else {
//     return;
//   }
// }

// ------------------------------------------------------------------------- //
function drawMeasurePoint(e) {
  if (pointsMeasure.length <= 1) {
    var o = getPosition(e);
    drawMeasureCoordinates(o, pointSize);
    pointsMeasure.push(o);
    // console.log(pointsMeasure);
    let index = pointsMeasure.indexOf(o);
    // console.log("Measure Point:" + (index + 1));
  } else {
    return;
  }
}

function drawMeasureCircle() {
  canvas.addEventListener("click", drawMeasurePoint, false);
  canvas.addEventListener("click", printMousePos, false);
  canvas.removeEventListener("click", drawBlueLeft);
  canvas.removeEventListener("click", drawBlueRight);
  canvas.removeEventListener("click", drawRedLeft);
  canvas.removeEventListener("click", drawRedRight);
  canvas.style.cursor = "pointer";
  document.getElementById('addMeasureInfo').innerHTML = '<b><i class="fa-solid fa-play"></i>&nbspAdd measure points active</b><br>(*) You can stop this function by clicking the eraser button below or clicking the reset or pause buttons from the above section (shortcut keys work aswell).';
}

function removeAllMeasurePoints() {
  for (let i = 0; i < pointsMeasure.length; i++) {
    ctx.clearRect(
      pointsMeasure[i].x - pointSize,
      pointsMeasure[i].y - pointSize,
      pointSize * 4,
      pointSize * 4
    );
    console.log(
      "Removed measure point on the coordinates: X " +
        pointsMeasure[i].x +
        " Y: " +
        pointsMeasure[i].y
    );
  }
  pointsMeasure.length = 0;
  canvas.removeEventListener("click", drawMeasurePoint);
  canvas.removeEventListener("click", printMousePos);
  canvas.style.cursor = "default";
  document.getElementById("measureToCm").value = "";
  dist = 0;
  document.getElementById('addMeasureInfo').innerHTML = "";
}

///////////////////////////////////////////////

function resetCanvas() {
  activeFunctionInfo.innerHTML = '';
  canvas.removeEventListener("click", drawBlueLeft);
  canvas.removeEventListener("click", drawBlueRight);
  canvas.removeEventListener("click", drawRedLeft);
  canvas.removeEventListener("click", drawRedRight);
  canvas.removeEventListener("click", printMousePos);
  canvas.removeEventListener("click", drawMeasurePoint);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pointsRedLeft.length = 0;
  pointsRedRight.length = 0;
  pointsBlueLeft.length = 0;
  pointsBlueRight.length = 0;
  pointsMeasure.length = 0;
  canvas.style.cursor = "auto";
  pointSize = 4; // when clicking reset canvas point size also goes to default --- can be changed
  showSize.innerHTML = "Current point radius size is: " + pointSize +"px";
  var elems = document.querySelectorAll(".active");
  [].forEach.call(elems, function (el) {
    el.classList.remove("active");
  });
  document.getElementById('addMeasureInfo').innerHTML = '';
  document.activeElement.blur();
  refreshRemoveList();
}


// TOGGLE INACTIVE FUNCTION

function toggleInactive(){
  canvas.removeEventListener("click", drawBlueLeft);
  canvas.removeEventListener("click", drawBlueRight);
  canvas.removeEventListener("click", drawRedLeft);
  canvas.removeEventListener("click", drawRedRight);
  canvas.removeEventListener("click", printMousePos);
  canvas.removeEventListener("click", drawMeasurePoint);
  activeFunctionInfo.innerHTML = '';
  canvas.style.cursor = "auto";
  var elems = document.querySelectorAll(".active");
  [].forEach.call(elems, function (el) {
    el.classList.remove("active");
  });
  document.activeElement.blur();
  document.getElementById('addMeasureInfo').innerHTML = '';
}



function distanceMeasurePoint() {
  if (pointsMeasure.length != 0) {
    dist = Math.hypot(
      pointsMeasure[1].x - pointsMeasure[0].x,
      pointsMeasure[1].y - pointsMeasure[0].y
    ).toFixed(3);
    console.log(dist);
    document.getElementById("measureToCm").value =
      parseFloat(dist);
    // if (imgSizeStatus == 1){
    //   document.getElementById("measureToCm").innerHTML = dist + "px equals 1 centimeter";
    // }
    // if (imgSizeStatus == 0.75){
    //   document.getElementById("measureToCm").innerHTML = dist + "px equals 0.75 centimeter";
    // }
    // if (imgSizeStatus == 0.5){
    //   document.getElementById("measureToCm").innerHTML = dist + "px equals 0.5 centimeter";
    // }
    // if (imgSizeStatus == 0.25){
    //   document.getElementById("measureToCm").innerHTML = dist + "px equals 0.25 centimeter";
    // }
  } else {
    alert("Add 2 points and measure or manually input known values under.");
  }
  activeFunctionInfo.innerHTML = '';
  document.getElementById('addMeasureInfo').innerHTML = "";
}

let inputPixelsManually = document.getElementById("pixelsInCmMan");
let savedChoices = document.getElementById("savedChoices");

function manualInputMeasure() {
  const manualVal = inputPixelsManually.value;
  const dropdownVal = savedChoices.value; // Modern, cleaner way to get the selected value

  // Case 1: The user accidentally filled out both options
  if (manualVal !== "" && dropdownVal !== "None") {
    alert("Please choose only ONE option: either type a manual value OR select a saved value.");
    return; // Stop the function here
  }

  // Case 2: User chose the Manual Input
  if (manualVal !== "" && dropdownVal === "None") {
    dist = parseFloat(manualVal);
    document.getElementById("measureToCm").value = dist;
  } 
  
  // Case 3: User chose the Dropdown
  else if (dropdownVal !== "None" && manualVal === "") {
    dist = parseFloat(dropdownVal);
    document.getElementById("measureToCm").value = dist;
  } 
  
  // Case 4: User clicked "Use" but didn't provide any values
  else {
    alert("Please enter a value or select a saved choice before clicking Use.");
  }
}

// The companion reset function (attached to your 'resetManual' button)
function resetInput() {
  inputPixelsManually.value = "";
  savedChoices.value = "None";
  document.getElementById("measureToCm").value = "";
  dist = 0; // Reset your global distance variable
}

// ------------------------------------------------------------------------------------- -------------------------------------------------------------//

// HOTKEYS SECTION FOR BUTTONS 



document.addEventListener('keydown', function(event) {
  // Don't use shortcut buttons if in textarea or input fields
  const activeElement = document.activeElement;
  if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
    // Don't execute global keydown events if an input or textarea is focused
    return;
  } else{
    switch (event.key) {
      case 'q':
        // Trigger the button click
        document.getElementById('redCircleLeft').click();
        break;
      case 'w': 
      // Trigger the button click
        document.getElementById('redCircleRight').click();
        break;
      case 'a':
      // Trigger the button click
        document.getElementById('blueCircleLeft').click();
        break;
      case 's':
      // Trigger the button click
        document.getElementById('blueCircleRight').click();
        break;
      case 'p':
      // Trigger the button click
        document.getElementById('toggleInactive').click();
        break;
      case 'r':
      // Trigger the button click
      // Ask for user confirmation
        if (confirm("Are you sure you want to delete all points?")== true){
          document.getElementById('resetCanvas').click();
        } else{
          return;
        }
        break; 
      default:
        // console.log("Key not mapped to any button");
    }
  } 
  // Check if the key pressed is "Enter" (key code 13)
  
});   

// Resolution section for user screen //

// function getUserResolution() {
//   document.getElementById("userResolution").innerHTML =
//     "<strong>Your resolution is:</strong> " +
//     window.screen.width * window.devicePixelRatio +
//     "x" +
//     window.screen.height * window.devicePixelRatio;
// }

// getUserResolution();

// Resolution of APP window dynamically checks for changes in resolution size

function updateAppResolution() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  document.getElementById("userResolution").innerHTML =
    "<strong>App window size:</strong> " + width + "x" + height;
}

// Initial call
updateAppResolution();

// Update on resize
window.addEventListener("resize", updateAppResolution);



// ----------------------- MOST VARIABLES ASSIGNED --------------------------- //

function getShortenedFilename(filename, maxLength = 50) {
  if (filename.length <= maxLength) return filename;

  const extIndex = filename.lastIndexOf('.');
  const extension = extIndex !== -1 ? filename.slice(extIndex) : '';
  const nameOnly = extIndex !== -1 ? filename.slice(0, extIndex) : filename;

  const visibleChars = maxLength - extension.length - 3; // 3 for "..."
  const startChars = Math.ceil(visibleChars / 2);
  const endChars = Math.floor(visibleChars / 2);

  return `${nameOnly.slice(0, startChars)}...${nameOnly.slice(-endChars)}${extension}`;
}


// let imgSizeStatus = 0;
let imgWidth = document.getElementById("imageUploadedWidth");
let imgHeight = document.getElementById("imageUploadedHeight");
// let imgSize = document.getElementById("imageUploadedSize");
let imgInfo = document.getElementById("imageInfo");
let imgEdit = document.getElementById("imageEdit");
let results = document.querySelector(".data-results");
let buttons = document.querySelector(".buttons-plus-options");
// let chButtons = document.querySelector(".buttons-change");
// let canvasInfo = document.getElementById("canvasInfo");
let canvasUpload = document.getElementById("canvasUpload");
let imgName = document.getElementById("imageName");
let tableTitle = document.getElementById("titleImage");
let manualID = document.getElementById("entryTableID");
let tableWarning = document.getElementById("imageResizeTableWarning");
// document.getElementById("inputScreenInches").style.display = "none";
// document.getElementById("screenPPI").style.display = "none";
// document.getElementById("imageDimInches").style.display = "none";
// document.getElementById("imageDimCm").style.display = "none";
// document.getElementById("labelInput").style.display = "none";
// document.getElementById("ppiCalculus").style.display = "none";
document.getElementById("savedDistance").style.display = "none";
document.getElementById("showData").style.display = "none";
document.getElementById('removeImage').style.display = "none";
document.getElementById('accordion').style.display = 'none';
canvasUpload.style.display = "none";
buttons.style.display = "none";
canvas.style.display = "none";
//  results.style.display = "none";
// chButtons.style.display = "none";
let imgContainer = document.getElementById("imgContainer");
let img = new Image();
let loadFile = function (event) {
  if (event.target.files[0]["type"].split("/")[0] === "image") {
    hasUnsavedData = true;
    img.src = URL.createObjectURL(event.target.files[0]);
    let blob = img.src;
    imgContainer.style.backgroundImage = "url(" + blob + ")";
    buttons.style.display = "block";
    // results.style.display = "inline-block";
    // chButtons.style.display = "block";
    // imgInfo.style.display = "block";
    imgEdit.style.display = "block";
    savedDistance.style.display = "";
    showData.style.display = "";
    // canvasInfo.style.display = "none";
    canvasUpload.style.display = "";
    // imgSize.innerHTML =
    //   "<strong>Uploaded image size:</strong> " +
    //   (event.target.files[0].size / 1024).toFixed(2) +
    //   " kb";
    const fileInput = event.target.files[0];
    const shortened = getShortenedFilename(fileInput.name);
    imgName.innerHTML = shortened;

    canvas.style.display = "";
    // document.getElementById("canvasWidth").value = '';
    // document.getElementById("canvasHeight").value = '';
  } else {
    alert("Please enter a valid image format!");
    event.target.value = null;
  }
  // ON LOAD OF NEW IMAGE RESET ALL
  activeFunctionInfo.innerHTML = '';
  canvas.removeEventListener("click", drawBlueLeft);
  canvas.removeEventListener("click", drawBlueRight);
  canvas.removeEventListener("click", drawRedLeft);
  canvas.removeEventListener("click", drawRedRight);
  canvas.removeEventListener("click", printMousePos);
  canvas.removeEventListener("click", drawMeasurePoint);
  pointsRedLeft.length = 0;
  pointsRedRight.length = 0;
  pointsBlueLeft.length = 0;
  pointsBlueRight.length = 0;
  pointsMeasure.length = 0;
  canvas.style.cursor = "auto";
  var elems = document.querySelectorAll(".active");
  [].forEach.call(elems, function (el) {
    el.classList.remove("active");
  });
  refreshRemoveList();
  // IMAGE ONLOAD SECTION - //
img.onload = () => {
  event.target.value = null;
  originalImageWidth = img.naturalWidth;
  originalImageHeight = img.naturalHeight;

  imgWidth.innerHTML = originalImageWidth;
  imgHeight.innerHTML = originalImageHeight;
  imgContainer.style.border = "2px solid black";

  resizeImageToFitViewport(img);

  document.getElementById('removeImage').style.display = "";
  document.getElementById('accordion').style.display = '';
};

function resizeImageToFitViewport(img) {
  const maxViewportWidth = window.innerWidth * 0.9;
  const maxViewportHeight = window.innerHeight * 0.9;

  const widthScale = maxViewportWidth / img.width;
  const heightScale = maxViewportHeight / img.height;
  const scale = Math.min(widthScale, heightScale, 1); // Don't upscale, only downscale

  const resizedWidth = Math.round(img.width * scale);
  const resizedHeight = Math.round(img.height * scale);

  // Apply resized dimensions
  imgContainer.style.width = `${resizedWidth}px`;
  imgContainer.style.height = `${resizedHeight}px`;
  imgContainer.style.backgroundSize = `${resizedWidth}px ${resizedHeight}px`;

  canvas.width = resizedWidth;
  canvas.height = resizedHeight;

  // Update UI
  const scalePercent = Math.round(scale * 100);
  document.getElementById("currentImgSize").innerHTML =
    `<b>Current image size is:</b> ${resizedWidth}x${resizedHeight}` +
    (scale < 1
      ? ` <br>&#x26A0;&nbsp;<i>Image scaled down to ${scalePercent}% to fit your screen</i>`
      : "");

  tableWarning.innerHTML = scale < 1
    ? `<span style="color: red;"><b>&#x26A0;</b></span> Image was resized to ${scalePercent}% of its original size!`
    : "";

   // Slider default logic: set slider.value to the actual percent scale (1-100)
  slider.value = scalePercent;

  // Example table update
  if (scale < 1) {
    tableDynamicValuePx.innerHTML = `Value(px) at ${scalePercent}%`;
    tableDynamicValueCm.innerHTML = `Value(cm) at ${scalePercent}%`;
  }
  // Also trigger the slider input event so all related resizing happens consistently
  slider.dispatchEvent(new Event('input'));
}
}


// ALERT USER BEFORE LEAVING ANALYSIS PAGE FOR ELETRON APP //


// Alert before leaving page 

// 1. Use a state variable instead of checking img.src
// It is much safer and easier to track.
let hasUnsavedData = false;
let isNavigating = false;

/* Important next step for your other functions:
  Inside your loadFile() function, add: hasUnsavedData = true;
  Inside your resetFile() function, add: hasUnsavedData = false; 
*/

// 2. The BeforeUnload Handler (Triggered when closing the app or hitting reload)
function handleBeforeUnload(event) {
  if (!window.electronAPI || isNavigating) return;

  if (hasUnsavedData) {
    event.preventDefault();
    event.returnValue = ''; // Required for Chromium to pause the close process

    window.electronAPI.showCloseWarning().then((choice) => {
      if (choice === 1) { // Assuming 1 means "Yes, quit"
        isNavigating = true; 
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.electronAPI.forceClose();
      } else {
        console.log("Quit cancelled.");
      }
    });

    return '';
  }
}

window.addEventListener("beforeunload", handleBeforeUnload);

// 3. The Navigation Handler (Triggered when clicking links)
function handleNavigation(targetURL, isExternal) {
  if (hasUnsavedData) {
    window.electronAPI.showNavigationWarning().then((choice) => {
      if (choice === 1) { // Assuming 1 means "Yes, leave"
        executeNavigation(targetURL, isExternal);
      }
    });
  } else {
    // No unsaved data, just go
    executeNavigation(targetURL, isExternal);
  }
}

function executeNavigation(targetURL, isExternal) {
  if (isExternal) {
    // Open in user's default browser (Chrome, Edge, Safari, etc.)
    window.electronAPI.openExternal(targetURL);
  } else {
    // Navigate internally within the Electron app
    isNavigating = true;
    window.removeEventListener("beforeunload", handleBeforeUnload);
    window.location.href = targetURL;
  }
}

// 4. Global Link Interceptor
// This listens to all clicks on the page, finds if an <a> tag was clicked,
// stops the default behavior, and routes it through your custom logic.
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    
    // If a link was clicked and it has an href
    if (link && link.getAttribute('href')) {
      event.preventDefault(); // Stop normal browser navigation
      
      const href = link.getAttribute('href');
      // Determine if it's an external link (starts with http or target="_blank")
      const isExternal = href.startsWith('http') || link.target === '_blank';
      
      // Use the absolute URL if external, otherwise keep the relative path
      const targetURL = isExternal ? link.href : href; 
      
      handleNavigation(targetURL, isExternal);
    }
  });
});






// FUNCTIONS TO CHANGE CANVAS DIMENSIONS // --------------------------------------------------------------------------------------

//     let canvasWidth = document.getElementById("canvasWidth");
//     let canvasHeight = document.getElementById("canvasHeight");

//     function changeWidth(){
//     let canvasInputWidth = document.getElementById("canvasWidth").value;
//     if (canvasInputWidth){
//         canvas.width = canvasInputWidth;
//         imgContainer.style.width = canvasInputWidth + "px";
//         canvasInfo.innerHTML = "<strong>Canvas size is:</strong> " + canvas.width + "x" + canvas.height;
//     } else{
//         return;
//     }
// }

// changeWidth();

// function changeHeight(){
//   let canvasInputHeight = document.getElementById("canvasHeight").value;
//   if (canvasInputHeight){
//     canvas.height = canvasInputHeight;
//     imgContainer.style.height = canvasInputHeight + "px";
//     canvasInfo.innerHTML = "<strong>Canvas size is:</strong> " + canvas.width + "x" + canvas.height;
//   } else{
//     return;
//   }
// }

// changeHeight();

//     function resetWidth(){
//       canvas.width = img.width;
//       imgContainer.style.width = canvas.width + "px";
//       canvasInfo.innerHTML = "<strong>Canvas size is:</strong> " + canvas.width + "x" + canvas.height;
//       document.getElementById("canvasWidth").value = '';
//     }

//     function resetHeight(){
//       canvas.height = img.height;
//       imgContainer.style.height = canvas.height + "px";
//       canvasInfo.innerHTML = "<strong>Canvas size is:</strong> " + canvas.width + "x" + canvas.height;
//       document.getElementById("canvasHeight").value = '';
//     }

// FUNCTIONS TO CHANGE IMAGE DIMENSIONS AND KEEPING CANVAS SIZE (some functions probably unnecessary) //

// function changeImgDim(){
//   let imgWidthInput = document.getElementById("containerWidth").value;
//   let imgHeightInput = document.getElementById("containerHeight").value;
//   if ((imgWidthInput) && (imgHeightInput)){
//     imgContainer.style.backgroundSize = imgWidthInput + "px " + imgHeightInput + "px";
//     imgContainer.style.width = imgWidthInput + "px";
//     imgContainer.style.height = imgHeightInput + "px";
//     document.getElementById("currentImgSize").innerHTML = "<b>Current image size is:</b> " + imgWidthInput + "x" + imgHeightInput;
//   } else{
//     alert("Give both dimensions to change!");
//   }
// } ---------------------------------------------------------------------------------------------------------------------------



// Image resizing section

// *If new resizing options are added be sure to define new image status,
// *new warning messages, new cell descriptions and add as an option to the
// *calculations for loop to create values relative to original images sizes
// *according to the resize.

let table = document.getElementById("table");
let tableDynamicValuePx = document.getElementById("valuePx");
let tableDynamicValueCm = document.getElementById("valueCm");
// let tableOrignalValueCm = document.getElementById("valueCmOri");
let originalValueCell = document.getElementById("originalValueCell");

// function resetImgDim() {
//   var elems = document.querySelectorAll(".active");
//   [].forEach.call(elems, function (el) {
//     el.classList.remove("active");
//   });
//   canvas.removeEventListener("click", drawBlueLeft);
//   canvas.removeEventListener("click", drawBlueRight);
//   canvas.removeEventListener("click", drawRedLeft);
//   canvas.removeEventListener("click", drawRedRight);
//   canvas.removeEventListener("click", printMousePos);
//   canvas.removeEventListener("click", drawMeasurePoint);
//   pointsRedLeft.length = 0;
//   pointsRedRight.length = 0;
//   pointsBlueLeft.length = 0;
//   pointsBlueRight.length = 0;
//   pointsMeasure.length = 0;
//   canvas.style.cursor = "auto";
//   imgContainer.style.backgroundSize = img.width + "px " + img.height + "px";
//   canvas.width = img.width;
//   canvas.height = img.height;
//   imgContainer.style.width = img.width + "px";
//   imgContainer.style.height = img.height + "px";
//   // imgWidthInput.value = '';
//   // imgHeightInput.value = '';
//   document.getElementById("currentImgSize").innerHTML =
//     "<b>Current image size is:</b> " + img.width + "x" + img.height;
//   document.getElementById("titleImage").colSpan = "5";
//   tableWarning.innerHTML = "";
//   tableDynamicValuePx.innerHTML = "Value(px)";
//   tableDynamicValueCm.innerHTML = "Value(cm)";
//   // if (table.rows[1].cells.length == 6) {
//   //   table.rows[1].deleteCell(-1);
//   // } else {
//   //   return;
//   // }
//   imgSizeStatus = 100;
//   $("#tbody").empty();
// }

// function resizeFifty() {
//   var elems = document.querySelectorAll(".active");
//   [].forEach.call(elems, function (el) {
//     el.classList.remove("active");
//   });
//   canvas.removeEventListener("click", drawBlueLeft);
//   canvas.removeEventListener("click", drawBlueRight);
//   canvas.removeEventListener("click", drawRedLeft);
//   canvas.removeEventListener("click", drawRedRight);
//   canvas.removeEventListener("click", printMousePos);
//   canvas.removeEventListener("click", drawMeasurePoint);
//   pointsRedLeft.length = 0;
//   pointsRedRight.length = 0;
//   pointsBlueLeft.length = 0;
//   pointsBlueRight.length = 0;
//   pointsMeasure.length = 0;
//   canvas.style.cursor = "auto";
//   pointSize = 4; // when clicking reset canvas point size also goes to default --- can be changed
//   showSize.innerHTML = "Current point size is: " + pointSize;
//   imgContainer.style.backgroundSize =
//     img.width * 0.5 + "px " + img.height * 0.5 + "px";
//   imgContainer.style.width = img.width * 0.5 + "px";
//   imgContainer.style.height = img.height * 0.5 + "px";
//   canvas.width = img.width * 0.5;
//   canvas.height = img.height * 0.5;
//   document.getElementById("currentImgSize").innerHTML =
//     "<b>Current image size is:</b> " +
//     img.width * 0.5 +
//     "x" +
//     img.height * 0.5 +
//     " (50% of size!)";
//   // tableDynamicValuePx.innerHTML = "Value(px) at 50%";
//   // tableDynamicValueCm.innerHTML = "Value(cm) at 50%";
//   // document.getElementById("titleImage").colSpan = "6";
//   tableWarning.innerHTML = `<span style="color: red;"><b>&#x26A0;</b></span> Image was redimensioned to 50% of its original size!`; //\n
//   //A new column with original image size values in cm added.`;
//   imgSizeStatus = 50;
//   // if (table.rows[1].cells.length < 6) {
//   //   let originalValueCm = table.rows[1].insertCell();
//   //   originalValueCm.outerHTML =
//   //     '<th id="originalValueCell">Value(cm) at 100% image size</th>';
//   // } else {
//   //   return;
//   // }
//   $("#tbody").empty();
// }

// function resizeSF() {
//   var elems = document.querySelectorAll(".active");
//   [].forEach.call(elems, function (el) {
//     el.classList.remove("active");
//   });
//   canvas.removeEventListener("click", drawBlueLeft);
//   canvas.removeEventListener("click", drawBlueRight);
//   canvas.removeEventListener("click", drawRedLeft);
//   canvas.removeEventListener("click", drawRedRight);
//   canvas.removeEventListener("click", printMousePos);
//   canvas.removeEventListener("click", drawMeasurePoint);
//   pointsRedLeft.length = 0;
//   pointsRedRight.length = 0;
//   pointsBlueLeft.length = 0;
//   pointsBlueRight.length = 0;
//   pointsMeasure.length = 0;
//   canvas.style.cursor = "auto";
//   pointSize = 4; // when clicking reset canvas point size also goes to default --- can be changed
//   showSize.innerHTML = "Current point size is: " + pointSize;
//   imgContainer.style.backgroundSize =
//     img.width * 0.75 + "px " + img.height * 0.75 + "px";
//   imgContainer.style.width = img.width * 0.75 + "px";
//   imgContainer.style.height = img.height * 0.75 + "px";
//   canvas.width = img.width * 0.75;
//   canvas.height = img.height * 0.75;
//   document.getElementById("currentImgSize").innerHTML =
//     "<b>Current image size is:</b> " +
//     img.width * 0.75 +
//     "x" +
//     img.height * 0.75 +
//     " (75% of size!)";
//   // tableDynamicValuePx.innerHTML = "Value(px) at 75%";
//   // tableDynamicValueCm.innerHTML = "Value(cm) at 75%";
//   // document.getElementById("titleImage").colSpan = "6";
//   tableWarning.innerHTML = `<span style="color: red;"><b>&#x26A0;</b></span> Image was redimensioned to 75% of its original size!`; //\n
//   //A new column with original image size values in cm added.`;
//   imgSizeStatus = 75;
//   // if (table.rows[1].cells.length < 6) {
//   //   let originalValueCm = table.rows[1].insertCell();
//   //   originalValueCm.outerHTML =
//   //     '<th id="originalValueCell">Value(cm) at 100% image size</th>';
//   // } else {
//   //   return;
//   // }
//   $("#tbody").empty();
// }

// function resizeForty() {
//   var elems = document.querySelectorAll(".active");
//   [].forEach.call(elems, function (el) {
//     el.classList.remove("active");
//   });
//   canvas.removeEventListener("click", drawBlueLeft);
//   canvas.removeEventListener("click", drawBlueRight);
//   canvas.removeEventListener("click", drawRedLeft);
//   canvas.removeEventListener("click", drawRedRight);
//   canvas.removeEventListener("click", printMousePos);
//   canvas.removeEventListener("click", drawMeasurePoint);
//   pointsRedLeft.length = 0;
//   pointsRedRight.length = 0;
//   pointsBlueLeft.length = 0;
//   pointsBlueRight.length = 0;
//   pointsMeasure.length = 0;
//   canvas.style.cursor = "auto";
//   pointSize = 4; // when clicking reset canvas point size also goes to default --- can be changed
//   showSize.innerHTML = "Current point size is: " + pointSize;
//   imgContainer.style.backgroundSize =
//     img.width * 0.4 + "px " + img.height * 0.4 + "px";
//   imgContainer.style.width = img.width * 0.4 + "px";
//   imgContainer.style.height = img.height * 0.4 + "px";
//   canvas.width = img.width * 0.4;
//   canvas.height = img.height * 0.4;
//   document.getElementById("currentImgSize").innerHTML =
//     "<b>Current image size is:</b> " +
//     (img.width * 0.4).toFixed(0) +
//     "x" +
//     (img.height * 0.4).toFixed(0) +
//     " (40% of size! Values are rounded)";
//   // tableDynamicValuePx.innerHTML = "Value(px) at 40%";
//   // tableDynamicValueCm.innerHTML = "Value(cm) at 40%";
//   // document.getElementById("titleImage").colSpan = "6";
//   tableWarning.innerHTML = `<span style="color: red;"><b>&#x26A0;</b></span> Image was redimensioned to 40% of its original size!`; //\n
//   //A new column with original image size values in cm added.`;
//   imgSizeStatus = 40;
//   // if (table.rows[1].cells.length < 6) {
//   //   let originalValueCm = table.rows[1].insertCell();
//   //   originalValueCm.outerHTML =
//   //     '<th id="originalValueCell">Value(cm) at 100% image size</th>';
//   // } else {
//   //   return;
//   // }
//   $("#tbody").empty();
// }

// function resizeTwentyF() {
//   var elems = document.querySelectorAll(".active");
//   [].forEach.call(elems, function (el) {
//     el.classList.remove("active");
//   });
//   canvas.removeEventListener("click", drawBlueLeft);
//   canvas.removeEventListener("click", drawBlueRight);
//   canvas.removeEventListener("click", drawRedLeft);
//   canvas.removeEventListener("click", drawRedRight);
//   canvas.removeEventListener("click", printMousePos);
//   canvas.removeEventListener("click", drawMeasurePoint);
//   pointsRedLeft.length = 0;
//   pointsRedRight.length = 0;
//   pointsBlueLeft.length = 0;
//   pointsBlueRight.length = 0;
//   pointsMeasure.length = 0;
//   canvas.style.cursor = "auto";
//   pointSize = 4; // when clicking reset canvas point size also goes to default --- can be changed
//   showSize.innerHTML = "Current point size is: " + pointSize;
//   imgContainer.style.backgroundSize =
//     img.width * 0.25 + "px " + img.height * 0.25 + "px";
//   imgContainer.style.width = img.width * 0.25 + "px";
//   imgContainer.style.height = img.height * 0.25 + "px";
//   canvas.width = img.width * 0.25;
//   canvas.height = img.height * 0.25;
//   document.getElementById("currentImgSize").innerHTML =
//     "<b>Current image size is:</b> " +
//     img.width * 0.25 +
//     "x" +
//     img.height * 0.25 +
//     " (25% of size!)";
//   // tableDynamicValuePx.innerHTML = "Value(px) at 25%";
//   // tableDynamicValueCm.innerHTML = "Value(cm) at 25%";
//   // document.getElementById("titleImage").colSpan = "6";
//   tableWarning.innerHTML = `<span style="color: red;"><b>&#x26A0;</b></span> Image was redimensioned to 25% of its original size!`; //\n
//   //A new column with original image size values in cm added.`;
//   imgSizeStatus = 25;
//   // if (table.rows[1].cells.length < 6) {
//   //   let originalValueCm = table.rows[1].insertCell();
//   //   originalValueCm.outerHTML =
//   //     '<th id="originalValueCell">Value(cm) at 100% image size</th>';
//   // } else {
//   //   return;
//   // }
//   $("#tbody").empty();
// }

// Warning message about resized images

// function warningResize() {
//   imgSizeStatus;
//   if (imgSizeStatus == 0.5) {
//     tableWarning.innerHTML = `&#x26A0; Image was redimensioned to 50% of its original size!\n
//       A new column with original image size values in cm added.`;
//   }
//   if (imgSizeStatus == 0.25) {
//     tableWarning.innerHTML = `&#x26A0; Image was redimensioned to 25% of its original size!\n
//       A new column with original image size values in cm added.`;
//   }
//   if (imgSizeStatus == 0.4) {
//     tableWarning.innerHTML = `&#x26A0; Image was redimensioned to 40% of its original size!\n
//       A new column with original image size values in cm added.`;
//   }
//   if (imgSizeStatus == 0.75) {
//     tableWarning.innerHTML = `&#x26A0; Image was redimensioned to 75% of its original size!\n
//     A new column with original image size values in cm added.`;
//   } else {
//     tableWarning.remove();
//   }
// }

// IMAGE RESIZE SECTION
// SLIDER IMAGE RESIZING IS STOPPING BUTTON EVENT LISTENERS --- WORK ON FIX 

let originalImageWidth, originalImageHeight; // Track these after loading

const slider = document.getElementById('mySlider');
slider.addEventListener('input', handleChange);

function handleChange(event) {
  resetCanvas();

  const scaleFactor = event.target.value / 100;
  const resizedWidth = Math.round(originalImageWidth * scaleFactor);
  const resizedHeight = Math.round(originalImageHeight * scaleFactor);

  imgContainer.style.backgroundSize = `${resizedWidth}px ${resizedHeight}px`;
  imgContainer.style.width = `${resizedWidth}px`;
  imgContainer.style.height = `${resizedHeight}px`;

  canvas.width = resizedWidth;
  canvas.height = resizedHeight;

  // UI updates
  const scalePercent = Math.round(scaleFactor * 100);
  document.getElementById("currentImgSize").innerHTML = 
    `<b>Current image size is:</b> ${resizedWidth}x${resizedHeight}` + 
    (scalePercent !== 100 ? ` (${scalePercent}% of size!)` : "");

  if (scalePercent === 100) {
    tableWarning.style.display = 'none';
  } else {
    tableWarning.style.display = '';
    tableWarning.innerHTML = 
      `<span style="color: red;"><b>&#x26A0;</b></span> Image was redimensioned to ${scalePercent}% of its original size!`;
  }

  tableDynamicValuePx.innerHTML = `Value(px) at ${scalePercent}%`;
  tableDynamicValueCm.innerHTML = `Value(cm) at ${scalePercent}%`;
}

// function resetCanvasOnDrag() {
//   canvas.removeEventListener("click", drawBlueLeft);
//   canvas.removeEventListener("click", drawBlueRight);
//   canvas.removeEventListener("click", drawRedLeft);
//   canvas.removeEventListener("click", drawRedRight);
//   canvas.removeEventListener("click", printMousePos);
//   canvas.removeEventListener("click", drawMeasurePoint);

//   const elems = document.querySelectorAll(".active");
//   elems.forEach(el => el.classList.remove("active"));

//   pointsRedLeft.length = 0;
//   pointsRedRight.length = 0;
//   pointsBlueLeft.length = 0;
//   pointsBlueRight.length = 0;
//   pointsMeasure.length = 0;

//   canvas.style.cursor = "auto";
//   pointSize = 4;
//   showSize.innerHTML = "Current point size is: " + pointSize + "px";
// }


// -------------- ZOOM MODE --------------------- //

let zoomMode = false;
const zoomNotice = document.createElement('div');

// ZOOM NOTICE
zoomNotice.id = 'zoomNotice';
zoomNotice.innerText = '🔍 Zoom Mode is ON — use + / - / 0 to resize image by 1%. Press Z to toggle zoom mode.';
zoomNotice.style.cssText = `
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: #fffae6;
  border: 1px solid #f0c36d;
  padding: 10px 15px;
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  font-family: sans-serif;
  font-size: 14px;
  display: none;
`;
document.body.appendChild(zoomNotice);

document.addEventListener('keydown', function (e) {
  // 🚫 Prevent zoom mode activation inside input/textarea/editable content
  const active = document.activeElement;
  const isEditable = (
    active.tagName === 'INPUT' ||
    active.tagName === 'TEXTAREA' ||
    active.isContentEditable
  );

  if (isEditable) {
    return; // Do nothing if focus is in an editable field
  }

  const key = e.key;
  let current = parseInt(slider.value, 10);
  let newValue = current;

  // 🔁 Toggle Zoom Mode
  if (key.toLowerCase() === 'z') {
    zoomMode = !zoomMode; // If it was off (false), it turns on (true) and vice versa.
    zoomNotice.style.display = zoomMode ? 'block' : 'none'; // We show/hide the zoom notice depending on the mode.

    if (zoomMode && !slider.dataset.warned) {
      console.log("Zoom mode active — use + / - / 0 keys to resize image by 1%");
      slider.dataset.warned = "true";
    }

    return;
  }

  if (!zoomMode) return;

  // 🔍 Zoom In / Out
  if (key === '+' || key === '=') {
    newValue = Math.min(current + 1, 100); // +1%
  } else if (key === '-') {
    newValue = Math.max(current - 1, 1); // -1%
  } else if (key === '0') {
    newValue = 100; // Reset to 100%
  }

  if (newValue !== current) {
    e.preventDefault();
    slider.value = newValue;
    slider.dispatchEvent(new Event('input'));
  }
});




//-------------------------------------------------------------------------------------//

// let img = document.createElement("img");
// img.src = URL.createObjectURL(event.target.files[0]);
// img.style.position = "absolute";
// let widthI = img.width;
// let heightI = img.height;
// imgContainer.appendChild(img);
// imgContainer.style.backgroundImage = "url(" +URL.createObjectURL(event.target.files[0])+ ")";
// buttons.style.display = "inline-block";
// results.style.display = "inline-block";
// chButtons.style.display = "inline-block";

// ------------------- RESET FILE SECTION ===> RESET IMAGE AND FUNCTIONS -------------- //




let resetFile = function (event) {
  hasUnsavedData = false;
  imgContainer.style.backgroundImage = "";
  buttons.style.display = "none";
  // results.style.display = "none";
  // chButtons.style.display = "none";
  // imgInfo.style.display = "none";
  imgEdit.style.display = "none";
  canvas.style.cursor = "auto";
  canvas.removeEventListener("click", drawBlueLeft);
  canvas.removeEventListener("click", drawBlueRight);
  canvas.removeEventListener("click", drawRedLeft);
  canvas.removeEventListener("click", drawRedRight);
  canvas.removeEventListener("click", printMousePos);
  canvas.removeEventListener("click", drawMeasurePoint);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // canvasInfo.innerHTML = "<strong>Canvas size is:</strong> ";
  canvasUpload.style.display = "none";
  canvas.width = 0;
  canvas.height = 0;
  pointsRedLeft.length = 0;
  pointsRedRight.length = 0;
  pointsBlueLeft.length = 0;
  pointsBlueRight.length = 0;
  pointsMeasure.length = 0;
  imgContainer.style.width = "0";
  imgContainer.style.height = "0";
  // document.getElementById("inputScreenInches").value = "";
  // document.getElementById("inputScreenInches").style.display = "none";
  // document.getElementById("screenPPI").innerHTML = "";
  // document.getElementById("imageDimInches").innerHTML = "";
  // document.getElementById("imageDimCm").innerHTML = "";
  // document.getElementById("labelInput").style.display = "none";
  // document.getElementById("ppiCalculus").style.display = "none";
  document.getElementById("savedDistance").style.display = "none";
  document.getElementById("showData").style.display = "none";
  imgContainer.style.border = "none";
  canvas.style.display = "none";
  // document.getElementById("canvasWidth").value = '';
  // document.getElementById("canvasHeight").value = '';
  // let imgWidthInput = document.getElementById("containerWidth");
  // let imgHeightInput = document.getElementById("containerHeight");
  // imgWidthInput.value = '';
  // imgHeightInput.value = '';
  tableTitle.innerHTML = "<b>Table ID: <b>";
  document.getElementById("measureToCm").value = "";
  dist = 0;
  // imgSizeStatus = 0;
  document.getElementById('removeImage').style.display = "none";
  var elems = document.querySelectorAll(".active");
  [].forEach.call(elems, function (el) {
    el.classList.remove("active");
  });
  document.getElementById('accordion').style.display = 'none';
};

//---------------------------------------------------------//

//  function getScreenPPI(){
//    let diagonal = Math.sqrt(Math.pow((window.screen.width * window.devicePixelRatio), 2)+Math.pow((window.screen.height * window.devicePixelRatio), 2));
//    if (document.getElementById("inputScreenInches").value != ''){
//      document.getElementById("screenPPI").innerHTML = "<b>Your screen PPI is:</b> " + (diagonal/document.getElementById("inputScreenInches").value).toFixed(2);
//      document.getElementById("imageDimInches").innerHTML = "<b>Your image dimensions in inches are:</b> " + (img.width/(diagonal/document.getElementById("inputScreenInches").value)).toFixed(2)
//      + "x" + (img.height/(diagonal/document.getElementById("inputScreenInches").value)).toFixed(2);
//      document.getElementById("imageDimCm").innerHTML = "<b>Your image dimensions in cm are:</b> " + ((img.width/(diagonal/document.getElementById("inputScreenInches").value)) * 2.54).toFixed(2)
//      + "x" + ((img.height/(diagonal/document.getElementById("inputScreenInches").value)) * 2.54).toFixed(2);
//    } else
//    alert("No screen size in inches was given");
//  }

// --------------------------------------- //

// OPTIONS LIST DYNAMIC - SHOWING EVERY AVAILABLE OPTIONS OF POINTS TO CHOOSE //

// let pointsChosen1 = document.getElementById("pointChosen1");
// let pointsChosen2 = document.getElementById("pointChosen2");

// function refreshList(){
//   pointsChosen1.options.length = 0; // Every refresh click removes previous list to avoid duplicates
//   pointsChosen2.options.length = 0;
//   for(let i = 0; i < pointsRed.length; i++) {
//     newIndexRed = i+1;
//     pointsChosen1.options[pointsChosen1.options.length] = new Option("Red " + newIndexRed);
//     pointsChosen2.options[pointsChosen2.options.length] = new Option("Red " + newIndexRed);
//   }

//   for(let g = 0; g < pointsBlue.length; g++) {
//     newIndexBlue = g+1;
//     pointsChosen1.options[pointsChosen1.options.length] = new Option("Blue " + newIndexBlue);
//     pointsChosen2.options[pointsChosen2.options.length] = new Option("Blue " + newIndexBlue);
//   }
// }

// function emptyList(){
//   pointsChosen1.options.length = 0;
//   pointsChosen2.options.length = 0;
// }

// function addEntry(){
//   let value1 = pointsChosen1.value;
//   let value2 = pointsChosen2.value;
//   let rows = tbody.rows;
//   let value3 = measurementType.options[measurementType.selectedIndex].value;
//   let value4;
//   let value5;
//   if ((value1 != '') || (value2 != '')){
//     var newRow = tbody.insertRow(-1);
//     let indexRow = newRow.rowIndex;
//     var cellOne = newRow.insertCell();
//     var cellTwo = newRow.insertCell();
//     var cellThree = newRow.insertCell();
//     var cellFour = newRow.insertCell();
//     var cellFive = newRow.insertCell();
//     cellOne.innerHTML = indexRow-1;
//     cellTwo.innerHTML = value1 + "|" + value2;
//     cellThree.innerHTML = value3;
//     var index1 = document.getElementById("pointChosen1").selectedIndex;
//     var index2 = document.getElementById("pointChosen2").selectedIndex;
//     let option1 = pointsChosen1.value;
//     let option2 = pointsChosen2.value;
//     let distance;
//     if (option1){
//       if (option1.includes("Red")){
//         point1 = pointsRed[index1];
//         // console.log(point1.x, point1.y);
//       }
//       if (option1.includes("Blue")){
//         point1 = pointsBlue[index1 - pointsRed.length];
//         // console.log(point1.x, point1.y);
//       }
//     }
//     if (option2){
//       if (option2.includes("Red")){
//         point2 = pointsRed[index2];
//         // console.log(point2.x, point2.y);
//       }
//       if (option2.includes("Blue")){
//         point2 = pointsBlue[index2 - pointsRed.length];
//         // console.log(point2.x, point2.y);
//     }
//     }
//     distance = (Math.hypot(point1.x - point2.x, point1.y - point2.y)).toFixed(2);
//     value4 = distance;
//     cellFour.innerHTML = value4;
//     if (dist != 0){
//       cellFive.innerHTML = (value4/dist).toFixed(2);
//     }
//     if (dist == 0){
//       cellFive.innerHTML = "-----";
//     }

//     // console.log(value1, value2, value3, value4, value5);
//   } else{
//     alert('Need points to be selected');
//   }
// }

// Measuring all available distances for every chosen measurement type //

tbody = document.getElementById("tbody");
let pixelsManual = document.getElementById("pixelsInCmMan");

let footstepsBeginning = document.getElementById("footstepsBeginning");
let footstepStart = document.getElementById("footstepStart");
let measurementType = document.getElementById("measurement");
let addButton = document.getElementById('addAll'), addButtonAverage = document.getElementById('addAllAverage');
let removeByEntriesOption = document.getElementById('removeByEntries');
let removeByMeasurementsOption = document.getElementById('removeByMeasurement');
let modalHelpAe = document.getElementById('modalHelpAddEntries');
let closeModalHelpAe = document.getElementById('closeModalHelpAddEntries');
let openAeModal = document.getElementById('openAe');
let modalHelpAea = document.getElementById('modalHelpAddEntriesAverage');
let closeModalHelpAea = document.getElementById('closeModalHelpAddEntriesAverage');
let openAeaModal = document.getElementById('openAea');


// SHOW ADD VALUES OPTIONS ONLY IF RIGHT OR LEFT ARE SELECTED IN THE SELECT TAG

addButton.style.display = 'none', addButtonAverage.style.display = 'none';
openAeModal.style.display = 'none', openAeaModal.style.display = 'none';

footstepStart.addEventListener("change", function(){
if (footstepStart.value == "Left" || footstepStart.value == "Right"){
 addButton.style.display = '', addButtonAverage.style.display = '';
 openAeModal.style.display = '', openAeaModal.style.display = '';
} else{
 addButton.style.display = 'none', addButtonAverage.style.display = 'none';
 openAeModal.style.display = 'none', openAeaModal.style.display = 'none';
}
})


// HELP MODALS

modalHelpAe.classList.add('hidden'), modalHelpAea.classList.add('hidden');

closeModalHelpAe.onclick = function displayNoneModalAe(){
    modalHelpAe.classList.add("hidden");
};

openAeModal.onclick = function displayModalAe(){
    modalHelpAe.classList.remove('hidden');
}

closeModalHelpAea.onclick = function displayNoneModalAea(){
    modalHelpAea.classList.add("hidden");
};

openAeaModal.onclick = function displayModalAea(){
    modalHelpAea.classList.remove('hidden');
}


// SHOW REMOVE OPTIONS ONLY IF THE TABLE IS POPULATED
removeByEntriesOption.style.display = 'none', removeByMeasurementsOption.style.display = 'none'




// function addEntry(){
// if (measurementType.options[measurementType.selectedIndex].value == 'Stride length left front'){
//  if (pointsRedLeft.length > 1){
//    for (var i = 0; i < (pointsRedLeft.length-1); i++){
//      var newRow = tbody.insertRow(-1);
//      let indexRow = newRow.rowIndex;
//      var cellOne = newRow.insertCell();
//      var cellTwo = newRow.insertCell();
//      var cellThree = newRow.insertCell();
//      var cellFour = newRow.insertCell();
//      var cellFive = newRow.insertCell();
//      cellOne.innerHTML = indexRow-1;
//      cellTwo.innerHTML = 'Red L' + (i+1) + ' &#x2192 Red L' + (i+2);
//      cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//      distance = (Math.hypot(pointsRedLeft[i].x - pointsRedLeft[i+1].x, pointsRedLeft[i].y - pointsRedLeft[i+1].y)).toFixed(2);
//      cellFour.innerHTML = distance;
//      if (dist != 0){
//        cellFive.innerHTML = (distance/dist).toFixed(2);
//      } else{
//        cellFive.innerHTML = "Undefined";
//      }
//     //  cellRemove.innerHTML = '&#x2718;';
//     //  cellRemove.style.cursor = 'pointer';
//     //  cellRemove.style.fontSize = 'x-large';
//     //  cellRemove.style.color = 'red';
//     //  cellRemove.onclick = function removeOnClick(){
//     //   tbody.deleteRow(indexRow-2);
//     //   for (var i = 0; i < tbody.rows.length; i++){
//     //     let updatedCell = tbody.rows[i].cells[0];
//     //     updatedCell.innerHTML = i+1;
//     //   }
//     // };
//    }
//  } else{
//    alert('Not enough points to perform this measurement');
//  }
// } if (measurementType.options[measurementType.selectedIndex].value == 'Stride length right front'){
//  if (pointsRedRight.length > 1){
//    for (var i = 0; i < (pointsRedRight.length-1); i++){
//      var newRow = tbody.insertRow(-1);
//      let indexRow = newRow.rowIndex;
//      var cellOne = newRow.insertCell();
//      var cellTwo = newRow.insertCell();
//      var cellThree = newRow.insertCell();
//      var cellFour = newRow.insertCell();
//      var cellFive = newRow.insertCell();
//      cellOne.innerHTML = indexRow-1;
//      cellTwo.innerHTML = 'Red R' + (i+1) + ' &#x2192 Red R' + (i+2);
//      cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//      distance = (Math.hypot(pointsRedRight[i].x - pointsRedRight[i+1].x, pointsRedRight[i].y - pointsRedRight[i+1].y)).toFixed(2);
//      cellFour.innerHTML = distance;
//      if (dist != 0){
//        cellFive.innerHTML = (distance/dist).toFixed(2);
//      } else{
//        cellFive.innerHTML = 'Undefined';
//      }
//    }
//  }  else{
//    alert('Not enough points to perform this measurement');
//  }
// } if (measurementType.options[measurementType.selectedIndex].value == 'Stride length left hind'){
//  if (pointsBlueLeft.length > 1){
//    for (var i = 0; i < (pointsBlueLeft.length-1); i++){
//      var newRow = tbody.insertRow(-1);
//      let indexRow = newRow.rowIndex;
//      var cellOne = newRow.insertCell();
//      var cellTwo = newRow.insertCell();
//      var cellThree = newRow.insertCell();
//      var cellFour = newRow.insertCell();
//      var cellFive = newRow.insertCell();
//      cellOne.innerHTML = indexRow-1;
//      cellTwo.innerHTML = 'Blue L' + (i+1) + ' &#x2192 Blue L' + (i+2);
//      cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//      distance = (Math.hypot(pointsBlueLeft[i].x - pointsBlueLeft[i+1].x, pointsBlueLeft[i].y - pointsBlueLeft[i+1].y)).toFixed(2);
//      cellFour.innerHTML = distance;
//      if (dist != 0){
//        cellFive.innerHTML = (distance/dist).toFixed(2);
//      } else{
//        cellFive.innerHTML = 'Undefined';
//      }
//    }
//  }  else{
//    alert('Not enough points to perform this measurement');
//  }
// } if (measurementType.options[measurementType.selectedIndex].value == 'Stride length right hind'){
//  if (pointsBlueRight.length > 1){
//    for (var i = 0; i < (pointsBlueRight.length-1); i++){
//      var newRow = tbody.insertRow(-1);
//      let indexRow = newRow.rowIndex;
//      var cellOne = newRow.insertCell();
//      var cellTwo = newRow.insertCell();
//      var cellThree = newRow.insertCell();
//      var cellFour = newRow.insertCell();
//      var cellFive = newRow.insertCell();
//      cellOne.innerHTML = indexRow-1;
//      cellTwo.innerHTML = 'Blue R' + (i+1) + ' &#x2192 Blue R' + (i+2);
//      cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//      distance = (Math.hypot(pointsBlueRight[i].x - pointsBlueRight[i+1].x, pointsBlueRight[i].y - pointsBlueRight[i+1].y)).toFixed(2);
//      cellFour.innerHTML = distance;
//      if (dist != 0){
//        cellFive.innerHTML = (distance/dist).toFixed(2);
//      } else{
//        cellFive.innerHTML = 'Undefined';
//      }
//    }
//  }  else{
//    alert('Not enough points to perform this measurement');
//  }
// } if (measurementType.options[measurementType.selectedIndex].value == 'Overlap Left'){
//   if ((pointsRedLeft.length >= 1) && (pointsBlueLeft.length >= 1)){
//   for (var i= 0; i < pointsRedLeft.length; i++){
//     for (var j = 0; j < pointsBlueLeft.length; j++){
//       if (i == j){
//       var newRow = tbody.insertRow(-1);
//       let indexRow = newRow.rowIndex;
//       var cellOne = newRow.insertCell();
//       var cellTwo = newRow.insertCell();
//       var cellThree = newRow.insertCell();
//       var cellFour = newRow.insertCell();
//       var cellFive = newRow.insertCell();
//       cellOne.innerHTML = indexRow-1;
//       cellTwo.innerHTML = 'Red L' + (i+1) + ' &#x2192 Blue L' + (j+1);
//       cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//       distance = (Math.hypot(pointsRedLeft[i].x - pointsBlueLeft[j].x, pointsRedLeft[i].y - pointsBlueLeft[j].y)).toFixed(2);
//       cellFour.innerHTML = distance;
//       if (dist != 0){
//         cellFive.innerHTML = (distance/dist).toFixed(2);
//       } else{
//         cellFive.innerHTML = 'Undefined';
//       }
//    }
//  }
//  }
// } else{
//   alert('Not enough points to perform this measurement');
// }
// } if (measurementType.options[measurementType.selectedIndex].value == 'Overlap Right'){
//   if ((pointsRedRight.length >= 1) && (pointsBlueRight.length >= 1)){
//   for (var i= 0; i < pointsRedRight.length; i++){
//    for (var j = 0; j < pointsBlueRight.length; j++){
//      if (i == j){
//      var newRow = tbody.insertRow(-1);
//      let indexRow = newRow.rowIndex;
//      var cellOne = newRow.insertCell();
//      var cellTwo = newRow.insertCell();
//      var cellThree = newRow.insertCell();
//      var cellFour = newRow.insertCell();
//      var cellFive = newRow.insertCell();
//      cellOne.innerHTML = indexRow-1;
//      cellTwo.innerHTML = 'Red R' + (i+1) + ' &#x2192 Blue R' + (j+1);
//      cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//      distance = (Math.hypot(pointsRedRight[i].x - pointsBlueRight[j].x, pointsRedRight[i].y - pointsBlueRight[j].y)).toFixed(2);
//      cellFour.innerHTML = distance;
//      if (dist != 0){
//        cellFive.innerHTML = (distance/dist).toFixed(2);
//      } else{
//        cellFive.innerHTML = 'Undefined';
//      }
//    }
//  }
//  }
// } else{
//   alert('Not enough points to perform this measurement');
// }
// } if (measurementType.options[measurementType.selectedIndex].value == 'Stride Width Front'){
//  if (footstepStart.options[footstepStart.selectedIndex].value == 'Left'){
//   if((pointsRedLeft.length >= 1) && (pointsRedRight.length >= 1)){
//    for (var i = 0; i < pointsRedLeft.length; i++){
//      for (var j = 0; j < pointsRedRight.length; j++){
//        if (i == j){
//          var newRow = tbody.insertRow(-1);
//          let indexRow = newRow.rowIndex;
//          var cellOne = newRow.insertCell();
//          var cellTwo = newRow.insertCell();
//          var cellThree = newRow.insertCell();
//          var cellFour = newRow.insertCell();
//          var cellFive = newRow.insertCell();
//          cellOne.innerHTML = indexRow-1;
//          cellTwo.innerHTML = 'Imaginary ' + (indexRow-1) + ' &#x2192 Red R' + (j+1);
//          cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//          distance = (Math.hypot(pointsRedRight[j].x - pointsRedRight[j].x, pointsRedLeft[i].y - pointsRedRight[j].y)).toFixed(2);
//          cellFour.innerHTML = distance;
//          if (dist != 0){
//            cellFive.innerHTML = (distance/dist).toFixed(2);
//          } else{
//            cellFive.innerHTML = 'Undefined';
//          }
//      } if (i == j+1){
//        var newRow = tbody.insertRow(-1);
//          let indexRow = newRow.rowIndex;
//          var cellOne = newRow.insertCell();
//          var cellTwo = newRow.insertCell();
//          var cellThree = newRow.insertCell();
//          var cellFour = newRow.insertCell();
//          var cellFive = newRow.insertCell();
//          cellOne.innerHTML = indexRow-1;
//          cellTwo.innerHTML = 'Imaginary ' + (indexRow-1) + ' &#x2192 Red L' + (i+1);
//          cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//          distance = (Math.hypot(pointsRedLeft[i].x - pointsRedLeft[i].x, pointsRedLeft[i].y - pointsRedRight[j].y)).toFixed(2);
//          cellFour.innerHTML = distance;
//          if (dist != 0){
//            cellFive.innerHTML = (distance/dist).toFixed(2);
//          }else{
//            cellFive.innerHTML = 'Undefined';
//          }
//      }
//      }
//    }
//   } else{
//   alert('Not enough points to perform this measurement');
//  }
// }
//  if (footstepStart.options[footstepStart.selectedIndex].value == 'Right'){
//   if((pointsRedLeft.length >= 1) && (pointsRedRight.length >= 1)){
//   for (var i = 0; i < pointsRedLeft.length; i++){
//      for (var j = 0; j < pointsRedRight.length; j++){
//        if (i == j){
//          var newRow = tbody.insertRow(-1);
//          let indexRow = newRow.rowIndex;
//          var cellOne = newRow.insertCell();
//          var cellTwo = newRow.insertCell();
//          var cellThree = newRow.insertCell();
//          var cellFour = newRow.insertCell();
//          var cellFive = newRow.insertCell();
//          cellOne.innerHTML = indexRow-1;
//          cellTwo.innerHTML = 'Imaginary ' + (indexRow-1) + ' &#x2192 Red L' + (i+1);
//          cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//          distance = (Math.hypot(pointsRedLeft[i].x - pointsRedLeft[i].x, pointsRedRight[j].y - pointsRedLeft[i].y)).toFixed(2);
//          cellFour.innerHTML = distance;
//          if (dist != 0){
//            cellFive.innerHTML = (distance/dist).toFixed(2);
//          } else{
//            cellFive.innerHTML = 'Undefined';
//          }
//      } if (j == i+1){
//        var newRow = tbody.insertRow(-1);
//          let indexRow = newRow.rowIndex;
//          var cellOne = newRow.insertCell();
//          var cellTwo = newRow.insertCell();
//          var cellThree = newRow.insertCell();
//          var cellFour = newRow.insertCell();
//          var cellFive = newRow.insertCell();
//          cellOne.innerHTML = indexRow-1;
//          cellTwo.innerHTML = 'Imaginary ' + (indexRow-1) + ' &#x2192 Red R' + (j+1);
//          cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//          distance = (Math.hypot(pointsRedRight[j].x - pointsRedRight[j].x, pointsRedLeft[i].y - pointsRedRight[j].y)).toFixed(2);
//          cellFour.innerHTML = distance;
//          if (dist != 0){
//            cellFive.innerHTML = (distance/dist).toFixed(2);
//          }else{
//            cellFive.innerHTML = 'Undefined';
//          }
//      }
//      }
//    }
//  } else{
//   alert('Not enough points to perform this measurement');
//  }
// }
// } if (measurementType.options[measurementType.selectedIndex].value == 'Stride Width Hind'){
//  if (footstepStart.options[footstepStart.selectedIndex].value == 'Left'){
//   if((pointsBlueLeft.length >= 1) &&(pointsBlueRight.length >= 1)){
//    for (var i = 0; i < pointsBlueLeft.length; i++){
//      for (var j = 0; j < pointsBlueRight.length; j++){
//        if (i == j){
//          var newRow = tbody.insertRow(-1);
//          let indexRow = newRow.rowIndex;
//          var cellOne = newRow.insertCell();
//          var cellTwo = newRow.insertCell();
//          var cellThree = newRow.insertCell();
//          var cellFour = newRow.insertCell();
//          var cellFive = newRow.insertCell();
//          cellOne.innerHTML = indexRow-1;
//          cellTwo.innerHTML = 'Imaginary ' + (indexRow-1) + ' &#x2192 Blue R' + (j+1);
//          cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//          distance = (Math.hypot(pointsBlueRight[j].x - pointsBlueRight[j].x, pointsBlueLeft[i].y - pointsBlueRight[j].y)).toFixed(2);
//          cellFour.innerHTML = distance;
//          if (dist != 0){
//            cellFive.innerHTML = (distance/dist).toFixed(2);
//          } else{
//            cellFive.innerHTML = 'Undefined';
//          }
//      } if (i == j+1){
//        var newRow = tbody.insertRow(-1);
//          let indexRow = newRow.rowIndex;
//          var cellOne = newRow.insertCell();
//          var cellTwo = newRow.insertCell();
//          var cellThree = newRow.insertCell();
//          var cellFour = newRow.insertCell();
//          var cellFive = newRow.insertCell();
//          cellOne.innerHTML = indexRow-1;
//          cellTwo.innerHTML = 'Imaginary ' + (indexRow-1) + ' &#x2192 Blue L' + (i+1);
//          cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//          distance = (Math.hypot(pointsBlueLeft[i].x - pointsBlueLeft[i].x, pointsBlueLeft[i].y - pointsBlueRight[j].y)).toFixed(2);
//          cellFour.innerHTML = distance;
//          if (dist != 0){
//            cellFive.innerHTML = (distance/dist).toFixed(2);
//          }else{
//            cellFive.innerHTML = 'Undefined';
//          }
//      }
//      }
//    }
//  } else{
//   alert('Not enough points to perform this measurement');
//  }
// }
//  if (footstepStart.options[footstepStart.selectedIndex].value == 'Right'){
//   if((pointsBlueLeft.length >= 1) &&(pointsBlueRight.length >= 1)){
//    for (var i = 0; i < pointsBlueLeft.length; i++){
//      for (var j = 0; j < pointsBlueRight.length; j++){
//        if (i == j){
//          var newRow = tbody.insertRow(-1);
//          let indexRow = newRow.rowIndex;
//          var cellOne = newRow.insertCell();
//          var cellTwo = newRow.insertCell();
//          var cellThree = newRow.insertCell();
//          var cellFour = newRow.insertCell();
//          var cellFive = newRow.insertCell();
//          cellOne.innerHTML = indexRow-1;
//          cellTwo.innerHTML = 'Imaginary ' + (indexRow-1) + ' &#x2192 Blue L' + (i+1);
//          cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//          distance = (Math.hypot(pointsBlueLeft[i].x - pointsBlueLeft[i].x, pointsBlueRight[j].y - pointsBlueLeft[i].y)).toFixed(2);
//          cellFour.innerHTML = distance;
//          if (dist != 0){
//            cellFive.innerHTML = (distance/dist).toFixed(2);
//          } else{
//            cellFive.innerHTML = 'Undefined';
//          }
//      } if (j == i+1){
//        var newRow = tbody.insertRow(-1);
//          let indexRow = newRow.rowIndex;
//          var cellOne = newRow.insertCell();
//          var cellTwo = newRow.insertCell();
//          var cellThree = newRow.insertCell();
//          var cellFour = newRow.insertCell();
//          var cellFive = newRow.insertCell();
//          cellOne.innerHTML = indexRow-1;
//          cellTwo.innerHTML = 'Imaginary ' + (indexRow-1) + ' &#x2192 Blue R' + (j+1);
//          cellThree.innerHTML = measurementType.options[measurementType.selectedIndex].value;
//          distance = (Math.hypot(pointsBlueRight[j].x - pointsBlueRight[j].x, pointsBlueLeft[i].y - pointsBlueRight[j].y)).toFixed(2);
//          cellFour.innerHTML = distance;
//          if (dist != 0){
//            cellFive.innerHTML = (distance/dist).toFixed(2);
//          }else{
//            cellFive.innerHTML = 'Undefined';
//          }
//        }
//      }
//    }
//  }else{
//   alert('Not enough points to perform this measurement');
//  }
// }
// }
// }

let entryNumber = document.getElementById("entryNumber");

function removeEntry() {
  let lastRow = tbody.rows[tbody.rows.length - 1];
  if (entryNumber.value != "") {
    // console.log(entryNumber.value);
    tbody.deleteRow(entryNumber.value - 1);
    for (var i = 0; i < tbody.rows.length; i++) {
      let updatedCell = tbody.rows[i].cells[0];
      if (
        updatedCell.innerHTML ===
        "------------------------------BREAK------------------------------"
      ) {
        updatedCell.innerHTML =
          "------------------------------BREAK------------------------------";
      } else {
        updatedCell.innerHTML = i + 1;
      }
    }
  } else if (tbody.rows.length == 1) {
    tbody.deleteRow(-1);
  } else {
    if (
      lastRow.cells[0].innerHTML ===
      "------------------------------BREAK------------------------------"
    ) {
      $("#tbody tr:nth-last-child(2)").remove();
    } else {
      tbody.deleteRow(-1);
    }
  }
  if (tbody.rows.length >= 1){
    removeByEntriesOption.style.display = '', removeByMeasurementsOption.style.display = ''
  } else{
    removeByEntriesOption.style.display = 'none', removeByMeasurementsOption.style.display = 'none'
  }
}

function removeAllEntries() {
  $("#tbody").empty();
  removeByEntriesOption.style.display = 'none', removeByMeasurementsOption.style.display = 'none';
}

// function updateTableID() {
//   tableTitle.innerHTML = "<b>Table ID: <b>";
//   tableTitle.innerHTML += " " + manualID.value;
// }

function removeTableID() {
  tableTitle.innerHTML = "<b>Table ID: <b>";
  manualID.value = "";
}

// RIGHT-SIDE OPTIONS 

let activeFunctionInfo = document.getElementById('activeFunction');

let selectPoint = document.getElementById("selectPoint");

// FUNCTIONALITY TO REMOVE OR REPLACE POINTS 

let removePointButton = document.getElementById('removePoint');
let replacePointButton = document.getElementById('replacePoint');


function refreshRemoveList() {
  selectPoint.options.length = 0;
  selectPoint.options[0] = new Option('Select Point');
  for (var i = 0; i < pointsRedLeft.length; i++) {
    newIndexRedL = i + 1;
    selectPoint.options[selectPoint.options.length] = new Option(
      "Red L" + newIndexRedL, "Red L" + newIndexRedL 
    );
  }
  for (var j = 0; j < pointsRedRight.length; j++) {
    newIndexRedR = j + 1;
    selectPoint.options[selectPoint.options.length] = new Option(
      "Red R" + newIndexRedR, "Red R" + newIndexRedR
    );
  }
  for (var k = 0; k < pointsBlueLeft.length; k++) {
    newIndexBlueL = k + 1;
    selectPoint.options[selectPoint.options.length] = new Option(
      "Blue L" + newIndexBlueL, "Blue L" + newIndexBlueL
    );
  }
  for (var l = 0; l < pointsBlueRight.length; l++) {
    newIndexBlueR = l + 1;
    selectPoint.options[selectPoint.options.length] = new Option(
      "Blue R" + newIndexBlueR, "Blue R" + newIndexBlueR
    );
  }
}

function emptyRemoveList() {
  selectPoint.options.length = 0;
}

removePointButton.style.display = 'none', replacePointButton.style.display = 'none';

selectPoint.addEventListener('change', function(){
  if ((selectPoint.value.includes('Red')) || (selectPoint.value.includes('Blue'))){
    removePointButton.style.display = '', replacePointButton.style.display = '';
  } else{
    removePointButton.style.display = 'none', replacePointButton.style.display = 'none';
  }
})

function removeChosenPoint() {  // THIS FUNCTION IS FIXED AND OPTIMIZED --PREVIOUS VERSION WAS REDUNDANT AND WASNT PROPERLY WORKING
  let value = selectPoint.value;
  if (value.includes("Red L")) {
    let redLindex = value.substr(5);
    
    ctx.clearRect(
      pointsRedLeft[redLindex-1].x - pointSize,
      pointsRedLeft[redLindex-1].y - pointSize,
      pointSize * 4 + 18,
      pointSize * 4 + 10
    );
    pointsRedLeft.splice(redLindex-1, 1);
    for (var i = 0; i < pointsRedLeft.length; i++) {
        if (i >= 9) {
          ctx.clearRect(
            pointsRedLeft[i].x - pointSize,
            pointsRedLeft[i].y - pointSize,
            pointSize * 4 + 18,
            pointSize * 4 + 10
          );
          
        } else {
          ctx.clearRect(
            pointsRedLeft[i].x - pointSize,
            pointsRedLeft[i].y - pointSize,
            pointSize * 4 + 10,
            pointSize * 4 + 10
          );
          
        }
      // ------------------------------------------------------------------------- //
      ctx.beginPath();
      ctx.fillStyle = "hsl(0, 100%, 30%)"; // dark red
      ctx.arc(
        pointsRedLeft[i].x,
        pointsRedLeft[i].y,
        pointSize,
        0,
        Math.PI * 2,
        true
      );
      ctx.fill();
      ctx.font = " " + (parseInt(pointSize) + 8) + "px Arial";
      ctx.fillText(
        "L" + (i + 1),
        pointsRedLeft[i].x + pointSize * 1.2,
        pointsRedLeft[i].y + pointSize * 1.2 + 10
      );
    }
  }
  if (value.includes("Red R")) {
    let redRindex = value.substr(5);
    
    ctx.clearRect(
      pointsRedRight[redRindex-1].x - pointSize,
      pointsRedRight[redRindex-1].y - pointSize,
      pointSize * 4 + 18,
      pointSize * 4 + 10
    );
    pointsRedRight.splice(redRindex-1, 1);
    for (var j = 0; j < pointsRedRight.length; j++) {
        if (j >= 9) {
          ctx.clearRect(
            pointsRedRight[j].x - pointSize,
            pointsRedRight[j].y - pointSize,
            pointSize * 4 + 20,
            pointSize * 4 + 10
          );
        } else {
          ctx.clearRect(
            pointsRedRight[j].x - pointSize,
            pointsRedRight[j].y - pointSize,
            pointSize * 4 + 12,
            pointSize * 4 + 10
          );
        } 
      ctx.beginPath();
      ctx.fillStyle = "hsl(0, 100%, 30%)"; // dark red
      ctx.arc(
        pointsRedRight[j].x,
        pointsRedRight[j].y,
        pointSize,
        0,
        Math.PI * 2,
        true
      );
      ctx.fill();
      ctx.font = " " + (parseInt(pointSize) + 8) + "px Arial";
      ctx.fillText(
        "R" + (j + 1),
        pointsRedRight[j].x + pointSize * 1.2,
        pointsRedRight[j].y + pointSize * 1.2 + 10
      );
    }
  }
  if (value.includes("Blue L")) {
    let blueLindex = value.substr(6);
    
    ctx.clearRect(
      pointsBlueLeft[blueLindex-1].x - pointSize,
      pointsBlueLeft[blueLindex-1].y - pointSize,
      pointSize * 4 + 18,
      pointSize * 4 + 10
    );
    pointsBlueLeft.splice(blueLindex-1, 1);
    for (var k = 0; k < pointsBlueLeft.length; k++) {
      
      if (k >= 9) {
        ctx.clearRect(
          pointsBlueLeft[k].x - pointSize,
          pointsBlueLeft[k].y - pointSize,
          pointSize * 4 + 18,
          pointSize * 4 + 10
        );
      } else {
        ctx.clearRect(
          pointsBlueLeft[k].x - pointSize,
          pointsBlueLeft[k].y - pointSize,
          pointSize * 4 + 10,
          pointSize * 4 + 10
        );
      }
      
      ctx.beginPath();
      ctx.fillStyle = "hsl(245, 89%, 42%)"; // Dark Blue color
      ctx.arc(
        pointsBlueLeft[k].x,
        pointsBlueLeft[k].y,
        pointSize,
        0,
        Math.PI * 2,
        true
      );
      ctx.fill();
      ctx.font = " " + (parseInt(pointSize) + 8) + "px Arial";
      ctx.fillText(
        "L" + (k + 1),
        pointsBlueLeft[k].x + pointSize * 1.2,
        pointsBlueLeft[k].y + pointSize * 1.2 + 10
      );
    }
  }
  if (value.includes("Blue R")) {
    let blueRindex = value.substr(6);
    
    ctx.clearRect(
      pointsBlueRight[blueRindex-1].x - pointSize,
      pointsBlueRight[blueRindex-1].y - pointSize,
      pointSize * 4 + 18,
      pointSize * 4 + 10
    );
    pointsBlueRight.splice(blueRindex-1, 1);
    for (var l = 0; l < pointsBlueRight.length; l++) {
        if (l >= 9) {
          ctx.clearRect(
            pointsBlueRight[l].x - pointSize,
            pointsBlueRight[l].y - pointSize,
            pointSize * 4 + 20,
            pointSize * 4 + 10
          );
        } else {
          ctx.clearRect(
            pointsBlueRight[l].x - pointSize,
            pointsBlueRight[l].y - pointSize,
            pointSize * 4 + 12,
            pointSize * 4 + 10
          );
        }
        ctx.beginPath();
      ctx.fillStyle = "hsl(245, 89%, 42%)"; // Dark Blue color
      ctx.arc(
        pointsBlueRight[l].x,
        pointsBlueRight[l].y,
        pointSize,
        0,
        Math.PI * 2,
        true
      );
      ctx.fill();
      ctx.font = " " + (parseInt(pointSize) + 8) + "px Arial";
      ctx.fillText(
        "R" + (l + 1),
        pointsBlueRight[l].x + pointSize * 1.2,
        pointsBlueRight[l].y + pointSize * 1.2 + 10
      );
      }
    }
    refreshRemoveList();
  }


// REPLACE CHOSEN POINT FUNCTION WORKING 

function replaceChosenPoint(){
  removePointButton.disabled = true;
  replacePointButton.disabled = true;
  selectPoint.disabled = true;
  document.getElementById('removeImage').disabled = true;
  document.querySelector('.upload-btn').disabled = true;
  document.getElementById('redCircleLeft').disabled = true;
  document.getElementById('redCircleRight').disabled = true;
  document.getElementById('blueCircleLeft').disabled = true;
  document.getElementById('blueCircleRight').disabled = true;
  canvas.style.cursor = "crosshair";
  var elems = document.querySelectorAll(".active");
  [].forEach.call(elems, function (el) {
    el.classList.remove("active");
  });
  if (selectPoint.value.includes('Red L')){
    let indexNumber = selectPoint.options[selectPoint.selectedIndex].value.substr(5);
    activeFunctionInfo.style.color = 'red';
    activeFunctionInfo.style.fontWeight = 'bold';
    activeFunctionInfo.innerHTML = '<i class="fa-solid fa-repeat"></i>&nbsp Replacing Red (front) L'+indexNumber;
    if (indexNumber >= 9) {
      ctx.clearRect(
        pointsRedLeft[indexNumber-1].x - pointSize,
        pointsRedLeft[indexNumber-1].y - pointSize,
        pointSize * 4 + 20,
        pointSize * 4 + 10
      );
    } else{
    ctx.clearRect(
      pointsRedLeft[indexNumber-1].x - pointSize,
      pointsRedLeft[indexNumber-1].y - pointSize,
      pointSize * 4 + 12,
      pointSize * 4 + 10
    );
  }
    console.log(indexNumber-1);
    
    console.log(pointsRedLeft);
    canvas.removeEventListener("click", drawRedLeft, false);
    canvas.removeEventListener("click", drawRedRight, false);
    canvas.removeEventListener("click", drawBlueLeft, false);
    canvas.removeEventListener("click", drawBlueRight, false);
    canvas.addEventListener("click", function replacePoint(e){
      
      var newPoint = getPosition(e);
      console.log(newPoint);
      
      drawCoordinatesRed(newPoint, pointSize);
      pointsRedLeft.splice(parseInt(indexNumber-1),1, newPoint);
      // pointsRedLeft.push(newPoint);
      console.log(pointsRedLeft);
      // let index = pointsRedLeft.indexOf(newPoint);
      ctx.font = " " + (parseInt(pointSize) + 8) + "px Arial";
      ctx.fillText(
        "L" + (indexNumber),
        newPoint.x + pointSize * 1.2,
        newPoint.y + pointSize * 1.2 + 10
      );
      canvas.removeEventListener("click", replacePoint);
      canvas.style.cursor = "auto";
      removePointButton.disabled = false;
      replacePointButton.disabled = false;
      selectPoint.disabled = false;
      document.getElementById('removeImage').disabled = false;
      document.querySelector('.upload-btn').disabled = false;
      document.getElementById('redCircleLeft').disabled = false;
      document.getElementById('redCircleRight').disabled = false;
      document.getElementById('blueCircleLeft').disabled = false;
      document.getElementById('blueCircleRight').disabled = false;
      activeFunctionInfo.innerHTML = '';
          }, false);
    
  }
  if (selectPoint.value.includes('Red R')){
    let indexNumber = selectPoint.options[selectPoint.selectedIndex].value.substr(5);
    activeFunctionInfo.style.color = 'red';
    activeFunctionInfo.style.fontWeight = 'bold';
    activeFunctionInfo.innerHTML = '<i class="fa-solid fa-repeat"></i>&nbsp Replacing Red (front) R'+indexNumber;
    if (indexNumber >= 9) {
      ctx.clearRect(
        pointsRedRight[indexNumber-1].x - pointSize,
        pointsRedRight[indexNumber-1].y - pointSize,
        pointSize * 4 + 20,
        pointSize * 4 + 10
      );
    } else{
    ctx.clearRect(
      pointsRedRight[indexNumber-1].x - pointSize,
      pointsRedRight[indexNumber-1].y - pointSize,
      pointSize * 4 + 12,
      pointSize * 4 + 10
    );
  }
    console.log(indexNumber-1);
    
    console.log(pointsRedRight);
    canvas.removeEventListener("click", drawRedLeft, false);
    canvas.removeEventListener("click", drawRedRight, false);
    canvas.removeEventListener("click", drawBlueLeft, false);
    canvas.removeEventListener("click", drawBlueRight, false);
    canvas.addEventListener("click", function replacePoint(e){
      canvas.style.cursor = "crosshair";
      var newPoint = getPosition(e);
      console.log(newPoint);
      
      drawCoordinatesRed(newPoint, pointSize);
      pointsRedRight.splice(parseInt(indexNumber-1),1, newPoint);
      
      console.log(pointsRedRight);
      // let index = pointsRedLeft.indexOf(newPoint);
      ctx.font = " " + (parseInt(pointSize) + 8) + "px Arial";
      ctx.fillText(
        "R" + (indexNumber),
        newPoint.x + pointSize * 1.2,
        newPoint.y + pointSize * 1.2 + 10
      );
      canvas.removeEventListener("click", replacePoint);
      canvas.style.cursor = "auto";
      removePointButton.disabled = false;
      replacePointButton.disabled = false;
      selectPoint.disabled = false;
      document.getElementById('removeImage').disabled = false;
      document.querySelector('.upload-btn').disabled = false;
      document.getElementById('redCircleLeft').disabled = false;
      document.getElementById('redCircleRight').disabled = false;
      document.getElementById('blueCircleLeft').disabled = false;
      document.getElementById('blueCircleRight').disabled = false;
      activeFunctionInfo.innerHTML = '';
          }, false);
      
  }
  if (selectPoint.value.includes('Blue L')){
    let indexNumber = selectPoint.options[selectPoint.selectedIndex].value.substr(6);
    activeFunctionInfo.style.color = 'red';
    activeFunctionInfo.style.fontWeight = 'bold';
    activeFunctionInfo.innerHTML = '<i class="fa-solid fa-repeat"></i>&nbsp Replacing Blue (hind) L'+indexNumber;
    if (indexNumber >= 9) {
      ctx.clearRect(
        pointsBlueLeft[indexNumber-1].x - pointSize,
        pointsBlueLeft[indexNumber-1].y - pointSize,
        pointSize * 4 + 20,
        pointSize * 4 + 10
      );
    } else{
    ctx.clearRect(
      pointsBlueLeft[indexNumber-1].x - pointSize,
      pointsBlueLeft[indexNumber-1].y - pointSize,
      pointSize * 4 + 12,
      pointSize * 4 + 10
    );
  }
    console.log(indexNumber-1);
    
    console.log(pointsBlueLeft);
    canvas.removeEventListener("click", drawRedLeft, false);
    canvas.removeEventListener("click", drawRedRight, false);
    canvas.removeEventListener("click", drawBlueLeft, false);
    canvas.removeEventListener("click", drawBlueRight, false);
    canvas.addEventListener("click", function replacePoint(e){
      var newPoint = getPosition(e);
      console.log(newPoint);
      
      drawCoordinatesBlue(newPoint, pointSize);
      pointsBlueLeft.splice(parseInt(indexNumber-1),1, newPoint);
      
      console.log(pointsBlueLeft);
      // let index = pointsRedLeft.indexOf(newPoint);
      ctx.font = " " + (parseInt(pointSize) + 8) + "px Arial";
      ctx.fillText(
        "L" + (indexNumber),
        newPoint.x + pointSize * 1.2,
        newPoint.y + pointSize * 1.2 + 10
      );
      canvas.removeEventListener("click", replacePoint);
      canvas.style.cursor = "auto";
      removePointButton.disabled = false;
      replacePointButton.disabled = false;
      selectPoint.disabled = false;
      document.getElementById('removeImage').disabled = false;
      document.querySelector('.upload-btn').disabled = false;
      document.getElementById('redCircleLeft').disabled = false;
      document.getElementById('redCircleRight').disabled = false;
      document.getElementById('blueCircleLeft').disabled = false;
      document.getElementById('blueCircleRight').disabled = false;
      activeFunctionInfo.innerHTML = '';
          }, false);
      
  }
  if (selectPoint.value.includes('Blue R')){
    let indexNumber = selectPoint.options[selectPoint.selectedIndex].value.substr(6);
    activeFunctionInfo.style.color = 'red';
    activeFunctionInfo.style.fontWeight = 'bold';
    activeFunctionInfo.innerHTML = '<i class="fa-solid fa-repeat"></i>&nbsp Replacing Blue (hind) R'+indexNumber;
    if (indexNumber >= 9) {
      ctx.clearRect(
        pointsBlueRight[indexNumber-1].x - pointSize,
        pointsBlueRight[indexNumber-1].y - pointSize,
        pointSize * 4 + 20,
        pointSize * 4 + 10
      );
    } else{
    ctx.clearRect(
      pointsBlueRight[indexNumber-1].x - pointSize,
      pointsBlueRight[indexNumber-1].y - pointSize,
      pointSize * 4 + 12,
      pointSize * 4 + 10
    );
  }
    console.log(indexNumber-1);
    
    console.log(pointsBlueRight);
    canvas.removeEventListener("click", drawRedLeft, false);
    canvas.removeEventListener("click", drawRedRight, false);
    canvas.removeEventListener("click", drawBlueLeft, false);
    canvas.removeEventListener("click", drawBlueRight, false);
    canvas.addEventListener("click", function replacePoint(e){
      var newPoint = getPosition(e);
      console.log(newPoint);
      
      drawCoordinatesBlue(newPoint, pointSize);
      pointsBlueRight.splice(parseInt(indexNumber-1),1, newPoint);
      
      console.log(pointsBlueRight);
      // let index = pointsRedLeft.indexOf(newPoint);
      ctx.font = " " + (parseInt(pointSize) + 8) + "px Arial";
      ctx.fillText(
        "R" + (indexNumber),
        newPoint.x + pointSize * 1.2,
        newPoint.y + pointSize * 1.2 + 10
      );
      canvas.removeEventListener("click", replacePoint);
      canvas.style.cursor = "auto";
      removePointButton.disabled = false;
      replacePointButton.disabled = false;
      selectPoint.disabled = false;
      document.getElementById('removeImage').disabled = false;
      document.querySelector('.upload-btn').disabled = false;
      document.getElementById('redCircleLeft').disabled = false;
      document.getElementById('redCircleRight').disabled = false;
      document.getElementById('blueCircleLeft').disabled = false;
      document.getElementById('blueCircleRight').disabled = false;
      activeFunctionInfo.innerHTML = '';
          }, false);  
  } 
}


let removeMeasurement = document.getElementById("removeMeasurement");

let removableRows = [];

function removeByMeasurement() {
  if (
    removeMeasurement.options[removeMeasurement.selectedIndex].value ==
    "Overlap Left"
  ) {
    $("#tbody").find("td:contains('Overlap Left')").closest("tr").remove();
    $("#tbody")
      .find("td:contains('Overlap left average in cm:')")
      .closest("tr")
      .remove();
    for (var i = 0; i < tbody.rows.length; i++) {
      let updatedCell = tbody.rows[i].cells[0];
      if (
        updatedCell.innerHTML ===
        "------------------------------BREAK------------------------------"
      ) {
        updatedCell.innerHTML =
          "------------------------------BREAK------------------------------";
      } else if (updatedCell.innerHTML.indexOf(":") != -1) {
        // pass
      } else {
        updatedCell.innerHTML = i + 1;
      }
    }
  }
  if (
    removeMeasurement.options[removeMeasurement.selectedIndex].value ==
    "Overlap Right"
  ) {
    $("#tbody").find("td:contains('Overlap Right')").closest("tr").remove();
    $("#tbody")
      .find("td:contains('Overlap Right average in cm:')")
      .closest("tr")
      .remove();
    for (var i = 0; i < tbody.rows.length; i++) {
      let updatedCell = tbody.rows[i].cells[0];
      if (
        updatedCell.innerHTML ===
        "------------------------------BREAK------------------------------"
      ) {
        updatedCell.innerHTML =
          "------------------------------BREAK------------------------------";
      } else if (updatedCell.innerHTML.indexOf(":") != -1) {
        // pass
      } else {
        updatedCell.innerHTML = i + 1;
      }
    }
  }
  if (
    removeMeasurement.options[removeMeasurement.selectedIndex].value ==
    "Stride length left front"
  ) {
    $("#tbody")
      .find("td:contains('Stride length left front')")
      .closest("tr")
      .remove();
    $("#tbody")
      .find("td:contains('Stride length left front average in cm:')")
      .closest("tr")
      .remove();
    for (var i = 0; i < tbody.rows.length; i++) {
      let updatedCell = tbody.rows[i].cells[0];
      if (
        updatedCell.innerHTML ===
        "------------------------------BREAK------------------------------"
      ) {
        updatedCell.innerHTML =
          "------------------------------BREAK------------------------------";
      } else if (updatedCell.innerHTML.indexOf(":") != -1) {
        // pass
      } else {
        updatedCell.innerHTML = i + 1;
      }
    }
  }
  if (
    removeMeasurement.options[removeMeasurement.selectedIndex].value ==
    "Stride length left hind"
  ) {
    $("#tbody")
      .find("td:contains('Stride length left hind')")
      .closest("tr")
      .remove();
    $("#tbody")
      .find("td:contains('Stride length left hind average in cm:')")
      .closest("tr")
      .remove();
    for (var i = 0; i < tbody.rows.length; i++) {
      let updatedCell = tbody.rows[i].cells[0];
      if (
        updatedCell.innerHTML ===
        "------------------------------BREAK------------------------------"
      ) {
        updatedCell.innerHTML =
          "------------------------------BREAK------------------------------";
      } else if (updatedCell.innerHTML.indexOf(":") != -1) {
        // pass
      } else {
        updatedCell.innerHTML = i + 1;
      }
    }
  }
  if (
    removeMeasurement.options[removeMeasurement.selectedIndex].value ==
    "Stride length right front"
  ) {
    $("#tbody")
      .find("td:contains('Stride length right front')")
      .closest("tr")
      .remove();
    $("#tbody")
      .find("td:contains('Stride length right front average in cm:')")
      .closest("tr")
      .remove();
    for (var i = 0; i < tbody.rows.length; i++) {
      let updatedCell = tbody.rows[i].cells[0];
      if (
        updatedCell.innerHTML ===
        "------------------------------BREAK------------------------------"
      ) {
        updatedCell.innerHTML =
          "------------------------------BREAK------------------------------";
      } else if (updatedCell.innerHTML.indexOf(":") != -1) {
        // pass
      } else {
        updatedCell.innerHTML = i + 1;
      }
    }
  }
  if (
    removeMeasurement.options[removeMeasurement.selectedIndex].value ==
    "Stride length right hind"
  ) {
    $("#tbody")
      .find("td:contains('Stride length right hind')")
      .closest("tr")
      .remove();
    $("#tbody")
      .find("td:contains('Stride length right hind average in cm:')")
      .closest("tr")
      .remove();
    for (var i = 0; i < tbody.rows.length; i++) {
      let updatedCell = tbody.rows[i].cells[0];
      if (
        updatedCell.innerHTML ===
        "------------------------------BREAK------------------------------"
      ) {
        updatedCell.innerHTML =
          "------------------------------BREAK------------------------------";
      } else if (updatedCell.innerHTML.indexOf(":") != -1) {
        // pass
      } else {
        updatedCell.innerHTML = i + 1;
      }
    }
  }
  if (
    removeMeasurement.options[removeMeasurement.selectedIndex].value ==
    "Stride Width Front"
  ) {
    $("#tbody")
      .find("td:contains('Stride Width Front(L)')")
      .closest("tr")
      .remove();
    $("#tbody")
      .find("td:contains('Stride Width Front(R)')")
      .closest("tr")
      .remove();
    $("#tbody")
      .find("td:contains('Stride Width Front(L) average in cm:')")
      .closest("tr")
      .remove();
    $("#tbody")
      .find("td:contains('Stride Width Front(R) average in cm:')")
      .closest("tr")
      .remove();
    for (var i = 0; i < tbody.rows.length; i++) {
      let updatedCell = tbody.rows[i].cells[0];
      if (
        updatedCell.innerHTML ===
        "------------------------------BREAK------------------------------"
      ) {
        updatedCell.innerHTML =
          "------------------------------BREAK------------------------------";
      } else if (updatedCell.innerHTML.indexOf(":") != -1) {
        // pass
      } else {
        updatedCell.innerHTML = i + 1;
      }
    }
  }
  if (
    removeMeasurement.options[removeMeasurement.selectedIndex].value ==
    "Stride Width Hind"
  ) {
    $("#tbody")
      .find("td:contains('Stride Width Hind(L)')")
      .closest("tr")
      .remove();
    $("#tbody")
      .find("td:contains('Stride Width Hind(R)')")
      .closest("tr")
      .remove();
    $("#tbody")
      .find("td:contains('Stride Width Hind(L) average in cm:')")
      .closest("tr")
      .remove();
    $("#tbody")
      .find("td:contains('Stride Width Hind(R) average in cm:')")
      .closest("tr")
      .remove();
    for (var i = 0; i < tbody.rows.length; i++) {
      let updatedCell = tbody.rows[i].cells[0];
      if (
        updatedCell.innerHTML ===
        "------------------------------BREAK------------------------------"
      ) {
        updatedCell.innerHTML =
          "------------------------------BREAK------------------------------";
      } else if (updatedCell.innerHTML.indexOf(":") != -1) {
        // pass
      } else {
        updatedCell.innerHTML = i + 1;
      }
    }
  }
  if (tbody.rows.length >= 1){
    removeByEntriesOption.style.display = '', removeByMeasurementsOption.style.display = ''
  } else{
    removeByEntriesOption.style.display = 'none', removeByMeasurementsOption.style.display = 'none'
  }
}

// WORK IN PROGRESS -- ADD ALL ENTRIES WITH ONE CLICK WITH AVERAGE FOR EACH MEASUREMENT AND SENSIBLE TO RESIZING  (THIS IS NOT WORKING CORRECTLY!)

// function addEntriesAllAverage() {
//   var distValuesSLLF = [];
//   var distValuesSLRF = [];
//   var distValuesSLLH = [];
//   var distValuesSLRH = [];
//   var distValuesOL = [];
//   var distValuesOR = [];
//   var distValuesSWFL = [];
//   var distValuesSWHL = [];
//   var distValuesSWFR = [];
//   var distValuesSWHR = [];
//   if (dist == 0) {
//     alert("Measure how many pixels are in a cm before using these option!");
//     return;
//   } else if (
//     pointsRedLeft.length < 2 ||
//     pointsRedRight.length < 2 ||
//     pointsBlueLeft.length < 2 ||
//     pointsBlueRight.length < 2
//   ) {
//     alert("Have enough points to perform at least one of each measurement.");
//     return;
//   } else {
//     for (var i = 0; i < pointsRedLeft.length - 1; i++) {
//       var newRow = tbody.insertRow(-1);
//       let indexRow = newRow.rowIndex;
//       var cellOne = newRow.insertCell();
//       var cellTwo = newRow.insertCell();
//       var cellThree = newRow.insertCell();
//       var cellFour = newRow.insertCell();
//       var cellFive = newRow.insertCell();
//       if (imgSizeStatus != 100) {
//         var cellSix = newRow.insertCell();
//       } else {
//       }
//       // let distance = 0;
//       cellOne.innerHTML = indexRow - 1;
//       cellTwo.innerHTML = "Red L" + (i + 1) + " &#x2192 Red L" + (i + 2);
//       cellThree.innerHTML = "Stride length left front";
//       distance = Math.hypot(
//         pointsRedLeft[i].x - pointsRedLeft[i + 1].x,
//         pointsRedLeft[i].y - pointsRedLeft[i + 1].y
//       ).toFixed(3);
//       cellFour.innerHTML = distance;
//       cellFive.innerHTML = (distance / dist).toFixed(3);
//       distValuesSLLF.push(distance / dist);
//       switch (imgSizeStatus) {
//         case 50:
//           cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//           break;
//         case 75:
//           cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//           break;
//         case 25:
//           cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//           break;
//         case 40:
//           cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//       }
//     }
//     console.log(distValuesSLLF);
//     var strideLeftFrontMeanRow = tbody.insertRow(-1);
//     var strideLeftFrontRowCellOne = strideLeftFrontMeanRow.insertCell();
//     var strideLeftFrontRowCellTwo = strideLeftFrontMeanRow.insertCell();
//     strideLeftFrontRowCellOne.colSpan = "4";
//     strideLeftFrontRowCellOne.innerHTML =
//       "<b>Stride length left front average in cm:</b> ";
//     strideLeftFrontRowCellTwo.innerHTML = (
//       distValuesSLLF.reduce((a, b) => a + b, 0) / distValuesSLLF.length
//     ).toFixed(3);
//     if (imgSizeStatus != 100) {
//       var strideLeftFrontRowCellThreeOriginal =
//         strideLeftFrontMeanRow.insertCell();
//       switch (imgSizeStatus) {
//         case 50:
//           strideLeftFrontRowCellThreeOriginal.innerHTML = (
//             (distValuesSLLF.reduce((a, b) => a + b, 0) /
//               distValuesSLLF.length) *
//             2
//           ).toFixed(3);
//           break;
//         case 75:
//           strideLeftFrontRowCellThreeOriginal.innerHTML = (
//             ((distValuesSLLF.reduce((a, b) => a + b, 0) /
//               distValuesSLLF.length) *
//               100) /
//             75
//           ).toFixed(3);
//           break;
//         case 25:
//           strideLeftFrontRowCellThreeOriginal.innerHTML = (
//             (distValuesSLLF.reduce((a, b) => a + b, 0) /
//               distValuesSLLF.length) *
//             4
//           ).toFixed(3);
//           break;
//         case 40:
//           strideLeftFrontRowCellThreeOriginal.innerHTML = (
//             ((distValuesSLLF.reduce((a, b) => a + b, 0) /
//               distValuesSLLF.length) *
//               100) /
//             40
//           ).toFixed(3);
//           break;
//       }
//     }
//     for (var i = 0; i < pointsRedRight.length - 1; i++) {
//       var newRow = tbody.insertRow(-1);
//       let indexRow = newRow.rowIndex;
//       var cellOne = newRow.insertCell();
//       var cellTwo = newRow.insertCell();
//       var cellThree = newRow.insertCell();
//       var cellFour = newRow.insertCell();
//       var cellFive = newRow.insertCell();
//       if (imgSizeStatus != 100) {
//         var cellSix = newRow.insertCell();
//       } else {
//       }
//       cellOne.innerHTML = indexRow - 1;
//       cellTwo.innerHTML = "Red R" + (i + 1) + " &#x2192 Red R" + (i + 2);
//       cellThree.innerHTML = "Stride length right front";
//       distance = Math.hypot(
//         pointsRedRight[i].x - pointsRedRight[i + 1].x,
//         pointsRedRight[i].y - pointsRedRight[i + 1].y
//       ).toFixed(3);
//       cellFour.innerHTML = distance;
//       cellFive.innerHTML = (distance / dist).toFixed(3);
//       distValuesSLRF.push(distance / dist);
//       switch (imgSizeStatus) {
//         case 50:
//           cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//           break;
//         case 75:
//           cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//           break;
//         case 25:
//           cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//           break;
//         case 40:
//           cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//       }
//     }
//     console.log(distValuesSLRF);
//     var strideRightFrontMeanRow = tbody.insertRow(-1);
//     var strideRightFrontRowCellOne = strideRightFrontMeanRow.insertCell();
//     var strideRightFrontRowCellTwo = strideRightFrontMeanRow.insertCell();
//     strideRightFrontRowCellOne.colSpan = "4";
//     strideRightFrontRowCellOne.innerHTML =
//       "<b>Stride length right front average in cm:</b> ";
//     strideRightFrontRowCellTwo.innerHTML = (
//       distValuesSLRF.reduce((a, b) => a + b, 0) / distValuesSLRF.length
//     ).toFixed(3);
//     if (imgSizeStatus != 100) {
//       var strideRightFrontRowCellThreeOriginal =
//         strideRightFrontMeanRow.insertCell();
//       switch (imgSizeStatus) {
//         case 50:
//           strideRightFrontRowCellThreeOriginal.innerHTML = (
//             (distValuesSLRF.reduce((a, b) => a + b, 0) /
//               distValuesSLRF.length) *
//             2
//           ).toFixed(3);
//           break;
//         case 75:
//           strideRightFrontRowCellThreeOriginal.innerHTML = (
//             ((distValuesSLRF.reduce((a, b) => a + b, 0) /
//               distValuesSLRF.length) *
//               100) /
//             75
//           ).toFixed(3);
//           break;
//         case 25:
//           strideRightFrontRowCellThreeOriginal.innerHTML = (
//             (distValuesSLRF.reduce((a, b) => a + b, 0) /
//               distValuesSLRF.length) *
//             4
//           ).toFixed(3);
//           break;
//         case 40:
//           strideRightFrontRowCellThreeOriginal.innerHTML = (
//             ((distValuesSLRF.reduce((a, b) => a + b, 0) /
//               distValuesSLRF.length) *
//               100) /
//             40
//           ).toFixed(3);
//           break;
//       }
//     }
//     for (var i = 0; i < pointsBlueLeft.length - 1; i++) {
//       var newRow = tbody.insertRow(-1);
//       let indexRow = newRow.rowIndex;
//       var cellOne = newRow.insertCell();
//       var cellTwo = newRow.insertCell();
//       var cellThree = newRow.insertCell();
//       var cellFour = newRow.insertCell();
//       var cellFive = newRow.insertCell();
//       if (imgSizeStatus != 100) {
//         var cellSix = newRow.insertCell();
//       } else {
//       }
//       cellOne.innerHTML = indexRow - 1;
//       cellTwo.innerHTML = "Blue L" + (i + 1) + " &#x2192 Blue L" + (i + 2);
//       cellThree.innerHTML = "Stride length left hind";
//       distance = Math.hypot(
//         pointsBlueLeft[i].x - pointsBlueLeft[i + 1].x,
//         pointsBlueLeft[i].y - pointsBlueLeft[i + 1].y
//       ).toFixed(3);
//       cellFour.innerHTML = distance;
//       cellFive.innerHTML = (distance / dist).toFixed(3);
//       distValuesSLLH.push(distance / dist);
//       switch (imgSizeStatus) {
//         case 50:
//           cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//           break;
//         case 75:
//           cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//           break;
//         case 25:
//           cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//           break;
//         case 40:
//           cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//       }
//     }
//     console.log(distValuesSLLH);
//     var strideLeftHindMeanRow = tbody.insertRow(-1);
//     var strideLeftHindRowCellOne = strideLeftHindMeanRow.insertCell();
//     var strideLeftHindRowCellTwo = strideLeftHindMeanRow.insertCell();
//     strideLeftHindRowCellOne.colSpan = "4";
//     strideLeftHindRowCellOne.innerHTML =
//       "<b>Stride length left hind average in cm:</b> ";
//     strideLeftHindRowCellTwo.innerHTML = (
//       distValuesSLLH.reduce((a, b) => a + b, 0) / distValuesSLLH.length
//     ).toFixed(3);
//     if (imgSizeStatus != 100) {
//       var strideLeftHindRowCellThreeOriginal =
//         strideLeftHindMeanRow.insertCell();
//       switch (imgSizeStatus) {
//         case 50:
//           strideLeftHindRowCellThreeOriginal.innerHTML = (
//             (distValuesSLLH.reduce((a, b) => a + b, 0) /
//               distValuesSLLH.length) *
//             2
//           ).toFixed(3);
//           break;
//         case 75:
//           strideLeftHindRowCellThreeOriginal.innerHTML = (
//             ((distValuesSLLH.reduce((a, b) => a + b, 0) /
//               distValuesSLLH.length) *
//               100) /
//             75
//           ).toFixed(3);
//           break;
//         case 25:
//           strideLeftHindRowCellThreeOriginal.innerHTML = (
//             (distValuesSLLH.reduce((a, b) => a + b, 0) /
//               distValuesSLLH.length) *
//             4
//           ).toFixed(3);
//           break;
//         case 40:
//           strideLeftHindRowCellThreeOriginal.innerHTML = (
//             ((distValuesSLLH.reduce((a, b) => a + b, 0) /
//               distValuesSLLH.length) *
//               100) /
//             40
//           ).toFixed(3);
//           break;
//       }
//     }
//     for (var i = 0; i < pointsBlueRight.length - 1; i++) {
//       var newRow = tbody.insertRow(-1);
//       let indexRow = newRow.rowIndex;
//       var cellOne = newRow.insertCell();
//       var cellTwo = newRow.insertCell();
//       var cellThree = newRow.insertCell();
//       var cellFour = newRow.insertCell();
//       var cellFive = newRow.insertCell();
//       if (imgSizeStatus != 100) {
//         var cellSix = newRow.insertCell();
//       } else {
//       }
//       cellOne.innerHTML = indexRow - 1;
//       cellTwo.innerHTML = "Blue R" + (i + 1) + " &#x2192 Blue R" + (i + 2);
//       cellThree.innerHTML = "Stride length right hind";
//       distance = Math.hypot(
//         pointsBlueRight[i].x - pointsBlueRight[i + 1].x,
//         pointsBlueRight[i].y - pointsBlueRight[i + 1].y
//       ).toFixed(3);
//       cellFour.innerHTML = distance;
//       cellFive.innerHTML = (distance / dist).toFixed(3);
//       distValuesSLRH.push(distance / dist);
//       switch (imgSizeStatus) {
//         case 50:
//           cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//           break;
//         case 75:
//           cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//           break;
//         case 25:
//           cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//           break;
//         case 40:
//           cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//       }
//     }
//     console.log(distValuesSLRH);
//     var strideRightHindMeanRow = tbody.insertRow(-1);
//     var strideRightHindRowCellOne = strideRightHindMeanRow.insertCell();
//     var strideRightHindRowCellTwo = strideRightHindMeanRow.insertCell();
//     strideRightHindRowCellOne.colSpan = "4";
//     strideRightHindRowCellOne.innerHTML =
//       "<b>Stride length right hind average in cm:</b> ";
//     strideRightHindRowCellTwo.innerHTML = (
//       distValuesSLRH.reduce((a, b) => a + b, 0) / distValuesSLRH.length
//     ).toFixed(3);
//     if (imgSizeStatus != 100) {
//       var strideRightHindRowCellThreeOriginal =
//         strideRightHindMeanRow.insertCell();
//       switch (imgSizeStatus) {
//         case 50:
//           strideRightHindRowCellThreeOriginal.innerHTML = (
//             (distValuesSLRH.reduce((a, b) => a + b, 0) /
//               distValuesSLRH.length) *
//             2
//           ).toFixed(3);
//           break;
//         case 75:
//           strideRightHindRowCellThreeOriginal.innerHTML = (
//             ((distValuesSLRH.reduce((a, b) => a + b, 0) /
//               distValuesSLRH.length) *
//               100) /
//             75
//           ).toFixed(3);
//           break;
//         case 25:
//           strideRightHindRowCellThreeOriginal.innerHTML = (
//             (distValuesSLRH.reduce((a, b) => a + b, 0) /
//               distValuesSLRH.length) *
//             4
//           ).toFixed(3);
//           break;
//         case 40:
//           strideRightHindRowCellThreeOriginal.innerHTML = (
//             ((distValuesSLRH.reduce((a, b) => a + b, 0) /
//               distValuesSLRH.length) *
//               100) /
//             40
//           ).toFixed(3);
//           break;
//       }
//     }
//     for (var i = 0; i < pointsRedLeft.length; i++) {
//       for (var j = 0; j < pointsBlueLeft.length; j++) {
//         if (i == j) {
//           var newRow = tbody.insertRow(-1);
//           let indexRow = newRow.rowIndex;
//           var cellOne = newRow.insertCell();
//           var cellTwo = newRow.insertCell();
//           var cellThree = newRow.insertCell();
//           var cellFour = newRow.insertCell();
//           var cellFive = newRow.insertCell();
//           if (imgSizeStatus != 100) {
//             var cellSix = newRow.insertCell();
//           } else {
//           }
//           cellOne.innerHTML = indexRow - 1;
//           cellTwo.innerHTML = "Red L" + (i + 1) + " &#x2192 Blue L" + (j + 1);
//           cellThree.innerHTML = "Overlap Left";
//           distance = Math.hypot(
//             pointsRedLeft[i].x - pointsBlueLeft[j].x,
//             pointsRedLeft[i].y - pointsBlueLeft[j].y
//           ).toFixed(3);
//           cellFour.innerHTML = distance;
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           distValuesOL.push(distance / dist);
//           switch (imgSizeStatus) {
//             case 50:
//               cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//               break;
//             case 75:
//               cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//               break;
//             case 25:
//               cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//               break;
//             case 40:
//               cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//           }
//         }
//       }
//     }
//     console.log(distValuesOL);
//     var overlapLeftMeanRow = tbody.insertRow(-1);
//     var overlapLeftRowCellOne = overlapLeftMeanRow.insertCell();
//     var overlapLeftRowCellTwo = overlapLeftMeanRow.insertCell();
//     overlapLeftRowCellOne.colSpan = "4";
//     overlapLeftRowCellOne.innerHTML = "<b>Overlap left average in cm:</b> ";
//     overlapLeftRowCellTwo.innerHTML = (
//       distValuesOL.reduce((a, b) => a + b, 0) / distValuesOL.length
//     ).toFixed(3);
//     if (imgSizeStatus != 100) {
//       var overlapLeftRowCellThreeOriginal = overlapLeftMeanRow.insertCell();
//       switch (imgSizeStatus) {
//         case 50:
//           overlapLeftRowCellThreeOriginal.innerHTML = (
//             (distValuesOL.reduce((a, b) => a + b, 0) / distValuesOL.length) *
//             2
//           ).toFixed(3);
//           break;
//         case 75:
//           overlapLeftRowCellThreeOriginal.innerHTML = (
//             ((distValuesOL.reduce((a, b) => a + b, 0) / distValuesOL.length) *
//               100) /
//             75
//           ).toFixed(3);
//           break;
//         case 25:
//           overlapLeftRowCellThreeOriginal.innerHTML = (
//             (distValuesOL.reduce((a, b) => a + b, 0) / distValuesOL.length) *
//             4
//           ).toFixed(3);
//           break;
//         case 40:
//           overlapLeftRowCellThreeOriginal.innerHTML = (
//             ((distValuesOL.reduce((a, b) => a + b, 0) / distValuesOL.length) *
//               100) /
//             40
//           ).toFixed(3);
//           break;
//       }
//     }
//     for (var i = 0; i < pointsRedRight.length; i++) {
//       for (var j = 0; j < pointsBlueRight.length; j++) {
//         if (i == j) {
//           var newRow = tbody.insertRow(-1);
//           let indexRow = newRow.rowIndex;
//           var cellOne = newRow.insertCell();
//           var cellTwo = newRow.insertCell();
//           var cellThree = newRow.insertCell();
//           var cellFour = newRow.insertCell();
//           var cellFive = newRow.insertCell();
//           if (imgSizeStatus != 100) {
//             var cellSix = newRow.insertCell();
//           } else {
//           }
//           cellOne.innerHTML = indexRow - 1;
//           cellTwo.innerHTML = "Red R" + (i + 1) + " &#x2192 Blue R" + (j + 1);
//           cellThree.innerHTML = "Overlap Right";
//           distance = Math.hypot(
//             pointsRedRight[i].x - pointsBlueRight[j].x,
//             pointsRedRight[i].y - pointsBlueRight[j].y
//           ).toFixed(3);
//           cellFour.innerHTML = distance;
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           distValuesOR.push(distance / dist);
//           switch (imgSizeStatus) {
//             case 50:
//               cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//               break;
//             case 75:
//               cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//               break;
//             case 25:
//               cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//               break;
//             case 40:
//               cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//           }
//         }
//       }
//     }
//     console.log(distValuesOR);
//     var overlapRightMeanRow = tbody.insertRow(-1);
//     var overlapRightRowCellOne = overlapRightMeanRow.insertCell();
//     var overlapRightRowCellTwo = overlapRightMeanRow.insertCell();
//     overlapRightRowCellOne.colSpan = "4";
//     overlapRightRowCellOne.innerHTML = "<b>Overlap Right average in cm:</b> ";
//     overlapRightRowCellTwo.innerHTML = (
//       distValuesOR.reduce((a, b) => a + b, 0) / distValuesOR.length
//     ).toFixed(3);
//     if (imgSizeStatus != 100) {
//       var overlapRightRowCellThreeOriginal = overlapRightMeanRow.insertCell();
//       switch (imgSizeStatus) {
//         case 50:
//           overlapRightRowCellThreeOriginal.innerHTML = (
//             (distValuesOR.reduce((a, b) => a + b, 0) / distValuesOR.length) *
//             2
//           ).toFixed(3);
//           break;
//         case 75:
//           overlapRightRowCellThreeOriginal.innerHTML = (
//             ((distValuesOR.reduce((a, b) => a + b, 0) / distValuesOR.length) *
//               100) /
//             75
//           ).toFixed(3);
//           break;
//         case 25:
//           overlapRightRowCellThreeOriginal.innerHTML = (
//             (distValuesOR.reduce((a, b) => a + b, 0) / distValuesOR.length) *
//             4
//           ).toFixed(3);
//           break;
//         case 40:
//           overlapRightRowCellThreeOriginal.innerHTML = (
//             ((distValuesOR.reduce((a, b) => a + b, 0) / distValuesOR.length) *
//               100) /
//             40
//           ).toFixed(3);
//           break;
//       }
//     }
//     if (footstepStart.options[footstepStart.selectedIndex].value == "Left") {
//       var indexImaginaryFrontLeft = 0;
//       var indexImaginaryHindLeft = 0;
//       for (var i = 0; i < pointsRedLeft.length; i++) {
//         for (var j = 0; j < pointsRedRight.length; j++) {
//           if (i == j) {
//             var newRow = tbody.insertRow(-1);
//             let indexRow = newRow.rowIndex;
//             var cellOne = newRow.insertCell();
//             var cellTwo = newRow.insertCell();
//             var cellThree = newRow.insertCell();
//             var cellFour = newRow.insertCell();
//             var cellFive = newRow.insertCell();
//             if (imgSizeStatus != 100) {
//               var cellSix = newRow.insertCell();
//             } else {
//             }
//             indexImaginaryFrontLeft += 1;
//             cellOne.innerHTML = indexRow - 1;
//             cellTwo.innerHTML =
//               "Imaginary Front " +
//               indexImaginaryFrontLeft +
//               " &#x2192 Red R" +
//               (j + 1);
//             cellThree.innerHTML = "Stride Width Front(L)";
//             if (i < pointsRedLeft.length - 1) {
//               distance = Math.hypot(
//                 pointsRedRight[j].x - pointsRedRight[j].x,
//                 (pointsRedLeft[i].y + pointsRedLeft[i + 1].y) / 2 -
//                   pointsRedRight[j].y
//               ).toFixed(3);
//             } else {
//               distance = Math.hypot(
//                 pointsRedRight[j].x - pointsRedRight[j].x,
//                 pointsRedLeft[i].y - pointsRedRight[j].y
//               ).toFixed(3);
//             }
//             cellFour.innerHTML = distance;
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             distValuesSWFL.push(distance / dist);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//             }
//           }
//           if (i == j + 1) {
//             var newRow = tbody.insertRow(-1);
//             let indexRow = newRow.rowIndex;
//             var cellOne = newRow.insertCell();
//             var cellTwo = newRow.insertCell();
//             var cellThree = newRow.insertCell();
//             var cellFour = newRow.insertCell();
//             var cellFive = newRow.insertCell();
//             if (imgSizeStatus != 100) {
//               var cellSix = newRow.insertCell();
//             } else {
//             }
//             indexImaginaryFrontLeft += 1;
//             cellOne.innerHTML = indexRow - 1;
//             cellTwo.innerHTML =
//               "Imaginary Front " +
//               indexImaginaryFrontLeft +
//               " &#x2192 Red L" +
//               (i + 1);
//             cellThree.innerHTML = "Stride Width Front(L)";
//             if (j < pointsRedRight.length - 1) {
//               distance = Math.hypot(
//                 pointsRedLeft[i].x - pointsRedLeft[i].x,
//                 pointsRedLeft[i].y -
//                   (pointsRedRight[j].y + pointsRedRight[j + 1].y) / 2
//               ).toFixed(3);
//             } else {
//               distance = Math.hypot(
//                 pointsRedLeft[i].x - pointsRedLeft[i].x,
//                 pointsRedLeft[i].y - pointsRedRight[j].y
//               ).toFixed(3);
//             }
//             cellFour.innerHTML = distance;
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             distValuesSWFL.push(distance / dist);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//             }
//           }
//         }
//       }
//       console.log(distValuesSWFL);
//       var strideWidthFrontLeftMeanRow = tbody.insertRow(-1);
//       var strideWidthFrontLeftRowCellOne =
//         strideWidthFrontLeftMeanRow.insertCell();
//       var strideWidthFrontLeftRowCellTwo =
//         strideWidthFrontLeftMeanRow.insertCell();
//       strideWidthFrontLeftRowCellOne.colSpan = "4";
//       strideWidthFrontLeftRowCellOne.innerHTML =
//         "<b>Stride Width Front(L) average in cm:</b> ";
//       strideWidthFrontLeftRowCellTwo.innerHTML = (
//         distValuesSWFL.reduce((a, b) => a + b, 0) / distValuesSWFL.length
//       ).toFixed(3);
//       if (imgSizeStatus != 100) {
//         var strideWidthFrontLeftRowCellThreeOriginal =
//           strideWidthFrontLeftMeanRow.insertCell();
//         switch (imgSizeStatus) {
//           case 50:
//             strideWidthFrontLeftRowCellThreeOriginal.innerHTML = (
//               (distValuesSWFL.reduce((a, b) => a + b, 0) /
//                 distValuesSWFL.length) *
//               2
//             ).toFixed(3);
//             break;
//           case 75:
//             strideWidthFrontLeftRowCellThreeOriginal.innerHTML = (
//               ((distValuesSWFL.reduce((a, b) => a + b, 0) /
//                 distValuesSWFL.length) *
//                 100) /
//               75
//             ).toFixed(3);
//             break;
//           case 25:
//             strideWidthFrontLeftRowCellThreeOriginal.innerHTML = (
//               (distValuesSWFL.reduce((a, b) => a + b, 0) /
//                 distValuesSWFL.length) *
//               4
//             ).toFixed(3);
//             break;
//           case 40:
//             strideWidthFrontLeftRowCellThreeOriginal.innerHTML = (
//               ((distValuesSWFL.reduce((a, b) => a + b, 0) /
//                 distValuesSWFL.length) *
//                 100) /
//               40
//             ).toFixed(3);
//             break;
//         }
//       }
//       for (var i = 0; i < pointsBlueLeft.length; i++) {
//         for (var j = 0; j < pointsBlueRight.length; j++) {
//           if (i == j) {
//             var newRow = tbody.insertRow(-1);
//             let indexRow = newRow.rowIndex;
//             var cellOne = newRow.insertCell();
//             var cellTwo = newRow.insertCell();
//             var cellThree = newRow.insertCell();
//             var cellFour = newRow.insertCell();
//             var cellFive = newRow.insertCell();
//             if (imgSizeStatus != 100) {
//               var cellSix = newRow.insertCell();
//             } else {
//             }
//             indexImaginaryHindLeft += 1;
//             cellOne.innerHTML = indexRow - 1;
//             cellTwo.innerHTML =
//               "Imaginary Hind " +
//               indexImaginaryHindLeft +
//               " &#x2192 Blue R" +
//               (j + 1);
//             cellThree.innerHTML = "Stride Width Hind(L)";
//             if (i < pointsBlueLeft.length - 1) {
//               distance = Math.hypot(
//                 pointsBlueRight[j].x - pointsBlueRight[j].x,
//                 (pointsBlueLeft[i].y + pointsBlueLeft[i + 1].y) / 2 -
//                   pointsBlueRight[j].y
//               ).toFixed(3);
//             } else {
//               distance = Math.hypot(
//                 pointsBlueRight[j].x - pointsBlueRight[j].x,
//                 pointsBlueLeft[i].y - pointsBlueRight[j].y
//               ).toFixed(3);
//             }
//             cellFour.innerHTML = distance;
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             distValuesSWHL.push(distance / dist);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//             }
//           }
//           if (i == j + 1) {
//             var newRow = tbody.insertRow(-1);
//             let indexRow = newRow.rowIndex;
//             var cellOne = newRow.insertCell();
//             var cellTwo = newRow.insertCell();
//             var cellThree = newRow.insertCell();
//             var cellFour = newRow.insertCell();
//             var cellFive = newRow.insertCell();
//             if (imgSizeStatus != 100) {
//               var cellSix = newRow.insertCell();
//             } else {
//             }
//             indexImaginaryHindLeft += 1;
//             cellOne.innerHTML = indexRow - 1;
//             cellTwo.innerHTML =
//               "Imaginary Hind " +
//               indexImaginaryHindLeft +
//               " &#x2192 Blue L" +
//               (i + 1);
//             cellThree.innerHTML = "Stride Width Hind(L)";
//             if (j < pointsBlueRight.length - 1) {
//               distance = Math.hypot(
//                 pointsBlueLeft[i].x - pointsBlueLeft[i].x,
//                 pointsBlueLeft[i].y -
//                   (pointsBlueRight[j].y + pointsBlueRight[j + 1].y) / 2
//               ).toFixed(3);
//             } else {
//               distance = Math.hypot(
//                 pointsBlueLeft[i].x - pointsBlueLeft[i].x,
//                 pointsBlueLeft[i].y - pointsBlueRight[j].y
//               ).toFixed(3);
//             }
//             cellFour.innerHTML = distance;
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             distValuesSWHL.push(distance / dist);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//             }
//           }
//         }
//       }
//       console.log(distValuesSWHL);
//       var strideWidthHindLeftMeanRow = tbody.insertRow(-1);
//       var strideWidthHindLeftRowCellOne =
//         strideWidthHindLeftMeanRow.insertCell();
//       var strideWidthHindLeftRowCellTwo =
//         strideWidthHindLeftMeanRow.insertCell();
//       strideWidthHindLeftRowCellOne.colSpan = "4";
//       strideWidthHindLeftRowCellOne.innerHTML =
//         "<b>Stride Width Hind(L) average in cm:</b> ";
//       strideWidthHindLeftRowCellTwo.innerHTML = (
//         distValuesSWHL.reduce((a, b) => a + b, 0) / distValuesSWHL.length
//       ).toFixed(3);
//       if (imgSizeStatus != 100) {
//         var strideWidthHindLeftRowCellThreeOriginal =
//           strideWidthHindLeftMeanRow.insertCell();
//         switch (imgSizeStatus) {
//           case 50:
//             strideWidthHindLeftRowCellThreeOriginal.innerHTML = (
//               (distValuesSWHL.reduce((a, b) => a + b, 0) /
//                 distValuesSWHL.length) *
//               2
//             ).toFixed(3);
//             break;
//           case 75:
//             strideWidthHindLeftRowCellThreeOriginal.innerHTML = (
//               ((distValuesSWHL.reduce((a, b) => a + b, 0) /
//                 distValuesSWHL.length) *
//                 100) /
//               75
//             ).toFixed(3);
//             break;
//           case 25:
//             strideWidthHindLeftRowCellThreeOriginal.innerHTML = (
//               (distValuesSWHL.reduce((a, b) => a + b, 0) /
//                 distValuesSWHL.length) *
//               4
//             ).toFixed(3);
//             break;
//           case 40:
//             strideWidthHindLeftRowCellThreeOriginal.innerHTML = (
//               ((distValuesSWHL.reduce((a, b) => a + b, 0) /
//                 distValuesSWHL.length) *
//                 100) /
//               40
//             ).toFixed(3);
//             break;
//         }
//       }
//     }
//     if (footstepStart.options[footstepStart.selectedIndex].value == "Right") {
//       var indexImaginaryFrontRight = 0;
//       var indexImaginaryHindRight = 0;
//       for (var i = 0; i < pointsRedLeft.length; i++) {
//         for (var j = 0; j < pointsRedRight.length; j++) {
//           if (i == j) {
//             var newRow = tbody.insertRow(-1);
//             let indexRow = newRow.rowIndex;
//             var cellOne = newRow.insertCell();
//             var cellTwo = newRow.insertCell();
//             var cellThree = newRow.insertCell();
//             var cellFour = newRow.insertCell();
//             var cellFive = newRow.insertCell();
//             if (imgSizeStatus != 100) {
//               var cellSix = newRow.insertCell();
//             } else {
//             }
//             indexImaginaryFrontRight += 1;
//             cellOne.innerHTML = indexRow - 1;
//             cellTwo.innerHTML =
//               "Imaginary Front " +
//               indexImaginaryFrontRight +
//               " &#x2192 Red L" +
//               (i + 1);
//             cellThree.innerHTML = "Stride Width Front(R)";
//             if (j < pointsRedRight.length - 1) {
//               distance = Math.hypot(
//                 pointsRedLeft[i].x - pointsRedLeft[i].x,
//                 (pointsRedRight[j].y + pointsRedRight[j + 1].y) / 2 -
//                   pointsRedLeft[i].y
//               ).toFixed(3);
//             } else {
//               distance = Math.hypot(
//                 pointsRedLeft[i].x - pointsRedLeft[i].x,
//                 pointsRedRight[j].y - pointsRedLeft[i].y
//               ).toFixed(3);
//             }
//             cellFour.innerHTML = distance;
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             distValuesSWFR.push(distance / dist);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//             }
//           }
//           if (j == i + 1) {
//             var newRow = tbody.insertRow(-1);
//             let indexRow = newRow.rowIndex;
//             var cellOne = newRow.insertCell();
//             var cellTwo = newRow.insertCell();
//             var cellThree = newRow.insertCell();
//             var cellFour = newRow.insertCell();
//             var cellFive = newRow.insertCell();
//             if (imgSizeStatus != 100) {
//               var cellSix = newRow.insertCell();
//             } else {
//             }
//             indexImaginaryFrontRight += 1;
//             cellOne.innerHTML = indexRow - 1;
//             cellTwo.innerHTML =
//               "Imaginary Front " +
//               indexImaginaryFrontRight +
//               " &#x2192 Red R" +
//               (j + 1);
//             cellThree.innerHTML = "Stride Width Front(R)";
//             if (i < pointsRedLeft.length - 1) {
//               distance = Math.hypot(
//                 pointsRedRight[j].x - pointsRedRight[j].x,
//                 (pointsRedLeft[i].y + pointsRedLeft[i + 1].y) / 2 -
//                   pointsRedRight[j].y
//               ).toFixed(3);
//             } else {
//               distance = Math.hypot(
//                 pointsRedRight[j].x - pointsRedRight[j].x,
//                 pointsRedLeft[i].y - pointsRedRight[j].y
//               ).toFixed(3);
//             }
//             cellFour.innerHTML = distance;
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             distValuesSWFR.push(distance / dist);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//             }
//           }
//         }
//       }
//       console.log(distValuesSWFR);
//       var strideWidthFrontRightMeanRow = tbody.insertRow(-1);
//       var strideWidthFrontRightRowCellOne =
//         strideWidthFrontRightMeanRow.insertCell();
//       var strideWidthFrontRightRowCellTwo =
//         strideWidthFrontRightMeanRow.insertCell();
//       strideWidthFrontRightRowCellOne.colSpan = "4";
//       strideWidthFrontRightRowCellOne.innerHTML =
//         "<b>Stride Width Front(R) average in cm:</b> ";
//       strideWidthFrontRightRowCellTwo.innerHTML = (
//         distValuesSWFR.reduce((a, b) => a + b, 0) / distValuesSWFR.length
//       ).toFixed(3);
//       if (imgSizeStatus != 100) {
//         var strideWidthFrontRightRowCellThreeOriginal =
//           strideWidthFrontRightMeanRow.insertCell();
//         switch (imgSizeStatus) {
//           case 50:
//             strideWidthFrontRightRowCellThreeOriginal.innerHTML = (
//               (distValuesSWFR.reduce((a, b) => a + b, 0) /
//                 distValuesSWFR.length) *
//               2
//             ).toFixed(3);
//             break;
//           case 75:
//             strideWidthFrontRightRowCellThreeOriginal.innerHTML = (
//               ((distValuesSWFR.reduce((a, b) => a + b, 0) /
//                 distValuesSWFR.length) *
//                 100) /
//               75
//             ).toFixed(3);
//             break;
//           case 25:
//             strideWidthFrontRightRowCellThreeOriginal.innerHTML = (
//               (distValuesSWFR.reduce((a, b) => a + b, 0) /
//                 distValuesSWFR.length) *
//               4
//             ).toFixed(3);
//             break;
//           case 40:
//             strideWidthFrontRightRowCellThreeOriginal.innerHTML = (
//               ((distValuesSWFR.reduce((a, b) => a + b, 0) /
//                 distValuesSWFR.length) *
//                 100) /
//               40
//             ).toFixed(3);
//             break;
//         }
//       }
//       for (var i = 0; i < pointsBlueLeft.length; i++) {
//         for (var j = 0; j < pointsBlueRight.length; j++) {
//           if (i == j) {
//             var newRow = tbody.insertRow(-1);
//             let indexRow = newRow.rowIndex;
//             var cellOne = newRow.insertCell();
//             var cellTwo = newRow.insertCell();
//             var cellThree = newRow.insertCell();
//             var cellFour = newRow.insertCell();
//             var cellFive = newRow.insertCell();
//             if (imgSizeStatus != 100) {
//               var cellSix = newRow.insertCell();
//             } else {
//             }
//             indexImaginaryHindRight += 1;
//             cellOne.innerHTML = indexRow - 1;
//             cellTwo.innerHTML =
//               "Imaginary Hind " +
//               indexImaginaryHindRight +
//               " &#x2192 Blue L" +
//               (i + 1);
//             cellThree.innerHTML = "Stride Width Hind(R)";
//             if (j < pointsBlueRight.length - 1) {
//               distance = Math.hypot(
//                 pointsBlueLeft[i].x - pointsBlueLeft[i].x,
//                 (pointsBlueRight[j].y + pointsBlueRight[j + 1].y) / 2 -
//                   pointsBlueLeft[i].y
//               ).toFixed(3);
//             } else {
//               distance = Math.hypot(
//                 pointsBlueLeft[i].x - pointsBlueLeft[i].x,
//                 pointsBlueRight[j].y - pointsBlueLeft[i].y
//               ).toFixed(3);
//             }
//             cellFour.innerHTML = distance;
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             distValuesSWHR.push(distance / dist);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//             }
//           }
//           if (j == i + 1) {
//             var newRow = tbody.insertRow(-1);
//             let indexRow = newRow.rowIndex;
//             var cellOne = newRow.insertCell();
//             var cellTwo = newRow.insertCell();
//             var cellThree = newRow.insertCell();
//             var cellFour = newRow.insertCell();
//             var cellFive = newRow.insertCell();
//             if (imgSizeStatus != 100) {
//               var cellSix = newRow.insertCell();
//             } else {
//             }
//             indexImaginaryHindRight += 1;
//             cellOne.innerHTML = indexRow - 1;
//             cellTwo.innerHTML =
//               "Imaginary Hind " +
//               indexImaginaryHindRight +
//               " &#x2192 Blue R" +
//               (j + 1);
//             cellThree.innerHTML = "Stride Width Hind(R)";
//             if (i < pointsBlueLeft.length - 1) {
//               distance = Math.hypot(
//                 pointsBlueRight[j].x - pointsBlueRight[j].x,
//                 (pointsBlueLeft[i].y + pointsBlueLeft[i + 1].y) / 2 -
//                   pointsBlueRight[j].y
//               ).toFixed(3);
//             } else {
//               distance = Math.hypot(
//                 pointsBlueRight[j].x - pointsBlueRight[j].x,
//                 pointsBlueLeft[i].y - pointsBlueRight[j].y
//               ).toFixed(3);
//             }
//             cellFour.innerHTML = distance;
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             distValuesSWHR.push(distance / dist);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//             }
//           }
//         }
//       }
//       console.log(distValuesSWHR);
//       var strideWidthHindRightMeanRow = tbody.insertRow(-1);
//       var strideWidthHindRightRowCellOne =
//         strideWidthHindRightMeanRow.insertCell();
//       var strideWidthHindRightRowCellTwo =
//         strideWidthHindRightMeanRow.insertCell();
//       strideWidthHindRightRowCellOne.colSpan = "4";
//       strideWidthHindRightRowCellOne.innerHTML =
//         "<b>Stride Width Hind(R) average in cm:</b> ";
//       strideWidthHindRightRowCellTwo.innerHTML = (
//         distValuesSWHR.reduce((a, b) => a + b, 0) / distValuesSWHR.length
//       ).toFixed(3);
//       if (imgSizeStatus != 100) {
//         var strideWidthHindRightRowCellThreeOriginal =
//           strideWidthHindRightMeanRow.insertCell();
//         switch (imgSizeStatus) {
//           case 50:
//             strideWidthHindRightRowCellThreeOriginal.innerHTML = (
//               (distValuesSWHR.reduce((a, b) => a + b, 0) /
//                 distValuesSWHR.length) *
//               2
//             ).toFixed(3);
//             break;
//           case 75:
//             strideWidthHindRightRowCellThreeOriginal.innerHTML = (
//               ((distValuesSWHR.reduce((a, b) => a + b, 0) /
//                 distValuesSWHR.length) *
//                 100) /
//               75
//             ).toFixed(3);
//             break;
//           case 25:
//             strideWidthHindRightRowCellThreeOriginal.innerHTML = (
//               (distValuesSWHR.reduce((a, b) => a + b, 0) /
//                 distValuesSWHR.length) *
//               4
//             ).toFixed(3);
//             break;
//           case 40:
//             strideWidthHindRightRowCellThreeOriginal.innerHTML = (
//               ((distValuesSWHR.reduce((a, b) => a + b, 0) /
//                 distValuesSWHR.length) *
//                 100) /
//               40
//             ).toFixed(3);
//             break;
//         }
//       }
//     }
//   }
//   var lastRow = tbody.insertRow(-1);
//   var lastCell = lastRow.insertCell();
//   lastCell.innerHTML =
//     "------------------------------BREAK------------------------------";
//   if (imgSizeStatus != 100) {
//     lastCell.colSpan = "6";
//   } else {
//     lastCell.colSpan = "5";
//   }
//   lastCell.style.textAlign = "center";
// }

// // FUNCTION TO ADD ALL ENTRIES IN ONE CLICK WITHOUT AVERAGE

// function addEntriesAll() {
//   for (var i = 0; i < pointsRedLeft.length - 1; i++) {
//     var newRow = tbody.insertRow(-1);
//     let indexRow = newRow.rowIndex;
//     var cellOne = newRow.insertCell();
//     var cellTwo = newRow.insertCell();
//     var cellThree = newRow.insertCell();
//     var cellFour = newRow.insertCell();
//     var cellFive = newRow.insertCell();
//     if (imgSizeStatus != 100) {
//       var cellSix = newRow.insertCell();
//     } else {
//     }
//     if (imgSizeStatus) cellOne.innerHTML = indexRow - 1;
//     cellTwo.innerHTML = "Red L" + (i + 1) + " &#x2192 Red L" + (i + 2);
//     cellThree.innerHTML = "Stride length left front";
//     distance = Math.hypot(
//       pointsRedLeft[i].x - pointsRedLeft[i + 1].x,
//       pointsRedLeft[i].y - pointsRedLeft[i + 1].y
//     ).toFixed(3);
//     cellFour.innerHTML = distance;
//     if (dist != 0 && imgSizeStatus == 100) {
//       cellFive.innerHTML = (distance / dist).toFixed(3);
//     }
//     if (dist != 0 && imgSizeStatus != 100) {
//       switch (imgSizeStatus) {
//         case 50:
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//           break;
//         case 75:
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//           break;
//         case 25:
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//           break;
//         case 40:
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//       }
//     }
//     if (dist == 0 && imgSizeStatus != 100) {
//       cellFive.innerHTML = "Undefined";
//       cellSix.innerHTML = "Undefined";
//     }
//     if (dist == 0 && imgSizeStatus == 100) {
//       cellFive.innerHTML = "Undefined";
//     }
//   }
//   for (var i = 0; i < pointsRedRight.length - 1; i++) {
//     var newRow = tbody.insertRow(-1);
//     let indexRow = newRow.rowIndex;
//     var cellOne = newRow.insertCell();
//     var cellTwo = newRow.insertCell();
//     var cellThree = newRow.insertCell();
//     var cellFour = newRow.insertCell();
//     var cellFive = newRow.insertCell();
//     if (imgSizeStatus != 100) {
//       var cellSix = newRow.insertCell();
//     } else {
//     }
//     cellOne.innerHTML = indexRow - 1;
//     cellTwo.innerHTML = "Red R" + (i + 1) + " &#x2192 Red R" + (i + 2);
//     cellThree.innerHTML = "Stride length right front";
//     distance = Math.hypot(
//       pointsRedRight[i].x - pointsRedRight[i + 1].x,
//       pointsRedRight[i].y - pointsRedRight[i + 1].y
//     ).toFixed(3);
//     cellFour.innerHTML = distance;
//     if (dist != 0) {
//       cellFive.innerHTML = (distance / dist).toFixed(3);
//       switch (imgSizeStatus) {
//         case 50:
//           cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           break;
//         case 75:
//           cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           break;
//         case 25:
//           cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           break;
//         case 40:
//           cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//       }
//     }
//     if (dist == 0 && imgSizeStatus != 100) {
//       cellFive.innerHTML = "Undefined";
//       cellSix.innerHTML = "Undefined";
//     }
//     if (dist == 0 && imgSizeStatus == 100) {
//       cellFive.innerHTML = "Undefined";
//     }
//   }
//   for (var i = 0; i < pointsBlueLeft.length - 1; i++) {
//     var newRow = tbody.insertRow(-1);
//     let indexRow = newRow.rowIndex;
//     var cellOne = newRow.insertCell();
//     var cellTwo = newRow.insertCell();
//     var cellThree = newRow.insertCell();
//     var cellFour = newRow.insertCell();
//     var cellFive = newRow.insertCell();
//     if (imgSizeStatus != 100) {
//       var cellSix = newRow.insertCell();
//     } else {
//     }
//     cellOne.innerHTML = indexRow - 1;
//     cellTwo.innerHTML = "Blue L" + (i + 1) + " &#x2192 Blue L" + (i + 2);
//     cellThree.innerHTML = "Stride length left hind";
//     distance = Math.hypot(
//       pointsBlueLeft[i].x - pointsBlueLeft[i + 1].x,
//       pointsBlueLeft[i].y - pointsBlueLeft[i + 1].y
//     ).toFixed(3);
//     cellFour.innerHTML = distance;
//     if (dist != 0) {
//       cellFive.innerHTML = (distance / dist).toFixed(3);
//       switch (imgSizeStatus) {
//         case 50:
//           cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           break;
//         case 75:
//           cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           break;
//         case 25:
//           cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           break;
//         case 40:
//           cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//       }
//     }
//     if (dist == 0 && imgSizeStatus != 100) {
//       cellFive.innerHTML = "Undefined";
//       cellSix.innerHTML = "Undefined";
//     }
//     if (dist == 0 && imgSizeStatus == 100) {
//       cellFive.innerHTML = "Undefined";
//     }
//   }
//   for (var i = 0; i < pointsBlueRight.length - 1; i++) {
//     var newRow = tbody.insertRow(-1);
//     let indexRow = newRow.rowIndex;
//     var cellOne = newRow.insertCell();
//     var cellTwo = newRow.insertCell();
//     var cellThree = newRow.insertCell();
//     var cellFour = newRow.insertCell();
//     var cellFive = newRow.insertCell();
//     if (imgSizeStatus != 100) {
//       var cellSix = newRow.insertCell();
//     } else {
//     }
//     cellOne.innerHTML = indexRow - 1;
//     cellTwo.innerHTML = "Blue R" + (i + 1) + " &#x2192 Blue R" + (i + 2);
//     cellThree.innerHTML = "Stride length right hind";
//     distance = Math.hypot(
//       pointsBlueRight[i].x - pointsBlueRight[i + 1].x,
//       pointsBlueRight[i].y - pointsBlueRight[i + 1].y
//     ).toFixed(3);
//     cellFour.innerHTML = distance;
//     if (dist != 0) {
//       cellFive.innerHTML = (distance / dist).toFixed(3);
//       switch (imgSizeStatus) {
//         case 50:
//           cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           break;
//         case 75:
//           cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           break;
//         case 25:
//           cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           break;
//         case 40:
//           cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//       }
//     }
//     if (dist == 0 && imgSizeStatus != 100) {
//       cellFive.innerHTML = "Undefined";
//       cellSix.innerHTML = "Undefined";
//     }
//     if (dist == 0 && imgSizeStatus == 100) {
//       cellFive.innerHTML = "Undefined";
//     }
//   }
//   for (var i = 0; i < pointsRedLeft.length; i++) {
//     for (var j = 0; j < pointsBlueLeft.length; j++) {
//       if (i == j) {
//         var newRow = tbody.insertRow(-1);
//         let indexRow = newRow.rowIndex;
//         var cellOne = newRow.insertCell();
//         var cellTwo = newRow.insertCell();
//         var cellThree = newRow.insertCell();
//         var cellFour = newRow.insertCell();
//         var cellFive = newRow.insertCell();
//         if (imgSizeStatus != 100) {
//           var cellSix = newRow.insertCell();
//         } else {
//         }
//         cellOne.innerHTML = indexRow - 1;
//         cellTwo.innerHTML = "Red L" + (i + 1) + " &#x2192 Blue L" + (j + 1);
//         cellThree.innerHTML = "Overlap Left";
//         distance = Math.hypot(
//           pointsRedLeft[i].x - pointsBlueLeft[j].x,
//           pointsRedLeft[i].y - pointsBlueLeft[j].y
//         ).toFixed(3);
//         cellFour.innerHTML = distance;
//         if (dist != 0) {
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           switch (imgSizeStatus) {
//             case 50:
//               cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//               cellFive.innerHTML = (distance / dist).toFixed(3);
//               break;
//             case 75:
//               cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//               cellFive.innerHTML = (distance / dist).toFixed(3);
//               break;
//             case 25:
//               cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//               cellFive.innerHTML = (distance / dist).toFixed(3);
//               break;
//             case 40:
//               cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//               cellFive.innerHTML = (distance / dist).toFixed(3);
//           }
//         }
//         if (dist == 0 && imgSizeStatus != 100) {
//           cellFive.innerHTML = "Undefined";
//           cellSix.innerHTML = "Undefined";
//         }
//         if (dist == 0 && imgSizeStatus == 100) {
//           cellFive.innerHTML = "Undefined";
//         }
//       }
//     }
//   }
//   for (var i = 0; i < pointsRedRight.length; i++) {
//     for (var j = 0; j < pointsBlueRight.length; j++) {
//       if (i == j) {
//         var newRow = tbody.insertRow(-1);
//         let indexRow = newRow.rowIndex;
//         var cellOne = newRow.insertCell();
//         var cellTwo = newRow.insertCell();
//         var cellThree = newRow.insertCell();
//         var cellFour = newRow.insertCell();
//         var cellFive = newRow.insertCell();
//         if (imgSizeStatus != 100) {
//           var cellSix = newRow.insertCell();
//         } else {
//         }
//         cellOne.innerHTML = indexRow - 1;
//         cellTwo.innerHTML = "Red R" + (i + 1) + " &#x2192 Blue R" + (j + 1);
//         cellThree.innerHTML = "Overlap Right";
//         distance = Math.hypot(
//           pointsRedRight[i].x - pointsBlueRight[j].x,
//           pointsRedRight[i].y - pointsBlueRight[j].y
//         ).toFixed(3);
//         cellFour.innerHTML = distance;
//         if (dist != 0) {
//           cellFive.innerHTML = (distance / dist).toFixed(3);
//           switch (imgSizeStatus) {
//             case 50:
//               cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//               cellFive.innerHTML = (distance / dist).toFixed(3);
//               break;
//             case 75:
//               cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//               cellFive.innerHTML = (distance / dist).toFixed(3);
//               break;
//             case 25:
//               cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//               cellFive.innerHTML = (distance / dist).toFixed(3);
//               break;
//             case 40:
//               cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//               cellFive.innerHTML = (distance / dist).toFixed(3);
//           }
//         }
//         if (dist == 0 && imgSizeStatus != 100) {
//           cellFive.innerHTML = "Undefined";
//           cellSix.innerHTML = "Undefined";
//         }
//         if (dist == 0 && imgSizeStatus == 100) {
//           cellFive.innerHTML = "Undefined";
//         }
//       }
//     }
//   }
//   if (footstepStart.options[footstepStart.selectedIndex].value == "Left") {
//     var indexImaginaryFrontLeft = 0;
//     var indexImaginaryHindLeft = 0;
//     for (var i = 0; i < pointsRedLeft.length; i++) {
//       for (var j = 0; j < pointsRedRight.length; j++) {
//         if (i == j) {
//           var newRow = tbody.insertRow(-1);
//           let indexRow = newRow.rowIndex;
//           var cellOne = newRow.insertCell();
//           var cellTwo = newRow.insertCell();
//           var cellThree = newRow.insertCell();
//           var cellFour = newRow.insertCell();
//           var cellFive = newRow.insertCell();
//           if (imgSizeStatus != 100) {
//             var cellSix = newRow.insertCell();
//           } else {
//           }
//           indexImaginaryFrontLeft += 1;
//           cellOne.innerHTML = indexRow - 1;
//           cellTwo.innerHTML =
//             "Imaginary Front " +
//             indexImaginaryFrontLeft +
//             " &#x2192 Red R" +
//             (j + 1);
//           cellThree.innerHTML = "Stride Width Front(L)";
//           if (i < pointsRedLeft.length - 1) {
//             distance = Math.hypot(
//               pointsRedRight[j].x - pointsRedRight[j].x,
//               (pointsRedLeft[i].y + pointsRedLeft[i + 1].y) / 2 -
//                 pointsRedRight[j].y
//             ).toFixed(3);
//           } else {
//             distance = Math.hypot(
//               pointsRedRight[j].x - pointsRedRight[j].x,
//               pointsRedLeft[i].y - pointsRedRight[j].y
//             ).toFixed(3);
//           }
//           cellFour.innerHTML = distance;
//           if (dist != 0) {
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//             }
//           }
//           if (dist == 0 && imgSizeStatus != 100) {
//             cellFive.innerHTML = "Undefined";
//             cellSix.innerHTML = "Undefined";
//           }
//           if (dist == 0 && imgSizeStatus == 100) {
//             cellFive.innerHTML = "Undefined";
//           }
//         }
//         if (i == j + 1) {
//           var newRow = tbody.insertRow(-1);
//           let indexRow = newRow.rowIndex;
//           var cellOne = newRow.insertCell();
//           var cellTwo = newRow.insertCell();
//           var cellThree = newRow.insertCell();
//           var cellFour = newRow.insertCell();
//           var cellFive = newRow.insertCell();
//           if (imgSizeStatus != 100) {
//             var cellSix = newRow.insertCell();
//           } else {
//           }
//           indexImaginaryFrontLeft += 1;
//           cellOne.innerHTML = indexRow - 1;
//           cellTwo.innerHTML =
//             "Imaginary Front " +
//             indexImaginaryFrontLeft +
//             " &#x2192 Red L" +
//             (i + 1);
//           cellThree.innerHTML = "Stride Width Front(L)";
//           if (j < pointsRedRight.length - 1) {
//             distance = Math.hypot(
//               pointsRedLeft[i].x - pointsRedLeft[i].x,
//               pointsRedLeft[i].y -
//                 (pointsRedRight[j].y + pointsRedRight[j + 1].y) / 2
//             ).toFixed(3);
//           } else {
//             distance = Math.hypot(
//               pointsRedLeft[i].x - pointsRedLeft[i].x,
//               pointsRedLeft[i].y - pointsRedRight[j].y
//             ).toFixed(3);
//           }
//           cellFour.innerHTML = distance;
//           if (dist != 0) {
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//             }
//           }
//           if (dist == 0 && imgSizeStatus != 100) {
//             cellFive.innerHTML = "Undefined";
//             cellSix.innerHTML = "Undefined";
//           }
//           if (dist == 0 && imgSizeStatus == 100) {
//             cellFive.innerHTML = "Undefined";
//           }
//         }
//       }
//     }
//     for (var i = 0; i < pointsBlueLeft.length; i++) {
//       for (var j = 0; j < pointsBlueRight.length; j++) {
//         if (i == j) {
//           var newRow = tbody.insertRow(-1);
//           let indexRow = newRow.rowIndex;
//           var cellOne = newRow.insertCell();
//           var cellTwo = newRow.insertCell();
//           var cellThree = newRow.insertCell();
//           var cellFour = newRow.insertCell();
//           var cellFive = newRow.insertCell();
//           if (imgSizeStatus != 100) {
//             var cellSix = newRow.insertCell();
//           } else {
//           }
//           indexImaginaryHindLeft += 1;
//           cellOne.innerHTML = indexRow - 1;
//           cellTwo.innerHTML =
//             "Imaginary Hind " +
//             indexImaginaryHindLeft +
//             " &#x2192 Blue R" +
//             (j + 1);
//           cellThree.innerHTML = "Stride Width Hind(L)";
//           if (i < pointsBlueLeft.length - 1) {
//             distance = Math.hypot(
//               pointsBlueRight[j].x - pointsBlueRight[j].x,
//               (pointsBlueLeft[i].y + pointsBlueLeft[i + 1].y) / 2 -
//                 pointsBlueRight[j].y
//             ).toFixed(3);
//           } else {
//             distance = Math.hypot(
//               pointsBlueRight[j].x - pointsBlueRight[j].x,
//               pointsBlueLeft[i].y - pointsBlueRight[j].y
//             ).toFixed(3);
//           }
//           cellFour.innerHTML = distance;
//           if (dist != 0) {
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//             }
//           }
//           if (dist == 0 && imgSizeStatus != 100) {
//             cellFive.innerHTML = "Undefined";
//             cellSix.innerHTML = "Undefined";
//           }
//           if (dist == 0 && imgSizeStatus == 100) {
//             cellFive.innerHTML = "Undefined";
//           }
//         }
//         if (i == j + 1) {
//           var newRow = tbody.insertRow(-1);
//           let indexRow = newRow.rowIndex;
//           var cellOne = newRow.insertCell();
//           var cellTwo = newRow.insertCell();
//           var cellThree = newRow.insertCell();
//           var cellFour = newRow.insertCell();
//           var cellFive = newRow.insertCell();
//           if (imgSizeStatus != 100) {
//             var cellSix = newRow.insertCell();
//           } else {
//           }
//           indexImaginaryHindLeft += 1;
//           cellOne.innerHTML = indexRow - 1;
//           cellTwo.innerHTML =
//             "Imaginary Hind " +
//             indexImaginaryHindLeft +
//             " &#x2192 Blue L" +
//             (i + 1);
//           cellThree.innerHTML = "Stride Width Hind(L)";
//           if (j < pointsBlueRight.length - 1) {
//             distance = Math.hypot(
//               pointsBlueLeft[i].x - pointsBlueLeft[i].x,
//               pointsBlueLeft[i].y -
//                 (pointsBlueRight[j].y + pointsBlueRight[j + 1].y) / 2
//             ).toFixed(3);
//           } else {
//             distance = Math.hypot(
//               pointsBlueLeft[i].x - pointsBlueLeft[i].x,
//               pointsBlueLeft[i].y - pointsBlueRight[j].y
//             ).toFixed(3);
//           }
//           cellFour.innerHTML = distance;
//           if (dist != 0) {
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//             }
//           }
//           if (dist == 0 && imgSizeStatus != 100) {
//             cellFive.innerHTML = "Undefined";
//             cellSix.innerHTML = "Undefined";
//           }
//           if (dist == 0 && imgSizeStatus == 100) {
//             cellFive.innerHTML = "Undefined";
//           }
//         }
//       }
//     }
//   }
//   if (footstepStart.options[footstepStart.selectedIndex].value == "Right") {
//     var indexImaginaryFrontRight = 0;
//     var indexImaginaryHindRight = 0;
//     for (var i = 0; i < pointsRedLeft.length; i++) {
//       for (var j = 0; j < pointsRedRight.length; j++) {
//         if (i == j) {
//           var newRow = tbody.insertRow(-1);
//           let indexRow = newRow.rowIndex;
//           var cellOne = newRow.insertCell();
//           var cellTwo = newRow.insertCell();
//           var cellThree = newRow.insertCell();
//           var cellFour = newRow.insertCell();
//           var cellFive = newRow.insertCell();
//           if (imgSizeStatus != 100) {
//             var cellSix = newRow.insertCell();
//           } else {
//           }
//           indexImaginaryFrontRight += 1;
//           cellOne.innerHTML = indexRow - 1;
//           cellTwo.innerHTML =
//             "Imaginary Front " +
//             indexImaginaryFrontRight +
//             " &#x2192 Red L" +
//             (i + 1);
//           cellThree.innerHTML = "Stride Width Front(R)";
//           if (j < pointsRedRight.length - 1) {
//             distance = Math.hypot(
//               pointsRedLeft[i].x - pointsRedLeft[i].x,
//               (pointsRedRight[j].y + pointsRedRight[j + 1].y) / 2 -
//                 pointsRedLeft[i].y
//             ).toFixed(3);
//           } else {
//             distance = Math.hypot(
//               pointsRedLeft[i].x - pointsRedLeft[i].x,
//               pointsRedRight[j].y - pointsRedLeft[i].y
//             ).toFixed(3);
//           }
//           cellFour.innerHTML = distance;
//           if (dist != 0) {
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//             }
//           }
//           if (dist == 0 && imgSizeStatus != 100) {
//             cellFive.innerHTML = "Undefined";
//             cellSix.innerHTML = "Undefined";
//           }
//           if (dist == 0 && imgSizeStatus == 100) {
//             cellFive.innerHTML = "Undefined";
//           }
//         }
//         if (j == i + 1) {
//           var newRow = tbody.insertRow(-1);
//           let indexRow = newRow.rowIndex;
//           var cellOne = newRow.insertCell();
//           var cellTwo = newRow.insertCell();
//           var cellThree = newRow.insertCell();
//           var cellFour = newRow.insertCell();
//           var cellFive = newRow.insertCell();
//           if (imgSizeStatus != 100) {
//             var cellSix = newRow.insertCell();
//           } else {
//           }
//           indexImaginaryFrontRight += 1;
//           cellOne.innerHTML = indexRow - 1;
//           cellTwo.innerHTML =
//             "Imaginary Front " +
//             indexImaginaryFrontRight +
//             " &#x2192 Red R" +
//             (j + 1);
//           cellThree.innerHTML = "Stride Width Front(R)";
//           if (i < pointsRedLeft.length - 1) {
//             distance = Math.hypot(
//               pointsRedRight[j].x - pointsRedRight[j].x,
//               (pointsRedLeft[i].y + pointsRedLeft[i + 1].y) / 2 -
//                 pointsRedRight[j].y
//             ).toFixed(3);
//           } else {
//             distance = Math.hypot(
//               pointsRedRight[j].x - pointsRedRight[j].x,
//               pointsRedLeft[i].y - pointsRedRight[j].y
//             ).toFixed(3);
//           }
//           cellFour.innerHTML = distance;
//           if (dist != 0) {
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//             }
//           }
//           if (dist == 0 && imgSizeStatus != 100) {
//             cellFive.innerHTML = "Undefined";
//             cellSix.innerHTML = "Undefined";
//           }
//           if (dist == 0 && imgSizeStatus == 100) {
//             cellFive.innerHTML = "Undefined";
//           }
//         }
//       }
//     }
//     for (var i = 0; i < pointsBlueLeft.length; i++) {
//       for (var j = 0; j < pointsBlueRight.length; j++) {
//         if (i == j) {
//           var newRow = tbody.insertRow(-1);
//           let indexRow = newRow.rowIndex;
//           var cellOne = newRow.insertCell();
//           var cellTwo = newRow.insertCell();
//           var cellThree = newRow.insertCell();
//           var cellFour = newRow.insertCell();
//           var cellFive = newRow.insertCell();
//           if (imgSizeStatus != 100) {
//             var cellSix = newRow.insertCell();
//           } else {
//           }
//           indexImaginaryHindRight += 1;
//           cellOne.innerHTML = indexRow - 1;
//           cellTwo.innerHTML =
//             "Imaginary Hind " +
//             indexImaginaryHindRight +
//             " &#x2192 Blue L" +
//             (i + 1);
//           cellThree.innerHTML = "Stride Width Hind(R)";
//           if (j < pointsBlueRight.length - 1) {
//             distance = Math.hypot(
//               pointsBlueLeft[i].x - pointsBlueLeft[i].x,
//               (pointsBlueRight[j].y + pointsBlueRight[j + 1].y) / 2 -
//                 pointsBlueLeft[i].y
//             ).toFixed(3);
//           } else {
//             distance = Math.hypot(
//               pointsBlueLeft[i].x - pointsBlueLeft[i].x,
//               pointsBlueRight[j].y - pointsBlueLeft[i].y
//             ).toFixed(3);
//           }
//           cellFour.innerHTML = distance;
//           if (dist != 0) {
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//             }
//           }
//           if (dist == 0 && imgSizeStatus != 100) {
//             cellFive.innerHTML = "Undefined";
//             cellSix.innerHTML = "Undefined";
//           }
//           if (dist == 0 && imgSizeStatus == 100) {
//             cellFive.innerHTML = "Undefined";
//           }
//         }
//         if (j == i + 1) {
//           var newRow = tbody.insertRow(-1);
//           let indexRow = newRow.rowIndex;
//           var cellOne = newRow.insertCell();
//           var cellTwo = newRow.insertCell();
//           var cellThree = newRow.insertCell();
//           var cellFour = newRow.insertCell();
//           var cellFive = newRow.insertCell();
//           if (imgSizeStatus != 100) {
//             var cellSix = newRow.insertCell();
//           } else {
//           }
//           indexImaginaryHindRight += 1;
//           cellOne.innerHTML = indexRow - 1;
//           cellTwo.innerHTML =
//             "Imaginary Hind " +
//             indexImaginaryHindRight +
//             " &#x2192 Blue R" +
//             (j + 1);
//           cellThree.innerHTML = "Stride Width Hind(R)";
//           if (i < pointsBlueLeft.length - 1) {
//             distance = Math.hypot(
//               pointsBlueRight[j].x - pointsBlueRight[j].x,
//               (pointsBlueLeft[i].y + pointsBlueLeft[i + 1].y) / 2 -
//                 pointsBlueRight[j].y
//             ).toFixed(3);
//           } else {
//             distance = Math.hypot(
//               pointsBlueRight[j].x - pointsBlueRight[j].x,
//               pointsBlueLeft[i].y - pointsBlueRight[j].y
//             ).toFixed(3);
//           }
//           cellFour.innerHTML = distance;
//           if (dist != 0) {
//             cellFive.innerHTML = (distance / dist).toFixed(3);
//             switch (imgSizeStatus) {
//               case 50:
//                 cellSix.innerHTML = ((distance / dist) * 2).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 75:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 75)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 25:
//                 cellSix.innerHTML = ((distance / dist) * 4).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//                 break;
//               case 40:
//                 cellSix.innerHTML = ((distance / dist) * (100 / 40)).toFixed(3);
//                 cellFive.innerHTML = (distance / dist).toFixed(3);
//             }
//           }
//           if (dist == 0 && imgSizeStatus != 100) {
//             cellFive.innerHTML = "Undefined";
//             cellSix.innerHTML = "Undefined";
//           }
//           if (dist == 0 && imgSizeStatus == 100) {
//             cellFive.innerHTML = "Undefined";
//           }
//         }
//       }
//     }
//   }
//   if (
//     pointsRedLeft.length < 1 ||
//     pointsRedRight.length < 1 ||
//     pointsBlueLeft.length < 1 ||
//     pointsBlueRight.length < 1
//   ) {
//     alert("Points missing in some measurements.");
//   }
//   var lastRow = tbody.insertRow(-1);
//   var lastCell = lastRow.insertCell();
//   lastCell.innerHTML =
//     "------------------------------BREAK------------------------------";
//   if (imgSizeStatus != 100) {
//     lastCell.colSpan = "6";
//   } else {
//     lastCell.colSpan = "5";
//   }
//   lastCell.style.textAlign = "center";
// }

// ADD ALL ENTRIES WITH ONE CLICK WITH AVERAGE FOR EACH MEASUREMENT

function addEntriesAllAverage() {
  var distValuesSLLF = [];
  var distValuesSLRF = [];
  var distValuesSLLH = [];
  var distValuesSLRH = [];
  var distValuesOL = [];
  var distValuesOR = [];
  var distValuesSWFL = [];
  var distValuesSWHL = [];
  var distValuesSWFR = [];
  var distValuesSWHR = [];
  if (dist == 0) {
    alert("Measure how many pixels are in a cm before using these option!");
    return;
  } else if (
    pointsRedLeft.length < 2 ||
    pointsRedRight.length < 2 ||
    pointsBlueLeft.length < 2 ||
    pointsBlueRight.length < 2
  ) {
    alert("Have enough points to perform at least one of each measurement.");
    return;
  } else {
    for (var i = 0; i < pointsRedLeft.length - 1; i++) {
      var newRow = tbody.insertRow(-1);
      let indexRow = newRow.rowIndex;
      var cellOne = newRow.insertCell();
      var cellTwo = newRow.insertCell();
      var cellThree = newRow.insertCell();
      var cellFour = newRow.insertCell();
      var cellFive = newRow.insertCell();
      // let distance = 0;
      cellOne.innerHTML = indexRow - 1;
      cellTwo.innerHTML = "Red L" + (i + 1) + " &#x2192 Red L" + (i + 2);
      cellThree.innerHTML = "Stride length left front";
      distance = Math.hypot(
        pointsRedLeft[i].x - pointsRedLeft[i + 1].x,
        pointsRedLeft[i].y - pointsRedLeft[i + 1].y
      ).toFixed(3);
      cellFour.innerHTML = distance;
      cellFive.innerHTML = (distance / dist).toFixed(3);
      distValuesSLLF.push(distance / dist);
    }
    console.log(distValuesSLLF);
    var strideLeftFrontMeanRow = tbody.insertRow(-1);
    var strideLeftFrontRowCellOne = strideLeftFrontMeanRow.insertCell();
    var strideLeftFrontRowCellTwo = strideLeftFrontMeanRow.insertCell();
    strideLeftFrontRowCellOne.colSpan = "4";
    strideLeftFrontRowCellOne.innerHTML =
      "<b>Stride length left front average in cm:</b> ";
    strideLeftFrontRowCellTwo.innerHTML = (
      distValuesSLLF.reduce((a, b) => a + b) / distValuesSLLF.length
    ).toFixed(3);
    for (var i = 0; i < pointsRedRight.length - 1; i++) {
      var newRow = tbody.insertRow(-1);
      let indexRow = newRow.rowIndex;
      var cellOne = newRow.insertCell();
      var cellTwo = newRow.insertCell();
      var cellThree = newRow.insertCell();
      var cellFour = newRow.insertCell();
      var cellFive = newRow.insertCell();
      cellOne.innerHTML = indexRow - 1;
      cellTwo.innerHTML = "Red R" + (i + 1) + " &#x2192 Red R" + (i + 2);
      cellThree.innerHTML = "Stride length right front";
      distance = Math.hypot(
        pointsRedRight[i].x - pointsRedRight[i + 1].x,
        pointsRedRight[i].y - pointsRedRight[i + 1].y
      ).toFixed(3);
      cellFour.innerHTML = distance;
      cellFive.innerHTML = (distance / dist).toFixed(3);
      distValuesSLRF.push(distance / dist);
    }
    console.log(distValuesSLRF);
    var strideRightFrontMeanRow = tbody.insertRow(-1);
    var strideRightFrontRowCellOne = strideRightFrontMeanRow.insertCell();
    var strideRightFrontRowCellTwo = strideRightFrontMeanRow.insertCell();
    strideRightFrontRowCellOne.colSpan = "4";
    strideRightFrontRowCellOne.innerHTML =
      "<b>Stride length right front average in cm:</b> ";
    strideRightFrontRowCellTwo.innerHTML = (
      distValuesSLRF.reduce((a, b) => a + b) / distValuesSLRF.length
    ).toFixed(3);
    for (var i = 0; i < pointsBlueLeft.length - 1; i++) {
      var newRow = tbody.insertRow(-1);
      let indexRow = newRow.rowIndex;
      var cellOne = newRow.insertCell();
      var cellTwo = newRow.insertCell();
      var cellThree = newRow.insertCell();
      var cellFour = newRow.insertCell();
      var cellFive = newRow.insertCell();
      cellOne.innerHTML = indexRow - 1;
      cellTwo.innerHTML = "Blue L" + (i + 1) + " &#x2192 Blue L" + (i + 2);
      cellThree.innerHTML = "Stride length left hind";
      distance = Math.hypot(
        pointsBlueLeft[i].x - pointsBlueLeft[i + 1].x,
        pointsBlueLeft[i].y - pointsBlueLeft[i + 1].y
      ).toFixed(3);
      cellFour.innerHTML = distance;
      cellFive.innerHTML = (distance / dist).toFixed(3);
      distValuesSLLH.push(distance / dist);
    }
    console.log(distValuesSLLH);
    var strideLeftHindMeanRow = tbody.insertRow(-1);
    var strideLeftHindRowCellOne = strideLeftHindMeanRow.insertCell();
    var strideLeftHindRowCellTwo = strideLeftHindMeanRow.insertCell();
    strideLeftHindRowCellOne.colSpan = "4";
    strideLeftHindRowCellOne.innerHTML =
      "<b>Stride length left hind average in cm:</b> ";
    strideLeftHindRowCellTwo.innerHTML = (
      distValuesSLLH.reduce((a, b) => a + b) / distValuesSLLH.length
    ).toFixed(3);
    for (var i = 0; i < pointsBlueRight.length - 1; i++) {
      var newRow = tbody.insertRow(-1);
      let indexRow = newRow.rowIndex;
      var cellOne = newRow.insertCell();
      var cellTwo = newRow.insertCell();
      var cellThree = newRow.insertCell();
      var cellFour = newRow.insertCell();
      var cellFive = newRow.insertCell();
      cellOne.innerHTML = indexRow - 1;
      cellTwo.innerHTML = "Blue R" + (i + 1) + " &#x2192 Blue R" + (i + 2);
      cellThree.innerHTML = "Stride length right hind";
      distance = Math.hypot(
        pointsBlueRight[i].x - pointsBlueRight[i + 1].x,
        pointsBlueRight[i].y - pointsBlueRight[i + 1].y
      ).toFixed(3);
      cellFour.innerHTML = distance;
      cellFive.innerHTML = (distance / dist).toFixed(3);
      distValuesSLRH.push(distance / dist);
    }
    console.log(distValuesSLRH);
    var strideRightHindMeanRow = tbody.insertRow(-1);
    var strideRightHindRowCellOne = strideRightHindMeanRow.insertCell();
    var strideRightHindRowCellTwo = strideRightHindMeanRow.insertCell();
    strideRightHindRowCellOne.colSpan = "4";
    strideRightHindRowCellOne.innerHTML =
      "<b>Stride length right hind average in cm:</b> ";
    strideRightHindRowCellTwo.innerHTML = (
      distValuesSLRH.reduce((a, b) => a + b) / distValuesSLRH.length
    ).toFixed(3);
    for (var i = 0; i < pointsRedLeft.length; i++) {
      for (var j = 0; j < pointsBlueLeft.length; j++) {
        if (i == j) {
          var newRow = tbody.insertRow(-1);
          let indexRow = newRow.rowIndex;
          var cellOne = newRow.insertCell();
          var cellTwo = newRow.insertCell();
          var cellThree = newRow.insertCell();
          var cellFour = newRow.insertCell();
          var cellFive = newRow.insertCell();
          cellOne.innerHTML = indexRow - 1;
          cellTwo.innerHTML = "Red L" + (i + 1) + " &#x2192 Blue L" + (j + 1);
          cellThree.innerHTML = "Overlap Left";
          distance = Math.hypot(
            pointsRedLeft[i].x - pointsBlueLeft[j].x,
            pointsRedLeft[i].y - pointsBlueLeft[j].y
          ).toFixed(3);
          cellFour.innerHTML = distance;
          cellFive.innerHTML = (distance / dist).toFixed(3);
          distValuesOL.push(distance / dist);
        }
      }
    }
    console.log(distValuesOL);
    var overlapLeftMeanRow = tbody.insertRow(-1);
    var overlapLeftRowCellOne = overlapLeftMeanRow.insertCell();
    var overlapLeftRowCellTwo = overlapLeftMeanRow.insertCell();
    overlapLeftRowCellOne.colSpan = "4";
    overlapLeftRowCellOne.innerHTML = "<b>Overlap left average in cm:</b> ";
    overlapLeftRowCellTwo.innerHTML = (
      distValuesOL.reduce((a, b) => a + b) / distValuesOL.length
    ).toFixed(3);
    for (var i = 0; i < pointsRedRight.length; i++) {
      for (var j = 0; j < pointsBlueRight.length; j++) {
        if (i == j) {
          var newRow = tbody.insertRow(-1);
          let indexRow = newRow.rowIndex;
          var cellOne = newRow.insertCell();
          var cellTwo = newRow.insertCell();
          var cellThree = newRow.insertCell();
          var cellFour = newRow.insertCell();
          var cellFive = newRow.insertCell();
          cellOne.innerHTML = indexRow - 1;
          cellTwo.innerHTML = "Red R" + (i + 1) + " &#x2192 Blue R" + (j + 1);
          cellThree.innerHTML = "Overlap Right";
          distance = Math.hypot(
            pointsRedRight[i].x - pointsBlueRight[j].x,
            pointsRedRight[i].y - pointsBlueRight[j].y
          ).toFixed(3);
          cellFour.innerHTML = distance;
          cellFive.innerHTML = (distance / dist).toFixed(3);
          distValuesOR.push(distance / dist);
        }
      }
    }
    console.log(distValuesOR);
    var overlapRightMeanRow = tbody.insertRow(-1);
    var overlapRightRowCellOne = overlapRightMeanRow.insertCell();
    var overlapRightRowCellTwo = overlapRightMeanRow.insertCell();
    overlapRightRowCellOne.colSpan = "4";
    overlapRightRowCellOne.innerHTML = "<b>Overlap Right average in cm:</b> ";
    overlapRightRowCellTwo.innerHTML = (
      distValuesOR.reduce((a, b) => a + b) / distValuesOR.length
    ).toFixed(3);
    if (footstepStart.options[footstepStart.selectedIndex].value == "Left") {
      var indexImaginaryFrontLeft = 0;
      var indexImaginaryHindLeft = 0;
      for (var i = 0; i < pointsRedLeft.length; i++) {
        for (var j = 0; j < pointsRedRight.length; j++) {
          if (i == j) {
            var newRow = tbody.insertRow(-1);
            let indexRow = newRow.rowIndex;
            var cellOne = newRow.insertCell();
            var cellTwo = newRow.insertCell();
            var cellThree = newRow.insertCell();
            var cellFour = newRow.insertCell();
            var cellFive = newRow.insertCell();
            indexImaginaryFrontLeft += 1;
            cellOne.innerHTML = indexRow - 1;
            cellTwo.innerHTML =
              "Imaginary Front " +
              indexImaginaryFrontLeft +
              " &#x2192 Red R" +
              (j + 1);
            cellThree.innerHTML = "Stride Width Front(L)";
            if (i < pointsRedLeft.length - 1) {
              distance = Math.hypot(
                pointsRedRight[j].x - pointsRedRight[j].x,
                (pointsRedLeft[i].y + pointsRedLeft[i + 1].y) / 2 -
                  pointsRedRight[j].y
              ).toFixed(3);
            } else {
              distance = Math.hypot(
                pointsRedRight[j].x - pointsRedRight[j].x,
                pointsRedLeft[i].y - pointsRedRight[j].y
              ).toFixed(3);
            }
            cellFour.innerHTML = distance;
            cellFive.innerHTML = (distance / dist).toFixed(3);
            distValuesSWFL.push(distance / dist);
          }
          if (i == j + 1) {
            var newRow = tbody.insertRow(-1);
            let indexRow = newRow.rowIndex;
            var cellOne = newRow.insertCell();
            var cellTwo = newRow.insertCell();
            var cellThree = newRow.insertCell();
            var cellFour = newRow.insertCell();
            var cellFive = newRow.insertCell();
            indexImaginaryFrontLeft += 1;
            cellOne.innerHTML = indexRow - 1;
            cellTwo.innerHTML =
              "Imaginary Front " +
              indexImaginaryFrontLeft +
              " &#x2192 Red L" +
              (i + 1);
            cellThree.innerHTML = "Stride Width Front(L)";
            if (j < pointsRedRight.length - 1) {
              distance = Math.hypot(
                pointsRedLeft[i].x - pointsRedLeft[i].x,
                pointsRedLeft[i].y -
                  (pointsRedRight[j].y + pointsRedRight[j + 1].y) / 2
              ).toFixed(3);
            } else {
              distance = Math.hypot(
                pointsRedLeft[i].x - pointsRedLeft[i].x,
                pointsRedLeft[i].y - pointsRedRight[j].y
              ).toFixed(3);
            }
            cellFour.innerHTML = distance;
            cellFive.innerHTML = (distance / dist).toFixed(3);
            distValuesSWFL.push(distance / dist);
          }
        }
      }
      console.log(distValuesSWFL);
      var strideWidthFrontLeftMeanRow = tbody.insertRow(-1);
      var strideWidthFrontLeftRowCellOne =
        strideWidthFrontLeftMeanRow.insertCell();
      var strideWidthFrontLeftRowCellTwo =
        strideWidthFrontLeftMeanRow.insertCell();
      strideWidthFrontLeftRowCellOne.colSpan = "4";
      strideWidthFrontLeftRowCellOne.innerHTML =
        "<b>Stride Width Front(L) average in cm:</b> ";
      strideWidthFrontLeftRowCellTwo.innerHTML = (
        distValuesSWFL.reduce((a, b) => a + b) / distValuesSWFL.length
      ).toFixed(3);
      for (var i = 0; i < pointsBlueLeft.length; i++) {
        for (var j = 0; j < pointsBlueRight.length; j++) {
          if (i == j) {
            var newRow = tbody.insertRow(-1);
            let indexRow = newRow.rowIndex;
            var cellOne = newRow.insertCell();
            var cellTwo = newRow.insertCell();
            var cellThree = newRow.insertCell();
            var cellFour = newRow.insertCell();
            var cellFive = newRow.insertCell();
            indexImaginaryHindLeft += 1;
            cellOne.innerHTML = indexRow - 1;
            cellTwo.innerHTML =
              "Imaginary Hind " +
              indexImaginaryHindLeft +
              " &#x2192 Blue R" +
              (j + 1);
            cellThree.innerHTML = "Stride Width Hind(L)";
            if (i < pointsBlueLeft.length - 1) {
              distance = Math.hypot(
                pointsBlueRight[j].x - pointsBlueRight[j].x,
                (pointsBlueLeft[i].y + pointsBlueLeft[i + 1].y) / 2 -
                  pointsBlueRight[j].y
              ).toFixed(3);
            } else {
              distance = Math.hypot(
                pointsBlueRight[j].x - pointsBlueRight[j].x,
                pointsBlueLeft[i].y - pointsBlueRight[j].y
              ).toFixed(3);
            }
            cellFour.innerHTML = distance;
            cellFive.innerHTML = (distance / dist).toFixed(3);
            distValuesSWHL.push(distance / dist);
          }
          if (i == j + 1) {
            var newRow = tbody.insertRow(-1);
            let indexRow = newRow.rowIndex;
            var cellOne = newRow.insertCell();
            var cellTwo = newRow.insertCell();
            var cellThree = newRow.insertCell();
            var cellFour = newRow.insertCell();
            var cellFive = newRow.insertCell();
            indexImaginaryHindLeft += 1;
            cellOne.innerHTML = indexRow - 1;
            cellTwo.innerHTML =
              "Imaginary Hind " +
              indexImaginaryHindLeft +
              " &#x2192 Blue L" +
              (i + 1);
            cellThree.innerHTML = "Stride Width Hind(L)";
            if (j < pointsBlueRight.length - 1) {
              distance = Math.hypot(
                pointsBlueLeft[i].x - pointsBlueLeft[i].x,
                pointsBlueLeft[i].y -
                  (pointsBlueRight[j].y + pointsBlueRight[j + 1].y) / 2
              ).toFixed(3);
            } else {
              distance = Math.hypot(
                pointsBlueLeft[i].x - pointsBlueLeft[i].x,
                pointsBlueLeft[i].y - pointsBlueRight[j].y
              ).toFixed(3);
            }
            cellFour.innerHTML = distance;
            cellFive.innerHTML = (distance / dist).toFixed(3);
            distValuesSWHL.push(distance / dist);
          }
        }
      }
      console.log(distValuesSWHL);
      var strideWidthHindLeftMeanRow = tbody.insertRow(-1);
      var strideWidthHindLeftRowCellOne =
        strideWidthHindLeftMeanRow.insertCell();
      var strideWidthHindLeftRowCellTwo =
        strideWidthHindLeftMeanRow.insertCell();
      strideWidthHindLeftRowCellOne.colSpan = "4";
      strideWidthHindLeftRowCellOne.innerHTML =
        "<b>Stride Width Hind(L) average in cm:</b> ";
      strideWidthHindLeftRowCellTwo.innerHTML = (
        distValuesSWHL.reduce((a, b) => a + b) / distValuesSWHL.length
      ).toFixed(3);
    }
    if (footstepStart.options[footstepStart.selectedIndex].value == "Right") {
      var indexImaginaryFrontRight = 0;
      var indexImaginaryHindRight = 0;
      for (var i = 0; i < pointsRedLeft.length; i++) {
        for (var j = 0; j < pointsRedRight.length; j++) {
          if (i == j) {
            var newRow = tbody.insertRow(-1);
            let indexRow = newRow.rowIndex;
            var cellOne = newRow.insertCell();
            var cellTwo = newRow.insertCell();
            var cellThree = newRow.insertCell();
            var cellFour = newRow.insertCell();
            var cellFive = newRow.insertCell();
            indexImaginaryFrontRight += 1;
            cellOne.innerHTML = indexRow - 1;
            cellTwo.innerHTML =
              "Imaginary Front " +
              indexImaginaryFrontRight +
              " &#x2192 Red L" +
              (i + 1);
            cellThree.innerHTML = "Stride Width Front(R)";
            if (j < pointsRedRight.length - 1) {
              distance = Math.hypot(
                pointsRedLeft[i].x - pointsRedLeft[i].x,
                (pointsRedRight[j].y + pointsRedRight[j + 1].y) / 2 -
                  pointsRedLeft[i].y
              ).toFixed(3);
            } else {
              distance = Math.hypot(
                pointsRedLeft[i].x - pointsRedLeft[i].x,
                pointsRedRight[j].y - pointsRedLeft[i].y
              ).toFixed(3);
            }
            cellFour.innerHTML = distance;
            cellFive.innerHTML = (distance / dist).toFixed(3);
            distValuesSWFR.push(distance / dist);
          }
          if (j == i + 1) {
            var newRow = tbody.insertRow(-1);
            let indexRow = newRow.rowIndex;
            var cellOne = newRow.insertCell();
            var cellTwo = newRow.insertCell();
            var cellThree = newRow.insertCell();
            var cellFour = newRow.insertCell();
            var cellFive = newRow.insertCell();
            indexImaginaryFrontRight += 1;
            cellOne.innerHTML = indexRow - 1;
            cellTwo.innerHTML =
              "Imaginary Front " +
              indexImaginaryFrontRight +
              " &#x2192 Red R" +
              (j + 1);
            cellThree.innerHTML = "Stride Width Front(R)";
            if (i < pointsRedLeft.length - 1) {
              distance = Math.hypot(
                pointsRedRight[j].x - pointsRedRight[j].x,
                (pointsRedLeft[i].y + pointsRedLeft[i + 1].y) / 2 -
                  pointsRedRight[j].y
              ).toFixed(3);
            } else {
              distance = Math.hypot(
                pointsRedRight[j].x - pointsRedRight[j].x,
                pointsRedLeft[i].y - pointsRedRight[j].y
              ).toFixed(3);
            }
            cellFour.innerHTML = distance;
            cellFive.innerHTML = (distance / dist).toFixed(3);
            distValuesSWFR.push(distance / dist);
          }
        }
      }
      console.log(distValuesSWFR);
      var strideWidthFrontRightMeanRow = tbody.insertRow(-1);
      var strideWidthFrontRightRowCellOne =
        strideWidthFrontRightMeanRow.insertCell();
      var strideWidthFrontRightRowCellTwo =
        strideWidthFrontRightMeanRow.insertCell();
      strideWidthFrontRightRowCellOne.colSpan = "4";
      strideWidthFrontRightRowCellOne.innerHTML =
        "<b>Stride Width Front(R) average in cm:</b> ";
      strideWidthFrontRightRowCellTwo.innerHTML = (
        distValuesSWFR.reduce((a, b) => a + b) / distValuesSWFR.length
      ).toFixed(3);
      for (var i = 0; i < pointsBlueLeft.length; i++) {
        for (var j = 0; j < pointsBlueRight.length; j++) {
          if (i == j) {
            var newRow = tbody.insertRow(-1);
            let indexRow = newRow.rowIndex;
            var cellOne = newRow.insertCell();
            var cellTwo = newRow.insertCell();
            var cellThree = newRow.insertCell();
            var cellFour = newRow.insertCell();
            var cellFive = newRow.insertCell();
            indexImaginaryHindRight += 1;
            cellOne.innerHTML = indexRow - 1;
            cellTwo.innerHTML =
              "Imaginary Hind " +
              indexImaginaryHindRight +
              " &#x2192 Blue L" +
              (i + 1);
            cellThree.innerHTML = "Stride Width Hind(R)";
            if (j < pointsBlueRight.length - 1) {
              distance = Math.hypot(
                pointsBlueLeft[i].x - pointsBlueLeft[i].x,
                (pointsBlueRight[j].y + pointsBlueRight[j + 1].y) / 2 -
                  pointsBlueLeft[i].y
              ).toFixed(3);
            } else {
              distance = Math.hypot(
                pointsBlueLeft[i].x - pointsBlueLeft[i].x,
                pointsBlueRight[j].y - pointsBlueLeft[i].y
              ).toFixed(3);
            }
            cellFour.innerHTML = distance;
            cellFive.innerHTML = (distance / dist).toFixed(3);
            distValuesSWHR.push(distance / dist);
          }
          if (j == i + 1) {
            var newRow = tbody.insertRow(-1);
            let indexRow = newRow.rowIndex;
            var cellOne = newRow.insertCell();
            var cellTwo = newRow.insertCell();
            var cellThree = newRow.insertCell();
            var cellFour = newRow.insertCell();
            var cellFive = newRow.insertCell();
            indexImaginaryHindRight += 1;
            cellOne.innerHTML = indexRow - 1;
            cellTwo.innerHTML =
              "Imaginary Hind " +
              indexImaginaryHindRight +
              " &#x2192 Blue R" +
              (j + 1);
            cellThree.innerHTML = "Stride Width Hind(R)";
            if (i < pointsBlueLeft.length - 1) {
              distance = Math.hypot(
                pointsBlueRight[j].x - pointsBlueRight[j].x,
                (pointsBlueLeft[i].y + pointsBlueLeft[i + 1].y) / 2 -
                  pointsBlueRight[j].y
              ).toFixed(3);
            } else {
              distance = Math.hypot(
                pointsBlueRight[j].x - pointsBlueRight[j].x,
                pointsBlueLeft[i].y - pointsBlueRight[j].y
              ).toFixed(3);
            }
            cellFour.innerHTML = distance;
            cellFive.innerHTML = (distance / dist).toFixed(3);
            distValuesSWHR.push(distance / dist);
          }
        }
      }
      console.log(distValuesSWHR);
      var strideWidthHindRightMeanRow = tbody.insertRow(-1);
      var strideWidthHindRightRowCellOne =
        strideWidthHindRightMeanRow.insertCell();
      var strideWidthHindRightRowCellTwo =
        strideWidthHindRightMeanRow.insertCell();
      strideWidthHindRightRowCellOne.colSpan = "4";
      strideWidthHindRightRowCellOne.innerHTML =
        "<b>Stride Width Hind(R) average in cm:</b> ";
      strideWidthHindRightRowCellTwo.innerHTML = (
        distValuesSWHR.reduce((a, b) => a + b) / distValuesSWHR.length
      ).toFixed(3);
    }
  }
  var lastRow = tbody.insertRow(-1);
  var lastCell = lastRow.insertCell();
  lastCell.innerHTML =
    "------------------------------BREAK------------------------------";
  lastCell.colSpan = "5";
  lastCell.style.textAlign = "center";
  if (tbody.rows.length >= 1){
    removeByEntriesOption.style.display = '', removeByMeasurementsOption.style.display = ''
  } else{
  }
}

// FUNCTION TO ADD ALL ENTRIES IN ONE CLICK WITHOUT AVERAGE

function addEntriesAll() {
  for (var i = 0; i < pointsRedLeft.length - 1; i++) {
    var newRow = tbody.insertRow(-1);
    let indexRow = newRow.rowIndex;
    var cellOne = newRow.insertCell();
    var cellTwo = newRow.insertCell();
    var cellThree = newRow.insertCell();
    var cellFour = newRow.insertCell();
    var cellFive = newRow.insertCell();
    cellOne.innerHTML = indexRow - 1;
    cellTwo.innerHTML = "Red L" + (i + 1) + " &#x2192 Red L" + (i + 2);
    cellThree.innerHTML = "Stride length left front";
    distance = Math.hypot(
      pointsRedLeft[i].x - pointsRedLeft[i + 1].x,
      pointsRedLeft[i].y - pointsRedLeft[i + 1].y
    ).toFixed(3);
    cellFour.innerHTML = distance;
    if (dist != 0) {
      cellFive.innerHTML = (distance / dist).toFixed(3);
    } else {
      cellFive.innerHTML = "Undefined";
    }
  }
  for (var i = 0; i < pointsRedRight.length - 1; i++) {
    var newRow = tbody.insertRow(-1);
    let indexRow = newRow.rowIndex;
    var cellOne = newRow.insertCell();
    var cellTwo = newRow.insertCell();
    var cellThree = newRow.insertCell();
    var cellFour = newRow.insertCell();
    var cellFive = newRow.insertCell();
    cellOne.innerHTML = indexRow - 1;
    cellTwo.innerHTML = "Red R" + (i + 1) + " &#x2192 Red R" + (i + 2);
    cellThree.innerHTML = "Stride length right front";
    distance = Math.hypot(
      pointsRedRight[i].x - pointsRedRight[i + 1].x,
      pointsRedRight[i].y - pointsRedRight[i + 1].y
    ).toFixed(3);
    cellFour.innerHTML = distance;
    if (dist != 0) {
      cellFive.innerHTML = (distance / dist).toFixed(3);
    } else {
      cellFive.innerHTML = "Undefined";
    }
  }
  for (var i = 0; i < pointsBlueLeft.length - 1; i++) {
    var newRow = tbody.insertRow(-1);
    let indexRow = newRow.rowIndex;
    var cellOne = newRow.insertCell();
    var cellTwo = newRow.insertCell();
    var cellThree = newRow.insertCell();
    var cellFour = newRow.insertCell();
    var cellFive = newRow.insertCell();
    cellOne.innerHTML = indexRow - 1;
    cellTwo.innerHTML = "Blue L" + (i + 1) + " &#x2192 Blue L" + (i + 2);
    cellThree.innerHTML = "Stride length left hind";
    distance = Math.hypot(
      pointsBlueLeft[i].x - pointsBlueLeft[i + 1].x,
      pointsBlueLeft[i].y - pointsBlueLeft[i + 1].y
    ).toFixed(3);
    cellFour.innerHTML = distance;
    if (dist != 0) {
      cellFive.innerHTML = (distance / dist).toFixed(3);
    } else {
      cellFive.innerHTML = "Undefined";
    }
  }
  for (var i = 0; i < pointsBlueRight.length - 1; i++) {
    var newRow = tbody.insertRow(-1);
    let indexRow = newRow.rowIndex;
    var cellOne = newRow.insertCell();
    var cellTwo = newRow.insertCell();
    var cellThree = newRow.insertCell();
    var cellFour = newRow.insertCell();
    var cellFive = newRow.insertCell();
    cellOne.innerHTML = indexRow - 1;
    cellTwo.innerHTML = "Blue R" + (i + 1) + " &#x2192 Blue R" + (i + 2);
    cellThree.innerHTML = "Stride length right hind";
    distance = Math.hypot(
      pointsBlueRight[i].x - pointsBlueRight[i + 1].x,
      pointsBlueRight[i].y - pointsBlueRight[i + 1].y
    ).toFixed(3);
    cellFour.innerHTML = distance;
    if (dist != 0) {
      cellFive.innerHTML = (distance / dist).toFixed(3);
    } else {
      cellFive.innerHTML = "Undefined";
    }
  }
  for (var i = 0; i < pointsRedLeft.length; i++) {
    for (var j = 0; j < pointsBlueLeft.length; j++) {
      if (i == j) {
        var newRow = tbody.insertRow(-1);
        let indexRow = newRow.rowIndex;
        var cellOne = newRow.insertCell();
        var cellTwo = newRow.insertCell();
        var cellThree = newRow.insertCell();
        var cellFour = newRow.insertCell();
        var cellFive = newRow.insertCell();
        cellOne.innerHTML = indexRow - 1;
        cellTwo.innerHTML = "Red L" + (i + 1) + " &#x2192 Blue L" + (j + 1);
        cellThree.innerHTML = "Overlap Left";
        distance = Math.hypot(
          pointsRedLeft[i].x - pointsBlueLeft[j].x,
          pointsRedLeft[i].y - pointsBlueLeft[j].y
        ).toFixed(3);
        cellFour.innerHTML = distance;
        if (dist != 0) {
          cellFive.innerHTML = (distance / dist).toFixed(3);
        } else {
          cellFive.innerHTML = "Undefined";
        }
      }
    }
  }
  for (var i = 0; i < pointsRedRight.length; i++) {
    for (var j = 0; j < pointsBlueRight.length; j++) {
      if (i == j) {
        var newRow = tbody.insertRow(-1);
        let indexRow = newRow.rowIndex;
        var cellOne = newRow.insertCell();
        var cellTwo = newRow.insertCell();
        var cellThree = newRow.insertCell();
        var cellFour = newRow.insertCell();
        var cellFive = newRow.insertCell();
        cellOne.innerHTML = indexRow - 1;
        cellTwo.innerHTML = "Red R" + (i + 1) + " &#x2192 Blue R" + (j + 1);
        cellThree.innerHTML = "Overlap Right";
        distance = Math.hypot(
          pointsRedRight[i].x - pointsBlueRight[j].x,
          pointsRedRight[i].y - pointsBlueRight[j].y
        ).toFixed(3);
        cellFour.innerHTML = distance;
        if (dist != 0) {
          cellFive.innerHTML = (distance / dist).toFixed(3);
        } else {
          cellFive.innerHTML = "Undefined";
        }
      }
    }
  }
  if (footstepStart.options[footstepStart.selectedIndex].value == "Left") {
    var indexImaginaryFrontLeft = 0;
    var indexImaginaryHindLeft = 0;
    for (var i = 0; i < pointsRedLeft.length; i++) {
      for (var j = 0; j < pointsRedRight.length; j++) {
        if (i == j) {
          var newRow = tbody.insertRow(-1);
          let indexRow = newRow.rowIndex;
          var cellOne = newRow.insertCell();
          var cellTwo = newRow.insertCell();
          var cellThree = newRow.insertCell();
          var cellFour = newRow.insertCell();
          var cellFive = newRow.insertCell();
          indexImaginaryFrontLeft += 1;
          cellOne.innerHTML = indexRow - 1;
          cellTwo.innerHTML =
            "Imaginary Front " +
            indexImaginaryFrontLeft +
            " &#x2192 Red R" +
            (j + 1);
          cellThree.innerHTML = "Stride Width Front(L)";
          if (i < pointsRedLeft.length - 1) {
            distance = Math.hypot(
              pointsRedRight[j].x - pointsRedRight[j].x,
              (pointsRedLeft[i].y + pointsRedLeft[i + 1].y) / 2 -
                pointsRedRight[j].y
            ).toFixed(3);
          } else {
            distance = Math.hypot(
              pointsRedRight[j].x - pointsRedRight[j].x,
              pointsRedLeft[i].y - pointsRedRight[j].y
            ).toFixed(3);
          }
          cellFour.innerHTML = distance;
          if (dist != 0) {
            cellFive.innerHTML = (distance / dist).toFixed(3);
          } else {
            cellFive.innerHTML = "Undefined";
          }
        }
        if (i == j + 1) {
          var newRow = tbody.insertRow(-1);
          let indexRow = newRow.rowIndex;
          var cellOne = newRow.insertCell();
          var cellTwo = newRow.insertCell();
          var cellThree = newRow.insertCell();
          var cellFour = newRow.insertCell();
          var cellFive = newRow.insertCell();
          indexImaginaryFrontLeft += 1;
          cellOne.innerHTML = indexRow - 1;
          cellTwo.innerHTML =
            "Imaginary Front " +
            indexImaginaryFrontLeft +
            " &#x2192 Red L" +
            (i + 1);
          cellThree.innerHTML = "Stride Width Front(L)";
          if (j < pointsRedRight.length - 1) {
            distance = Math.hypot(
              pointsRedLeft[i].x - pointsRedLeft[i].x,
              pointsRedLeft[i].y -
                (pointsRedRight[j].y + pointsRedRight[j + 1].y) / 2
            ).toFixed(3);
          } else {
            distance = Math.hypot(
              pointsRedLeft[i].x - pointsRedLeft[i].x,
              pointsRedLeft[i].y - pointsRedRight[j].y
            ).toFixed(3);
          }
          cellFour.innerHTML = distance;
          if (dist != 0) {
            cellFive.innerHTML = (distance / dist).toFixed(3);
          } else {
            cellFive.innerHTML = "Undefined";
          }
        }
      }
    }
    for (var i = 0; i < pointsBlueLeft.length; i++) {
      for (var j = 0; j < pointsBlueRight.length; j++) {
        if (i == j) {
          var newRow = tbody.insertRow(-1);
          let indexRow = newRow.rowIndex;
          var cellOne = newRow.insertCell();
          var cellTwo = newRow.insertCell();
          var cellThree = newRow.insertCell();
          var cellFour = newRow.insertCell();
          var cellFive = newRow.insertCell();
          indexImaginaryHindLeft += 1;
          cellOne.innerHTML = indexRow - 1;
          cellTwo.innerHTML =
            "Imaginary Hind " +
            indexImaginaryHindLeft +
            " &#x2192 Blue R" +
            (j + 1);
          cellThree.innerHTML = "Stride Width Hind(L)";
          if (i < pointsBlueLeft.length - 1) {
            distance = Math.hypot(
              pointsBlueRight[j].x - pointsBlueRight[j].x,
              (pointsBlueLeft[i].y + pointsBlueLeft[i + 1].y) / 2 -
                pointsBlueRight[j].y
            ).toFixed(3);
          } else {
            distance = Math.hypot(
              pointsBlueRight[j].x - pointsBlueRight[j].x,
              pointsBlueLeft[i].y - pointsBlueRight[j].y
            ).toFixed(3);
          }
          cellFour.innerHTML = distance;
          if (dist != 0) {
            cellFive.innerHTML = (distance / dist).toFixed(3);
          } else {
            cellFive.innerHTML = "Undefined";
          }
        }
        if (i == j + 1) {
          var newRow = tbody.insertRow(-1);
          let indexRow = newRow.rowIndex;
          var cellOne = newRow.insertCell();
          var cellTwo = newRow.insertCell();
          var cellThree = newRow.insertCell();
          var cellFour = newRow.insertCell();
          var cellFive = newRow.insertCell();
          indexImaginaryHindLeft += 1;
          cellOne.innerHTML = indexRow - 1;
          cellTwo.innerHTML =
            "Imaginary Hind " +
            indexImaginaryHindLeft +
            " &#x2192 Blue L" +
            (i + 1);
          cellThree.innerHTML = "Stride Width Hind(L)";
          if (j < pointsBlueRight.length - 1) {
            distance = Math.hypot(
              pointsBlueLeft[i].x - pointsBlueLeft[i].x,
              pointsBlueLeft[i].y -
                (pointsBlueRight[j].y + pointsBlueRight[j + 1].y) / 2
            ).toFixed(3);
          } else {
            distance = Math.hypot(
              pointsBlueLeft[i].x - pointsBlueLeft[i].x,
              pointsBlueLeft[i].y - pointsBlueRight[j].y
            ).toFixed(3);
          }
          cellFour.innerHTML = distance;
          if (dist != 0) {
            cellFive.innerHTML = (distance / dist).toFixed(3);
          } else {
            cellFive.innerHTML = "Undefined";
          }
        }
      }
    }
  }
  if (footstepStart.options[footstepStart.selectedIndex].value == "Right") {
    var indexImaginaryFrontRight = 0;
    var indexImaginaryHindRight = 0;
    for (var i = 0; i < pointsRedLeft.length; i++) {
      for (var j = 0; j < pointsRedRight.length; j++) {
        if (i == j) {
          var newRow = tbody.insertRow(-1);
          let indexRow = newRow.rowIndex;
          var cellOne = newRow.insertCell();
          var cellTwo = newRow.insertCell();
          var cellThree = newRow.insertCell();
          var cellFour = newRow.insertCell();
          var cellFive = newRow.insertCell();
          indexImaginaryFrontRight += 1;
          cellOne.innerHTML = indexRow - 1;
          cellTwo.innerHTML =
            "Imaginary Front " +
            indexImaginaryFrontRight +
            " &#x2192 Red L" +
            (i + 1);
          cellThree.innerHTML = "Stride Width Front(R)";
          if (j < pointsRedRight.length - 1) {
            distance = Math.hypot(
              pointsRedLeft[i].x - pointsRedLeft[i].x,
              (pointsRedRight[j].y + pointsRedRight[j + 1].y) / 2 -
                pointsRedLeft[i].y
            ).toFixed(3);
          } else {
            distance = Math.hypot(
              pointsRedLeft[i].x - pointsRedLeft[i].x,
              pointsRedRight[j].y - pointsRedLeft[i].y
            ).toFixed(3);
          }
          cellFour.innerHTML = distance;
          if (dist != 0) {
            cellFive.innerHTML = (distance / dist).toFixed(3);
          } else {
            cellFive.innerHTML = "Undefined";
          }
        }
        if (j == i + 1) {
          var newRow = tbody.insertRow(-1);
          let indexRow = newRow.rowIndex;
          var cellOne = newRow.insertCell();
          var cellTwo = newRow.insertCell();
          var cellThree = newRow.insertCell();
          var cellFour = newRow.insertCell();
          var cellFive = newRow.insertCell();
          indexImaginaryFrontRight += 1;
          cellOne.innerHTML = indexRow - 1;
          cellTwo.innerHTML =
            "Imaginary Front " +
            indexImaginaryFrontRight +
            " &#x2192 Red R" +
            (j + 1);
          cellThree.innerHTML = "Stride Width Front(R)";
          if (i < pointsRedLeft.length - 1) {
            distance = Math.hypot(
              pointsRedRight[j].x - pointsRedRight[j].x,
              (pointsRedLeft[i].y + pointsRedLeft[i + 1].y) / 2 -
                pointsRedRight[j].y
            ).toFixed(3);
          } else {
            distance = Math.hypot(
              pointsRedRight[j].x - pointsRedRight[j].x,
              pointsRedLeft[i].y - pointsRedRight[j].y
            ).toFixed(3);
          }
          cellFour.innerHTML = distance;
          if (dist != 0) {
            cellFive.innerHTML = (distance / dist).toFixed(3);
          } else {
            cellFive.innerHTML = "Undefined";
          }
        }
      }
    }
    for (var i = 0; i < pointsBlueLeft.length; i++) {
      for (var j = 0; j < pointsBlueRight.length; j++) {
        if (i == j) {
          var newRow = tbody.insertRow(-1);
          let indexRow = newRow.rowIndex;
          var cellOne = newRow.insertCell();
          var cellTwo = newRow.insertCell();
          var cellThree = newRow.insertCell();
          var cellFour = newRow.insertCell();
          var cellFive = newRow.insertCell();
          indexImaginaryHindRight += 1;
          cellOne.innerHTML = indexRow - 1;
          cellTwo.innerHTML =
            "Imaginary Hind " +
            indexImaginaryHindRight +
            " &#x2192 Blue L" +
            (i + 1);
          cellThree.innerHTML = "Stride Width Hind(R)";
          if (j < pointsBlueRight.length - 1) {
            distance = Math.hypot(
              pointsBlueLeft[i].x - pointsBlueLeft[i].x,
              (pointsBlueRight[j].y + pointsBlueRight[j + 1].y) / 2 -
                pointsBlueLeft[i].y
            ).toFixed(3);
          } else {
            distance = Math.hypot(
              pointsBlueLeft[i].x - pointsBlueLeft[i].x,
              pointsBlueRight[j].y - pointsBlueLeft[i].y
            ).toFixed(3);
          }
          cellFour.innerHTML = distance;
          if (dist != 0) {
            cellFive.innerHTML = (distance / dist).toFixed(3);
          } else {
            cellFive.innerHTML = "Undefined";
          }
        }
        if (j == i + 1) {
          var newRow = tbody.insertRow(-1);
          let indexRow = newRow.rowIndex;
          var cellOne = newRow.insertCell();
          var cellTwo = newRow.insertCell();
          var cellThree = newRow.insertCell();
          var cellFour = newRow.insertCell();
          var cellFive = newRow.insertCell();
          indexImaginaryHindRight += 1;
          cellOne.innerHTML = indexRow - 1;
          cellTwo.innerHTML =
            "Imaginary Hind " +
            indexImaginaryHindRight +
            " &#x2192 Blue R" +
            (j + 1);
          cellThree.innerHTML = "Stride Width Hind(R)";
          if (i < pointsBlueLeft.length - 1) {
            distance = Math.hypot(
              pointsBlueRight[j].x - pointsBlueRight[j].x,
              (pointsBlueLeft[i].y + pointsBlueLeft[i + 1].y) / 2 -
                pointsBlueRight[j].y
            ).toFixed(3);
          } else {
            distance = Math.hypot(
              pointsBlueRight[j].x - pointsBlueRight[j].x,
              pointsBlueLeft[i].y - pointsBlueRight[j].y
            ).toFixed(3);
          }
          cellFour.innerHTML = distance;
          if (dist != 0) {
            cellFive.innerHTML = (distance / dist).toFixed(3);
          } else {
            cellFive.innerHTML = "Undefined";
          }
        }
      }
    }
  }
  if (
    pointsRedLeft.length < 1 ||
    pointsRedRight.length < 1 ||
    pointsBlueLeft.length < 1 ||
    pointsBlueRight.length < 1
  ) {
    alert("Points missing in some measurements.");
  }
  var lastRow = tbody.insertRow(-1);
  var lastCell = lastRow.insertCell();
  lastCell.innerHTML =
    "------------------------------BREAK------------------------------";
  lastCell.colSpan = "5";
  lastCell.style.textAlign = "center";
  if (tbody.rows.length >= 1){
    removeByEntriesOption.style.display = '', removeByMeasurementsOption.style.display = ''
  } else{
  }
}
