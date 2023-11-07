// create canvas which is the ping pong table //

const canvas = document.getElementById("ping-pong");

const ctx = canvas.getContext("2d");

// draw rectangle for the canvas //

function drawRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

drawRect(0, 0, canvas.width, canvas.height, "NAVY");

// draw net on the table //

function drawNet() {
    for(let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// draw the ping pong ball //

function drawCircle(x,y,r,color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}

drawCircle(30, 30, 15, "WHITE");

// draw score text //

function drawText(text,x,y,color) {
    ctx.fillStyle = color;
    ctx.font = "50px fantasy";
    ctx.fillText(text,x,y);
}

drawText("something",300,200,"WHITE");

// user paddle //

const user = {
    x: 0,
    y: canvas.height / 2 - 100/2,
    height: 100,
    width: 10,
    color: "WHITE",
    score: 0,
}

// computer paddle //

const com = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 100/2,
    height: 100,
    width: 10,
    color: "WHITE",
    score: 0,
}

// create the net //

const net = {
    x: canvas.width - 1,
    y: 0,
    width: 2,
    height: 10,
    color: "WHITE",
}

// the ping pong ball //

const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "WHITE",
}


function render() {
    // clear the canvas //
    drawRect(0, 0, canvas.width, canvas.height, "NAVY");

    // draw the net //
    drawNet();

    // draw score //
    drawText(user.score,canvas.width/4,canvas.height/5,"WHITE");
    drawText(com.score,3*canvas.width/4,canvas.height/5,"WHITE");

    // draw user and com paddle //
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);

    // draw ball //
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}


