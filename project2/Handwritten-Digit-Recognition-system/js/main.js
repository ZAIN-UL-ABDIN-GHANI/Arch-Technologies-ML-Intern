var canvas, ctx;
var lastX, lastY, mouseDown = 0;
var touchX, touchY;
let model;

// Initialize canvas and set up event listeners for mouse and touch interactions
function init() {
    canvas = document.getElementById("sketchpad");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (ctx) {
        // Mouse event listeners for desktop
        canvas.addEventListener("mousedown", sketchpad_mouseDown, false);
        canvas.addEventListener("mousemove", sketchpad_mouseMove, false);
        window.addEventListener("mouseup", sketchpad_mouseUp, false);
        
        // Touch event listeners for mobile
        canvas.addEventListener("touchstart", sketchpad_touchStart, false);
        canvas.addEventListener("touchmove", sketchpad_touchMove, false);
        window.addEventListener("touchend", sketchpad_touchEnd, false);
    }
}

// Drawing function for canvas
function draw(ctx, x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 15;
        ctx.lineJoin = ctx.lineCap = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}

// Mouse event handlers
function sketchpad_mouseDown(e) {
    mouseDown = 1;
    getMousePos(e);
    draw(ctx, mouseX, mouseY, false);
}

function sketchpad_mouseUp() {
    mouseDown = 0;
}

function sketchpad_mouseMove(e) {
    getMousePos(e);
    if (mouseDown) draw(ctx, mouseX, mouseY, true);
}

// Get mouse position relative to canvas
function getMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
}

// Touch event handlers for mobile
function sketchpad_touchStart(e) {
    mouseDown = 1;
    getTouchPos(e);
    draw(ctx, touchX, touchY, false);
    e.preventDefault();
}

function sketchpad_touchMove(e) {
    getTouchPos(e);
    if (mouseDown) draw(ctx, touchX, touchY, true);
    e.preventDefault();
}

function sketchpad_touchEnd() {
    mouseDown = 0;
}

// Get touch position relative to canvas
function getTouchPos(e) {
    var rect = canvas.getBoundingClientRect();
    touchX = e.touches[0].clientX - rect.left;
    touchY = e.touches[0].clientY - rect.top;
}

// Clear canvas
document.getElementById("clear_button").addEventListener("click", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Load the model
(async function () {
    model = await tf.loadLayersModel("https://maneprajakta.github.io/Digit_Recognition_Web_App/models/model.json");
})();

// Preprocess the canvas image for model input
function preprocessCanvas(image) {
    let tensor = tf.browser
        .fromPixels(image)
        .resizeNearestNeighbor([28, 28])
        .mean(2)
        .expandDims(2)
        .expandDims()
        .toFloat();
    return tensor.div(255.0);
}

// Predict digit on "Predict" button click
document.getElementById("predict_button").addEventListener("click", async function () {
    let tensor = preprocessCanvas(canvas);
    let predictions = await model.predict(tensor).data();
    displayLabel(predictions);
});

// Display prediction results
function displayLabel(data) {
    var max = data[0];
    var maxIndex = 0;
    for (var i = 1; i < data.length; i++) {
        if (data[i] > max) {
            maxIndex = i;
            max = data[i];
        }
    }
    document.getElementById("result").innerHTML = maxIndex;
    document.getElementById("confidence").innerHTML = "Confidence: " + (max * 100).toFixed(2) + "%";
}
document.getElementById("predict_button").addEventListener("click", () => {
    // Your prediction logic here
    // Scroll to result on mobile
    if (window.innerWidth <= 576) {
        document.getElementById("result").scrollIntoView({ behavior: "smooth" });
    }
});
