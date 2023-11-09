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

//draw the net //

function drawNet() {
    for(let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// draw score text //

function drawText(text,x,y,color) {
    ctx.fillStyle = color;
    ctx.font = "50px fantasy";
    ctx.fillText(text,x,y);
}

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
    x: canvas.width/2 - 1,
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

// ball and paddble collision //

function collision(b,p) {
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

// controls for the user paddle //

canvas.addEventListener("mousemove", movePaddle);

function movePaddle(evt) {
    let rect = canvas.getBoundingClientRect();

    user.y = evt.clientY - rect.top - user.height/2;
}

// reset ball //

function resetBall() {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

// update the position, score, etc //

function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

// AI to control the computer paddle //

    let computerLevel = 0.1;
    com.y += (ball.y - (com.y + com.height/2)) * computerLevel;

    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < canvas.width/2) ? user : com;

    if(collision(ball,player)) {

        // ball hits the player //

        let collidePoint = ball.y - (player.y + player.height/2);

        // normalisation //

        collidePoint = collidePoint/(player.height/2);

        // calculate angle in Radian //

        let angleRad = collidePoint * Math.PI/4;

        // X direction of the ball when it's hit //

        let direction = (ball.x < canvas.width/2) ? 1 : -1;

        // change velocity X and Y //

        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY =             ball.speed * Math.sin(angleRad);

        // everytime ball hits paddle, increase speed of ball //

        ball.speed += 0.5;
    }
    // update score //

    if(ball.x - ball.radius < 0) {
        com.score++;
        resetBall();
    } else if(ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }
}

// game init //

function game() {
    update();
    render();
}

// loop //
const framePerSecond = 50;
setInterval(game,1000/framePerSecond);

